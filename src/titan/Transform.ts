import { vec2 } from "gl-matrix"

export default class Transform {
    public position: vec2 = vec2.create();
    public scale: vec2 = vec2.create();

    constructor(position: vec2 = vec2.create(), scale: vec2 = vec2.create()) {
        this.position = position;
        this.scale = scale;
    }
}