import { vec2, vec4 } from "gl-matrix";
import LevelEditorScene from "./LevelEditorScene";
import type Scene from "./Scene";
import Time from "./util/Time";
import EventEmitter from "events";

export default class Window extends EventEmitter {
    public static resizable: boolean = false;

    private parent: HTMLElement;
    private rgb: vec4 = vec4.fromValues(0, 0, 0, 1);
    private width: number;
    private height: number;
    private title: string;
    private aspectRatio: number;
    private lockAspectRatio: boolean = false;

    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext | null;
    private currentScene: Scene = {} as Scene;
    public static loaded: boolean = false;
    private static window: Window | undefined;

    private constructor(width: number, height: number, title: string, parent: HTMLElement) {
        super();
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        this.title = title;
        this.canvas = document.createElement("canvas");
        this.canvas.style.maxWidth = "100%";
        this.canvas.style.maxHeight = "100%";
        this.canvas.style.aspectRatio = `${this.aspectRatio}`;
        this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.viewport(0, 0, this.width, this.height);
        if (Window.resizable) this.resize(null)
        this.parent = parent;
    }



    public run(): void {
        this.init();
        this.loop();
    }

    public static attachCanvas(parent: HTMLElement): void {
        const window = Window.get();
        try {
            if (window.parent) window.parent.removeChild(window.canvas)
        } catch (e) {
        }
        window.parent = parent;
        window.parent.innerHTML = "";
        window.parent.style.backgroundColor = `rgba(${Window.rgbConvert(window.rgb[0], window.rgb[1], window.rgb[2]).join(",")},1)`;
        window.parent.appendChild(window.canvas);

    }

    private static rgbConvert(r: number, g: number, b: number): number[] {
        return [r / 255, g / 255, b / 255];
    }

    private init(): void {
        this.setListeners();

        const gl = this.gl as WebGL2RenderingContext;
        if (gl === null) throw new Error("WebGL not supported");
        document.title = this.title;
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.parent.appendChild(this.canvas)
        const levelEditorScene = new LevelEditorScene();
        Window.changeScene(levelEditorScene);
        this.currentScene?.load();
        this.lockAspectRatio = true;
        if (Window.resizable) this.resize();
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    private loop(): void {
        const [r, g, b] = Window.rgbConvert(this.rgb[0], this.rgb[1], this.rgb[2]);
        let beginTime = Time.getTime();
        let endTime = Time.getTime();
        let timer = 0;
        let dt = 0;
        let gl = this.gl as WebGL2RenderingContext;
        let fpsDiv = document.getElementById("fps") as HTMLDivElement;

        const update = () => {
            dt = endTime - beginTime;
            timer += dt;
            if (timer > 1) {
                if (fpsDiv) fpsDiv.innerText = `FPS:${Math.floor((1 / dt))}`;
                timer -= 1;
            }
            beginTime = endTime;
            gl.clearColor(r, g, b, 1);

            gl.clear(gl.COLOR_BUFFER_BIT);
            if (this.currentScene) this.currentScene.update(dt);
            endTime = Time.getTime();
            requestAnimationFrame(update)
        }
        requestAnimationFrame(update)

    }

    private resize(event?: UIEvent | null) {
        // if (!this.gl) return;
        // const width = this.parent.offsetWidth
        // const height = this.parent.offsetHeight
        // this.canvas.style.maxWidth = width + "px";
        // this.canvas.style.maxHeight = height + "px";
        // this.canvas.style.width = "100%";
        // this.canvas.style.aspectRatio = `${this.aspectRatio}`;
    }

    private setListeners(): void {
        if (Window.resizable)
            window.addEventListener("resize", this.resize.bind(this));
    }

    public static getScene(): Scene {
        return Window.get().currentScene as Scene;
    }

    private emitLoaded() {
        const window = Window.get();
        Window.loaded = true;
        window.emit("loaded")
    }

    public static async changeScene(scene: Scene) {

        const window = Window.get();
        scene.removeListener("loaded", window.emitLoaded.bind(window));
        if (window.currentScene === scene) return;
        window.currentScene = scene;
        scene.init()
        scene.start();
        scene.addListener("loaded", window.emitLoaded.bind(window));
    }

    public static getWebGLContext(): WebGL2RenderingContext {
        return Window.get().gl as WebGL2RenderingContext;
    }

    public static getAspectRatio(): number {
        return Window.get().aspectRatio;
    }

    public static getResolution(): vec2 {
        return vec2.fromValues(Window.get().width, Window.get().height);
    }

    public static getWidth(): number {
        return Window.get().width;
    }

    public static getHeight(): number {
        return Window.get().height;
    }

    static get(parent?: HTMLElement): Window {
        if (Window.window === undefined) {
            const width = 1920
            const height = 1080;
            Window.window = new Window(width, height, "Titan", parent || document.body);
            Window.loaded = true;
        }
        return Window.window;
    }

}