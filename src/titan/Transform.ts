import { vec2 } from "gl-matrix"
import Window from "./Window";
export default class Transform {
    public position: vec2 = vec2.create();
    public scale: vec2 = vec2.create();

    constructor(position: vec2 = vec2.create(), scale: vec2 = vec2.create()) {
        this.position = position;
        this.scale = scale;
    }

    public copy(): Transform {
        return new Transform(vec2.clone(this.position), vec2.clone(this.scale));
    }

    public copyTo(transform: Transform): void {
        transform.position = vec2.clone(this.position);
        transform.scale = vec2.clone(this.scale);
    }

    public setPosition(position: vec2): void {
        this.position = position;
    }

    public getPosition(): vec2 {
        return this.position;
    }

    public getScale(): vec2 {
        return this.scale;
    }

    public setScale(scale: vec2): void {
        this.scale = scale;
    }

    public equals(transform: Transform): boolean {
        return vec2.equals(this.position, transform.position) && vec2.equals(this.scale, transform.scale);
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