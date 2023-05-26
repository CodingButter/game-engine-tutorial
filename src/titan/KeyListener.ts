import { EventEmitter } from "events";

export default class KeyListener extends EventEmitter{
    private static instance: KeyListener | undefined;
    private keyPressed: boolean[] = [];

    private constructor() {
        super();
        this.setListeners(); 
    }

    private setListeners(): void {
        window.addEventListener("keydown", KeyListener.keyDown);
        window.addEventListener("keyup", KeyListener.keyUp);
    }

    public static get(): KeyListener {
        if (KeyListener.instance === undefined) {
            KeyListener.instance = new KeyListener();
        }
        return KeyListener.instance;
    }

    public static keyDown(event: KeyboardEvent): void {
        KeyListener.get().keyPressed[event.location] = true;
        KeyListener.get().emit("keydown", event)
    }

    public static keyUp(event: KeyboardEvent): void {
        KeyListener.get().keyPressed[event.location] = false;
        KeyListener.get().emit("keyup", event)
    }

}