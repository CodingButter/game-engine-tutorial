import EventEmitter from "events";
import {vec2} from "gl-matrix";
export default class MouseListener extends EventEmitter{
    private static instance: MouseListener | undefined;
    private scroll: vec2 = vec2.create();
    private position: vec2 = vec2.create();
    private lastPosition: vec2 = vec2.create();
    private delta: vec2 = vec2.create();
    private mouseButtonPressed: boolean[] = [];
    private isDragging: boolean = false;

    private constructor() {
        super();
        this.setListeners(); 
    }

    private setListeners(): void {
        document.addEventListener("contextmenu", MouseListener.contextMenu);
        document.addEventListener("mousedown", MouseListener.mouseDown);
        document.addEventListener("mouseup", MouseListener.mouseUp);
        document.addEventListener("mousemove", MouseListener.mouseMove);
        document.addEventListener("wheel", MouseListener.mouseScroll);
    }

    public static contextMenu(event: MouseEvent): void {
        event.preventDefault();
        MouseListener.get().emit("contextmenu", event)
    }

    public static mouseDown(event: MouseEvent): void {
        MouseListener.get().mouseButtonPressed[event.button] = true;
        MouseListener.get().emit("mousedown", event)
       
    }

    public static mouseUp(event: MouseEvent): void {
        MouseListener.get().mouseButtonPressed[event.button] = false;
        MouseListener.get().emit("mouseup", event)
    }

    public static mouseMove(event: MouseEvent): void {
        vec2.sub(MouseListener.get().delta, MouseListener.get().position, MouseListener.get().lastPosition);
        MouseListener.get().lastPosition = vec2.clone(MouseListener.get().position);
        MouseListener.get().position = vec2.fromValues(event.clientX, event.clientY);
        MouseListener.get().isDragging = MouseListener.get().mouseButtonPressed[0] || MouseListener.get().mouseButtonPressed[1] || MouseListener.get().mouseButtonPressed[2];
        MouseListener.get().emit("mousemove", event)
    }

    public static mouseScroll(event: WheelEvent): void {
        MouseListener.get().scroll = vec2.fromValues(event.deltaX, event.deltaY);
        MouseListener.get().emit("wheel", event)
    }

    public static get(): MouseListener {
        if (MouseListener.instance === undefined) {
            MouseListener.instance = new MouseListener();
        }
        return MouseListener.instance;
    }

    public static getScroll(): vec2 {
        return MouseListener.get().scroll;
    }

    public static getPosition(): vec2 {
        return MouseListener.get().position;
    }

    public static getDelta(): vec2 {
        return MouseListener.get().delta;
    }

    public static isDragging(): boolean {
        return MouseListener.get().isDragging;
    }

    public static isPressed(button: number): boolean {
        return MouseListener.get().mouseButtonPressed[button];
    }

}