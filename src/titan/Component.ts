import GameObject from "./GameObject";
import Transform from "./Transform";
import { vec2 } from "gl-matrix";
import { embedTypeRecursive } from "./util/Gson";
import Window from "./Window";

export default abstract class Component {
    public update(dt: number): void { }
    public start(): void { }
    public __gameObject: GameObject = new GameObject("blank", new Transform(vec2.create(), vec2.create()), 0);
    public serialize(): any {
        const objCopy = embedTypeRecursive(this);
        return objCopy
    }

    public getEditableFields(): any[] {
        const fields = [];
        for (const key in this) {
            // @ts-ignore
            if (typeof this[key] !== "function" && key[0] !== "_") {
                fields.push({ name: key, value: this[key] });
            }
        }
        fields.sort((a, b) => a.name.localeCompare(b.name))
        return fields;
    }

    public setEditableField(key: string, value: any) {
        // @ts-ignore
        this[key] = value;
        Window.getScene()?.save();
    }
}