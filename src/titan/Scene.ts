import Camera from "./Camera";
import type GameObject from "./GameObject";
import Renderer from "./renderer/Renderer";

export default abstract class Scene {
    protected renderer: Renderer = {} as Renderer;
    protected camera: Camera = new Camera();
    private isRunning: boolean = false;
    protected gameObjects: Set<GameObject> = new Set<GameObject>();
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
        this.gameObjects.add(gameObject);
        if (this.isRunning) {
            gameObject.start();
            this.renderer.add(gameObject);
        }
    }

    public getCamera(): Camera {
        return this.camera;
    }
}