import { mat4, vec3, vec2 } from "gl-matrix";
import Window from "./Window";

export default class Camera {
    private projectionMatrix: mat4;
    private viewMatrix: mat4;
    private inverseProjection: mat4;
    private inverseView: mat4;
    public position: vec2;
    public zoom: number;
    private gl: WebGL2RenderingContext = Window.getWebGLContext();

    constructor(position: vec2 = vec2.create()) {
        this.gl = Window.getWebGLContext();
        this.position = position;
        this.zoom = 1;
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        this.inverseProjection = mat4.create();
        this.inverseView = mat4.create();
        this.adjustProjection();
    }

    public adjustProjection(): void {
        // ortho(left, right, bottom, top, near, far)
        this.zoom = ((this.zoom * 100) | 0) / 100;
        this.projectionMatrix = mat4.create();
        //get window size
        const width = Window.getWidth();
        const height = Window.getHeight();
        const aspectRatio = width / height;
        const tileSize = 32;
        const tilesXY = vec2.fromValues(((width / tileSize)), (height / tileSize));
        const rightTop = vec2.fromValues((tilesXY[0] * tileSize), tilesXY[1] * tileSize).map((v) => v * this.zoom);
        //get canvas size
        // set ortho view to the size of the canvas and depth of 100
        mat4.ortho(this.projectionMatrix, - rightTop[0] / 2, rightTop[0] / 2, -rightTop[1] / 2, rightTop[1] / 2, 0, 100);
        mat4.invert(this.inverseProjection, this.projectionMatrix);
    }

    public getViewMatrix(): mat4 {

        const cameraUp = vec3.fromValues(0, 1, 0);
        this.viewMatrix = mat4.create();
        mat4.lookAt(this.viewMatrix, vec3.fromValues(this.position[0], this.position[1], 20), vec3.fromValues(this.position[0], this.position[1], 0), cameraUp);
        mat4.invert(this.inverseView, this.viewMatrix);
        return this.viewMatrix;
    }

    public getProjectionMatrix(): mat4 {
        return this.projectionMatrix;
    }

    public getInverseProjection(): mat4 {
        return this.inverseProjection;
    }

    public getInverseView(): mat4 {
        //console.log(this.inverseView)
        return this.inverseView;
    }

    public static serialize(camera: Camera): string {
        return JSON.stringify({
            position: camera.position,
            zoom: camera.zoom
        });
    }

    public static deserialize(json: string): Camera {
        const obj = JSON.parse(json);
        const camera = new Camera(obj.position);
        camera.zoom = obj.zoom;
        return camera;
    }

}