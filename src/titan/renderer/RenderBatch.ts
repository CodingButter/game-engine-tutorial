import SpriteRenderer from "titan/components/SpriteRenderer";
import Shader from "./Shader";
import Window from "titan/Window"
import Time from "titan/util/Time";
import AssetPool from "titan/util/AssetPool";
import Texture from "./Texture";

export default class RenderBatch {
    /**
     * Pos      Color       TexCoor  TextureId
     * f, f,    f,f,f,f     f,f      f
     * 
    */
    private static MAX_TEXTURES: number = 8;
    private POS_SIZE: number = 2;
    private COLOR_SIZE: number = 4;
    private TEX_COORDS_SIZE: number = 2;
    private TEX_ID_SIZE: number = 1;

    private POS_OFFSET: number = 0;
    private COLOR_OFFSET: number = this.POS_OFFSET + this.POS_SIZE * Float32Array.BYTES_PER_ELEMENT;
    private TEX_COORDS_OFFSET: number = this.COLOR_OFFSET + this.COLOR_SIZE * Float32Array.BYTES_PER_ELEMENT;
    private TEX_ID_OFFSET: number = this.TEX_COORDS_OFFSET + this.TEX_COORDS_SIZE * Float32Array.BYTES_PER_ELEMENT;
    private VERTEX_SIZE: number = this.POS_SIZE + this.COLOR_SIZE + this.TEX_COORDS_SIZE + this.TEX_ID_SIZE
    private VERTEX_SIZE_BYTES: number = this.VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;


    private sprites: SpriteRenderer[] = [];
    private numSprites: number = 0;
    private _hasRoom: boolean = true;
    private vertices: Float32Array = new Float32Array(0);
    private texSlots: Int32Array = new Int32Array([0, 1, 2, 3, 4, 5, 6, 7])

    private textures: Texture[] = [];

    private vaoID: WebGLVertexArrayObject = 1 as WebGLVertexArrayObject;
    private vboID: WebGLBuffer = 1 as WebGLBuffer;
    private matchBatchSize: number = 0;
    private shader: Shader;
    private zIndex: number = -2;

