import Component from "@titan/Component"
import Texture from "@titan/renderer/Texture";
import Sprite from "@titan/components/Sprite";
import { vec4, vec2 } from "gl-matrix"

export default class SpriteRenderer extends Component {
    private color: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    private sprite: Sprite;

    constructor(sprite?: Sprite, color?: vec4) {
        super();
        this.color = color || this.color;
        this.sprite = sprite || new Sprite(null);
    }

    public start(): void {
    }

    public update(dt: number): void {
    }

    public getColor(): vec4 {
        return this.color;
    }

    public getTexture(): Texture | null {
        return this.sprite.getTexture() as Texture;
    }

    public getTexCoords(): vec2[] {
        return this.sprite.getTexCoords();
    }
}