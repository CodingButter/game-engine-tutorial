import GameObject from "./GameObject";

export default abstract class Component {
    public abstract update(dt: number): void;
    public constructor() { }
    public start(): void { }
    public gameObject: GameObject = new GameObject("blank");
}