    constructor(matchBatchSize: number, zIndex: number) {
        this.shader = AssetPool.getShader("/assets/shaders/default.glsl");
        this.sprites = new Array(matchBatchSize).fill(new SpriteRenderer());
        this.matchBatchSize = matchBatchSize;
        this.zIndex = zIndex;

        // 4 vertices quads
        this.vertices = new Float32Array(matchBatchSize * 4 * this.VERTEX_SIZE);
        this.numSprites = 0;
        this._hasRoom = true;
    }
    public start(): void {
        //Generate and bind a vertex array object
        const gl = Window.getWebGLContext();
        this.vaoID = gl.createVertexArray() as WebGLVertexArrayObject;
        gl.bindVertexArray(this.vaoID);

        //Allocate space for vertices
        this.vboID = gl.createBuffer() as WebGLVertexArrayObject;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vboID);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices.byteLength, gl.DYNAMIC_DRAW);

        //Create and upload indices buffer
        const eboID: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        const indices: Uint32Array = this.generateIndicies();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eboID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        //Enable vertex attrib pointers
        gl.vertexAttribPointer(0, this.POS_SIZE, gl.FLOAT, false, this.VERTEX_SIZE_BYTES, this.POS_OFFSET);
        gl.enableVertexAttribArray(0);

        //Enable color attrib pointers
        gl.vertexAttribPointer(1, this.COLOR_SIZE, gl.FLOAT, false, this.VERTEX_SIZE_BYTES, this.COLOR_OFFSET);
        gl.enableVertexAttribArray(1);

        //Enable texCoords attrib pointers
        gl.vertexAttribPointer(2, this.TEX_COORDS_SIZE, gl.FLOAT, false, this.VERTEX_SIZE_BYTES, this.TEX_COORDS_OFFSET);
        gl.enableVertexAttribArray(2);

        //Enable texId attrib pointers
        gl.vertexAttribPointer(3, this.TEX_ID_SIZE, gl.FLOAT, false, this.VERTEX_SIZE_BYTES, this.TEX_ID_OFFSET);
        gl.enableVertexAttribArray(3);

    }

    public addSprite(sprite: SpriteRenderer): void {
        const index: number = this.numSprites;
        this.sprites[index] = sprite;
        this.numSprites++;

        //get texture
        if (sprite.getTexture() != null) {
            if (!this.textures.includes(sprite.getTexture() as Texture))
                this.textures.push(sprite.getTexture() as Texture);
        }

        //Add properties to local vertices array
        this.loadVertexProperties(index);

        if (this.numSprites >= this.matchBatchSize) {
            this._hasRoom = false;
        }
    }

    public render(): void {
        const gl = Window.getWebGLContext();
        let rebufferData: boolean = false;
        for (let i = 0; i < this.numSprites; i++) {
            const spr: SpriteRenderer = this.sprites[i];
            if (spr.isDirty()) {
                this.loadVertexProperties(i);
                spr.setClean();
                rebufferData = true;
            }
        }

        if (rebufferData) {
            // For now we will rebuffer all data every frame
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vboID);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        }

        //use shader
        if (!this.shader.use()) return;


        const cameraProjection = Window.getScene().getCamera().getProjectionMatrix();
        const cameraView = Window.getScene().getCamera().getViewMatrix();
        this.shader.uploadMat4("uProjection", cameraProjection)
        this.shader.uploadMat4("uView", cameraView);
        this.shader.uploadFloat("uTime", Time.getTime());
        this.shader.uploadVec2("uResolution", Window.getResolution())

        //bind textures
        for (let i = 0; i < this.textures.length; i++) {
            gl.activeTexture(gl.TEXTURE0 + i + 1);
            this.textures[i].bind();
        }

        this.shader.uploadIntArray("uTextures", this.texSlots);

        //bind vaoID
        gl.bindVertexArray(this.vaoID);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.drawElements(gl.TRIANGLES, this.numSprites * 6, gl.UNSIGNED_INT, 0);

        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);
        gl.bindVertexArray(null);
        //unbind textures
        for (let i = 0; i < this.textures.length; i++) {
            this.textures[i].unbind();
        }
        this.shader.detach();
    }

    private loadVertexProperties(offset: number): void {
        //load position
        const sprite: SpriteRenderer = this.sprites[offset];
        // find offset within array (4 vertices per sprite)
        let floatOffset: number = offset * 4 * this.VERTEX_SIZE;
        const color = sprite.getColor();
        const texCoords = sprite.getTexCoords();
        let texId: number = 0;

        if (sprite.getTexture() != null) {
            for (let i = 0; i < this.textures.length; i++) {
                if (this.textures[i] === sprite.getTexture()) {
                    texId = i + 1;
                    break
                }
            }
        }
        // add vertices with the appropriate properties
        let xAdd: number = 1.0;
        let yAdd: number = 1.0;
        for (let i = 0; i < 4; i++) {
            if (i === 1) {
                yAdd = 0.0;
            } else if (i === 2) {
                xAdd = 0.0;
            } else if (i === 3) {
                yAdd = 1.0;
            }

            //load position
            this.vertices[floatOffset] = sprite.__gameObject.transform.position[0] + (xAdd * sprite.__gameObject.transform.scale[0]);
            this.vertices[floatOffset + 1] = sprite.__gameObject.transform.position[1] + (yAdd * sprite.__gameObject.transform.scale[1]);
            
            //load color
            this.vertices[floatOffset + 2] = color[0];
            this.vertices[floatOffset + 3] = color[1];
            this.vertices[floatOffset + 4] = color[2];
            this.vertices[floatOffset + 5] = color[3];

            //load texCoords
            this.vertices[floatOffset + 6] = texCoords[i][0];
            this.vertices[floatOffset + 7] = texCoords[i][1];

            //load texId
            this.vertices[floatOffset + 8] = texId;


            floatOffset += this.VERTEX_SIZE;
        }
    }

    private generateIndicies(): Uint32Array {
        const elements: Uint32Array = new Uint32Array(this.matchBatchSize * 6).fill(0);
        for (let i = 0; i < this.matchBatchSize; i++) {
            this.loadElementIndices(elements, i);
        }
        return elements;
    }

    private loadElementIndices(elements: Uint32Array, index: number): void {
        const offsetArrayIndex: number = index * 6;
        const offset: number = index * 4;

        //Creating first triangle
        elements[offsetArrayIndex] = offset + 3;
        elements[offsetArrayIndex + 1] = offset + 2;
        elements[offsetArrayIndex + 2] = offset + 0;

        //Creating second triangle
        elements[offsetArrayIndex + 3] = offset + 0;
        elements[offsetArrayIndex + 4] = offset + 2;
        elements[offsetArrayIndex + 5] = offset + 1;
    }

    public hasRoom(): boolean {
        return this._hasRoom;
    }

    public hasTextureRoom(): boolean {
        return this.textures.length < RenderBatch.MAX_TEXTURES;
    }

    public hasTexture(tex: Texture): boolean {
        return this.textures.includes(tex);
    }

    public getZIndex(): number {
        return this.zIndex;
    }
}