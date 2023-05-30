import { vec2 } from "gl-matrix";
import LevelEditorScene from "./LevelEditorScene";
import LevelScene from "./LevelScene";
import type Scene from "./Scene";
import Time from "./util/Time";

export default class Window {
    public static resizable: boolean = false;
    public static LEVEL_SCENE: number = 1;
    public static LEVEL_EDITOR_SCENE: number = 0;

    private parent: HTMLElement;
    private width: number;
    private height: number;
    private title: string;
    private aspectRatio: number;
    private lockAspectRatio: boolean = false;

    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext | null;
    private currentScene: Scene = {} as Scene;
    private static window: Window | undefined;

    private constructor(width: number, height: number, title: string, parent: HTMLElement) {
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        this.title = title;
        this.canvas = document.createElement("canvas");


        this.parent = parent;
    }

    public run(): void {
        this.init();
        this.loop();
    }

    private static rgbConvert(r: number, g: number, b: number): number[] {
        return [r / 255, g / 255, b / 255];
    }

    private init(): void {
        this.setListeners();
        const gl = this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
        gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.viewport(0, 0, this.width, this.height);
        if (gl === null) throw new Error("WebGL not supported");
        document.title = this.title;
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.parent.appendChild(this.canvas)
        if (Window.resizable) this.resize(null)
        Window.changeScene(Window.LEVEL_EDITOR_SCENE);
        this.currentScene?.load();
        document.body.addEventListener("click", () => {
            this.currentScene.save();
        })
        this.lockAspectRatio = true;
        if (Window.resizable) this.resize();
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }


    private loop(): void {
        let [r, g, b] = Window.rgbConvert(0, 0, 0);
        let beginTime = Time.getTime();
        let endTime = Time.getTime();
        let timer = 0;
        let dt = 0;
        let gl = this.gl as WebGL2RenderingContext;
        let fpsDiv = document.getElementById("fps") as HTMLDivElement;

        const update = (time: number) => {
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
        if (!this.gl) return;
        const width = this.parent.offsetWidth
        const height = this.parent.offsetHeight
        console.log(width, height)
        if (this.lockAspectRatio) {
            if (width / height > this.aspectRatio) {
                this.canvas.style.width = `${(height * this.aspectRatio)}px`;
                this.canvas.style.height = `${height}px`;
            } else {
                this.canvas.style.width = `${width}px`;
                this.canvas.style.height = `${(width / this.aspectRatio)}px`;
            }
        } else {
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
        }


    }

    private setListeners(): void {
        if (Window.resizable)
            window.addEventListener("resize", this.resize.bind(this));
    }

    public static getScene(): Scene {
        return Window.get().currentScene as Scene;
    }

    public static changeScene(newScene: number) {
        switch (newScene) {
            case 0:
                Window.get().currentScene = new LevelEditorScene() as Scene;
                Window.get().currentScene.init()
                Window.get().currentScene.start();
                break;
            case 1:
                Window.get().currentScene = new LevelScene() as Scene;
                Window.get().currentScene.init()
                Window.get().currentScene.start();
                break;
            default:
                console.warn(`Scene ${newScene} not found`)
        }
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
            const width = 1920;
            const height = 900;
            if (!parent) {
                parent = document.createElement("div");
                parent.id = "game";
                parent.style.width = "100vw";
                parent.style.height = "100vh";
                parent.style.display = "flex";
                parent.style.justifyContent = "center";
                parent.style.alignItems = "center";
                document.body.appendChild(parent);
            }
            Window.window = new Window(width, height, "Titan", parent as HTMLElement);
        }
        return Window.window;
    }

}