import Camera from "titan/Camera";
import GameObject from "titan/GameObject";
import Renderer from "titan/renderer/Renderer";
import EventEmitter from "events";

export default abstract class Scene {
    protected renderer: Renderer = {} as Renderer;
    protected camera: Camera = new Camera();
    private isRunning: boolean = false;
    protected gameObjects: GameObject[] = [];
    protected emitter: EventEmitter = new EventEmitter();
    protected levelLoaded: boolean = false;
    public abstract init(): void;
    public abstract update(dt: number): void
    public start(): void {
        this.isRunning = true;
        for (let gameObject of this.gameObjects) {
            gameObject.start();
            this.renderer.add(gameObject);
        }
    }

    public addGameObjectToScene(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
        if (this.isRunning) {
            gameObject.start();
            this.renderer.add(gameObject);
        }
    }

    public getGameObjects(): GameObject[] {
        return this.gameObjects;
    }

    public save(): any {
        const serialized = this.getSerialized();
        localStorage.setItem("scene", serialized);
    }

    public getSerialized(): any {
        let json = []
        for (let gameObject of this.gameObjects) {
            json.push(GameObject.serialize(gameObject))
        }
        return JSON.stringify(json)
    }

    public load(): void {

        const json = localStorage.getItem("scene");
        this.loadJson(json || "");
    }

    public loadJson(json: string): any {
        if (json.length > 0) {
            this.gameObjects = [];
            const gameObjects = JSON.parse(json);
            for (let gameObject of gameObjects) {
                const gameObj = GameObject.deserialize(gameObject);
                this.addGameObjectToScene(gameObj);
            }
        }
        this.levelLoaded = true;
        this.emitter.emit("loaded");

    }

    public addListener(event: string, listener: (...args: any[]) => void): void {
        this.emitter.addListener(event, listener);
    }

    public removeListener(event: string, listener: (...args: any[]) => void): void {
        this.emitter.removeListener(event, listener);
    }

    public isLoaded(): boolean {
        return this.levelLoaded;
    }

    public getCamera(): Camera {
        return this.camera;
    }
}