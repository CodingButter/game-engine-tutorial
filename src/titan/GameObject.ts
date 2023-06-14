import { vec2 } from "gl-matrix";
import type Component from "./Component";
import Transform from "./Transform";
import * as Components from "./components";

export default class GameObject {
    public transform: Transform = new Transform();
    private name: string;
    private components: Component[] = [];
    private zIndex: number = 0;
    public id: string = "";

    constructor(name: string, transform: Transform = new Transform(), zIndex?: number) {
        this.name = name;
        this.transform = transform;
        this.zIndex = zIndex || this.zIndex;
        this.id = btoa(this.name + Math.random().toString(36).substring(7) + Date.now().toString(36)).replace(/[^a-zA-Z0-9]/g, "");
    }

    public getComponent<T extends Component>(component: new (...args: any[]) => T): T | null {
        for (let componentInstance of this.components) {
            if (componentInstance instanceof component) {
                return componentInstance;
            }
        }
        return null;
    }

    public removeComponent<T extends Component>(component: new (...args: any[]) => T): void {
        for (let componentInstance of this.components) {
            if (componentInstance instanceof component) {
                this.components.splice(this.components.indexOf(componentInstance), 1);
                return;
            }
        }
    }

    public addComponent<T extends Component>(component: T): void {
        this.components.push(component);
        component.__gameObject = this;
    }

    public update(dt: number): void {
        for (let component of this.components) {
            component.update(dt);
        }
    }

    public start(): void {
        for (let component of this.components) {
            component.start();
        }
    }

    public getZIndex(): number {
        return this.zIndex;
    }

    public getName(): string {
        return this.name;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public static serialize(gameObject: GameObject): string {
        const obj: any = {};
        obj.name = gameObject.name;
        obj.id = gameObject.id;
        obj.transform = gameObject.transform;
        obj.components = [];
        for (let component of gameObject.components) {
            obj.components.push(component.serialize());
        }
        return obj;
    }

    public static deserialize(obj: any): GameObject {
        const position = vec2.fromValues(obj.transform.position[0], obj.transform.position[1]);
        const scale = vec2.fromValues(obj.transform.scale[0], obj.transform.scale[1]);
        const transform = new Transform(position, scale);
        const gameObject = new GameObject(obj.name, transform);
        gameObject.id = obj.id;
        for (let component of obj.components) {
            try {
                // @ts-ignore
                const componentClass = Components[component.type] as any;
                const componentInstance = componentClass.deserialize(component);
                gameObject.addComponent(componentInstance);
            } catch (e) {
                console.log(e)
            }
        }
        return gameObject;
    }
}