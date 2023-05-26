import type Component from "./Component";
import Transform from "./Transform";

export default class GameObject {
    public transform: Transform = {} as Transform;
    private name: string = "";
    private components: Set<Component> = new Set<Component>();

    constructor(name: string, transform: Transform = new Transform()) {

        this.name = name;
        this.components = new Set<Component>();
        this.transform = transform;
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
                this.components.delete(componentInstance);
                return;
            }
        }
    }

    public addComponent<T extends Component>(component: T): void {
        this.components.add(component);
        component.gameObject = this;
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
}