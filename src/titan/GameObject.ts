import type Component from "./Component";
import Transform from "./Transform";
import * as Components from "./components";

export default class GameObject {
    public transform: Transform = new Transform();
    private name: string;
    private components: Component[] = [];
    private zIndex: number = 0;

    constructor(name: string, transform: Transform = new Transform(), zIndex?: number) {
        this.name = name;
        this.transform = transform;
        this.zIndex = zIndex || this.zIndex;
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
        component._gameObject = this;
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

    public static serialize(gameObject: GameObject): string {
        const obj: any = {};
        obj.name = gameObject.name;
        obj.transform = gameObject.transform;
        obj.components = [];
        for (let component of gameObject.components) {
            obj.components.push(component.serialize());
        }
        return obj;
    }

    public static deserialize(obj: any): GameObject {
        const gameObject = new GameObject(obj.name, Object.assign(new Transform(), obj.transform));
        for (let component of obj.components) {
            try {
                const componentInstance = Components[component.type].deserialize(component);
                gameObject.addComponent(componentInstance);
            } catch (e) {
                console.log(e)
            }
        }
        return gameObject;
    }
}