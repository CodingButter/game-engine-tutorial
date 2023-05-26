import Component from "@titan/Component"
import { vec4 } from "gl-matrix"

export default class SpriteRenderer extends Component {
    private color: vec4 = {} as vec4;
    constructor(color: vec4 = vec4.create()) {
        super();
        this.color = color;
    }

    public start(): void {
    }

    public update(dt: number): void {
    }

    public getColor(): vec4 {
        return this.color;
    }


}