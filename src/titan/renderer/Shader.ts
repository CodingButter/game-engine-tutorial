import Window from "titan/Window";
import type { mat4, vec2, vec3, vec4 } from "gl-matrix";

type ShaderSources = {
    vertexShaderSource: string | null;
    fragmentShaderSource: string | null;
}
export default class Shader {
    private static shaderSources: Map<string, ShaderSources> = new Map<string, ShaderSources>();
    private filePath: string;
    private vertexShaderSource: string = "";
    private fragmentShaderSource: string = "";
    private shaderProgram: WebGLProgram | null = null;
    private beingUsed: boolean = false;
    private gl: WebGL2RenderingContext

    constructor(filePath: string) {
        console.log("Shader created.")
        this.filePath = filePath;
        this.gl = Window.getWebGLContext() as WebGL2RenderingContext;
    }

    public async loadCompileLink(): Promise<void> {
        const response = await fetch(this.filePath, { cache: "force-cache", mode: 'same-origin' })
        const shaderString = await response.text();
        this.vertexShaderSource = Shader.getShader(shaderString, "vertex");
        this.fragmentShaderSource = Shader.getShader(shaderString, "fragment");
        Shader.shaderSources.set(this.filePath, {
            vertexShaderSource: this.vertexShaderSource,
            fragmentShaderSource: this.fragmentShaderSource
        });
        this.compileAndLinkShaders();
        console.log("shader loaded successfully.")
    }

    private static getShader(glslString: string, shaderType: string): string {
        const shaderArray = glslString.split(`#type`);
        return (shaderArray.find((shader: string) => {
            return shader.includes(shaderType);
        }) || "").replace(shaderType, "").trim();
    }

    public compileAndLinkShaders() {
        const gl = this.gl;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
        gl.shaderSource(vertexShader, this.vertexShaderSource);
        gl.compileShader(vertexShader);
        // check for shader compile errors
        if (!gl.getShaderParameter(vertexShader as WebGLShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(vertexShader as WebGLShader) as string);
        }
        // fragment shader
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
        gl.shaderSource(fragmentShader, this.fragmentShaderSource);
        gl.compileShader(fragmentShader);
        // check for shader compile errors
        if (!gl.getShaderParameter(fragmentShader as WebGLShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(fragmentShader as WebGLShader) as string);
        }
        // link shaders/
        this.shaderProgram = gl.createProgram() as WebGLProgram;
        gl.attachShader(this.shaderProgram, vertexShader);
        gl.attachShader(this.shaderProgram, fragmentShader);
        gl.linkProgram(this.shaderProgram);
        // check for linking errors
        if (!gl.getProgramParameter(this.shaderProgram as WebGLProgram, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(this.shaderProgram as WebGLProgram) as string);
        }
        console.log("Shader compiled and linked successfully.")
    }
    public use(): boolean {
        if (this.shaderProgram === null) {
            return false
        }
        if (this.beingUsed) return true;
        this.beingUsed = true;
        Window.getWebGLContext().useProgram(this.shaderProgram);
        return true;
    }
    public detach(): void {
        if (this.shaderProgram === null) return
        Window.getWebGLContext().useProgram(null);
        this.beingUsed = false;
    }

    public uploadInt(varName: string, value: number): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform1i(varLocation, value);
    }

    public uploadFloat(varName: string, value: number): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform1f(varLocation, value);
    }

    public uploadVec2(varName: string, vector: vec2): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform2fv(varLocation, vector);
    }

    public uploadVec3(varName: string, vector: vec3): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform3fv(varLocation, vector);
    }

    public uploadVec4(varName: string, vector: vec4): void {

        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform4fv(varLocation, vector);
    }

    public uploadMat3(varName: string, matrix: mat4): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniformMatrix3fv(varLocation, false, matrix);
    }

    public uploadMat4(varName: string, matrix: mat4): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniformMatrix4fv(varLocation, false, matrix);
    }

    public uploadTexture(varName: string, textureSlot: number): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform1i(varLocation, textureSlot);
    }

    public uploadIntArray(varName: string, array: Int32Array): void {
        const varLocation = this.gl.getUniformLocation(this.shaderProgram as WebGLProgram, varName);
        this.use();
        this.gl.uniform1iv(varLocation, array);
    }
}