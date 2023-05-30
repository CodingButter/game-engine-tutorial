import GameObject from "./GameObject";
import Transform from "./Transform";
import { vec2, vec4 } from "gl-matrix";
import { embedTypeRecursive } from "./util/Gson";
import * as Components from "./components";
export default abstract class Component {
    public abstract update(dt: number): void;
    public start(): void { }
    public _gameObject: GameObject = new GameObject("blank", new Transform(vec2.create(), vec2.create()), 0);

    public serialize(): any {
        const objCopy = embedTypeRecursive(this);
        return objCopy
    }

    public imgui(): void {
        try {
            console.log("something");
        } catch (e) {
            console.assert(false, e)
        }
    }
}