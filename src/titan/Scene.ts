import Camera from "./Camera";
import GameObject from "./GameObject";
import Renderer from "./renderer/Renderer";
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

    //Export the scene as a json file
    public export(): void {
        const name = prompt("Enter a name for the scene");
        const serialized = this.getSerialized();
        const blob = new Blob([serialized], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    //import a json file as a scene
    public import(): void {
        this.addListener("loaded", () => {
            this.save();
            window.location.reload();
        })
        const reader = new FileReader();
        reader.onload = (event) => {
            //confirm that the user wants to overwrite the current scene
            const confirm = window.confirm("Are you sure you want to overwrite the current scene?");
            if (!confirm) return;
            const json = event.target?.result as string;
            console.log(json)
            this.loadJson(json);
            //save the scene to local storage then reload the page

        }
        //create a file input element to open the file dialog
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                reader.readAsText(file, "UTF-8");
            }
        }
        input.click();
        // remove the input element from the dom
        input.remove();
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