import { vec2 } from "gl-matrix"

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

    public setScale(scale: vec2): void {
        this.scale = scale;
    }


    public equals(transform: Transform): boolean {
        return vec2.equals(this.position, transform.position) && vec2.equals(this.scale, transform.scale);
    }
}