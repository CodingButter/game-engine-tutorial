import Component from "@titan/Component"
import Texture from "@titan/renderer/Texture";
import Sprite from "@titan/components/Sprite";
import { vec4, vec2 } from "gl-matrix"
import Transform from "@titan/Transform";

export default class SpriteRenderer extends Component {
    private color: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    private sprite: Sprite = new Sprite();
    private _dirty: boolean = true;

    private lastTransform: Transform | null = null;

    public start(): void {
        this.lastTransform = this._gameObject?.transform.copy();
    }

    public update(dt: number): void {
        if (!this.lastTransform?.equals(this._gameObject?.transform)) {
            this._gameObject?.transform.copyTo(this.lastTransform!);
            this._dirty = true;
        }
    }


    public getColor(): vec4 {
        return this.color;
    }

    public getTexture(): Texture {
        return this.sprite.getTexture();
    }

    public getTexCoords(): vec2[] {
        return this.sprite.getTexCoords();
    }

    public setSprite(sprite: Sprite): void {
        this.sprite = sprite;
        this._dirty = true;
    }

    public setColor(color: vec4): void {
        if (vec4.equals(this.color, color)) {
            return;
        }
        this.color = color;
        this._dirty = true;
    }

    public isDirty(): boolean {
        return this._dirty;
    }

    public setClean(): void {
        this._dirty = false;
    }

    public static deserialize(data: any): SpriteRenderer {
        const spriteRenderer = new SpriteRenderer();

        spriteRenderer.color = vec4.fromValues(data.color[0], data.color[1], data.color[2], data.color[3]);
        spriteRenderer.sprite = new Sprite();
        spriteRenderer.sprite.setTexCoords(data.sprite.texCoords);
        const texture = new Texture(data.sprite.texture);
        texture.init(data.sprite.texture.filePath);
        spriteRenderer.sprite.setTexture(texture);

        return spriteRenderer;
    }
}