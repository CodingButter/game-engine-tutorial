import Window from "./titan/Window"
export default class Main{
    private window: Window;
    constructor() {
        Window.resizable = true;
        this.window = Window.get();
        this.window.run();
    }
}

new Main();