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
        this.gl = this.canvas.getContext("webgl2");
        if (Window.resizable) this.resize(null)
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
        if (this.gl === null) throw new Error("WebGL not supported");
        document.title = this.title;
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.parent.appendChild(this.canvas)
        Window.changeScene(Window.LEVEL_EDITOR_SCENE);
    }

    private loop(): void {
        let [r, g, b] = Window.rgbConvert(170, 166, 156);
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
                fpsDiv.innerText = `FPS:${Math.floor((1 / dt))}`;
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

    private resize(event: UIEvent | null) {
        if (!this.gl) return;
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
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

    static get(): Window {
        if (Window.window === undefined) {
            const width = Window.resizable ? window.innerWidth : 1920;
            const height = Window.resizable ? window.innerHeight : 1080;
            Window.window = new Window(width, height, "Titan", document.body);
        }
        return Window.window;
    }

}