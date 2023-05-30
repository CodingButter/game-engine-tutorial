import Camera from "./Camera";
import GameObject from "./GameObject";
import Renderer from "./renderer/Renderer";

export default abstract class Scene {
    protected renderer: Renderer = {} as Renderer;
    protected camera: Camera = new Camera();
    private isRunning: boolean = false;
    protected gameObjects: Set<GameObject> = new Set<GameObject>();
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
        this.gameObjects.add(gameObject);
        if (this.isRunning) {
            gameObject.start();
            this.renderer.add(gameObject);
        }
    }

    public save(): void {
        let json = []
        for (let gameObject of this.gameObjects) {
            json.push(GameObject.serialize(gameObject))
        }
        localStorage.setItem("scene", JSON.stringify(json));
    }

    public load(): void {
        const json = localStorage.getItem("scene");
        if (json) {
            const gameObjects = JSON.parse(json);
            for (let gameObject of gameObjects) {
                const gameObj = GameObject.deserialize(gameObject);
                this.addGameObjectToScene(gameObj);
            }
        }
        this.levelLoaded = true;

    }
    public getCamera(): Camera {
        return this.camera;
    }
}