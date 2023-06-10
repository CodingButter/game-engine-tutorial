import { mat4, vec3, vec2 } from "gl-matrix";
import Window from "./Window";

export default class Camera {
    private projectionMatrix: mat4;
    private viewMatrix: mat4;
    public position: vec2;
    private gl: WebGL2RenderingContext = Window.getWebGLContext();

    constructor(position: vec2 = vec2.create()) {
        this.gl = Window.getWebGLContext();
        this.position = position;
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        this.adjustProjection();
    }

    public adjustProjection(): void {
        // ortho(left, right, bottom, top, near, far)
        this.projectionMatrix = mat4.create();
        // set ortho view to the size of the canvas and depth of 100
        mat4.ortho(this.projectionMatrix, 0, 32.0 * 40.0, 0.0, 32.0 * 21.0, 0, 100);
    }

    public getViewMatrix(): mat4 {

        const cameraUp = vec3.fromValues(0, 1, 0);
        this.viewMatrix = mat4.create();
        mat4.lookAt(this.viewMatrix, vec3.fromValues(this.position[0], this.position[1], 20), vec3.fromValues(this.position[0], this.position[1], 0), cameraUp);

        return this.viewMatrix;
    }

    public getProjectionMatrix(): mat4 {
        return this.projectionMatrix;
    }

}