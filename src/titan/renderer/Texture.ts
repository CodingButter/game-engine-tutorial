import Window from "@titan/Window"
import EventEmitter from "events";

export default class Texture extends EventEmitter {
    private filePath: string = "";
    private textID: WebGLTexture;
    private width: number | undefined;
    private height: number | undefined;
    private gl: WebGL2RenderingContext = Window.getWebGLContext();

    constructor(filePath: string) {
        super();
        this.filePath = filePath;
        const gl = this.gl = Window.getWebGLContext();

        // Generate texture on GPU
        this.textID = this.gl.createTexture() as WebGLTexture;
        gl.bindTexture(gl.TEXTURE_2D, this.textID);

        // Set Texture Parameters
        // Repeat image in both directions
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        // When stretching the image, pixelate
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // When shrinking an image, pixelate
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        this.loadTexture();
    }

    private isAlphaImage(image: HTMLImageElement): boolean {
        // check if image is a content type with an alpha channel
        return image.src.includes(".png") || image.src.includes(".gif") || image.src.includes(".bmp");
    }

    private loadTexture(): void {
        const gl = this.gl;
        const image = new Image();
        image.src = this.filePath;
        image.onload = (ev: Event) => {
            //check for error
            if (image.width <= 0 || image.height <= 0) {
                console.error("Error loading image: " + this.filePath);
                return;
            }
            this.width = image.width;
            this.height = image.height;
            // check if image has alpha

            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, this.textID);
            if (this.isAlphaImage(image)) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            else
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            this.emit("load");
        };
    }

    public bind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textID);
    }

    public unbind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    public getWidth(): number {
        return this.width || 0;
    }

    public getHeight(): number {
        return this.height || 0;
    }
}