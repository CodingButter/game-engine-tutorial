import Component from "titan/Component"
import Texture from "titan/renderer/Texture";
import Sprite from "titan/components/Sprite";
import { vec4, vec2 } from "gl-matrix"
import Transform from "titan/Transform";
import AssetPool from "titan/util/AssetPool";

export default class SpriteRenderer extends Component {
    private _color: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
    private sprite: Sprite = new Sprite();
    private __dirty: boolean = true;

    private lastTransform: Transform | null = null;

    public start(): void {
        this.lastTransform = this.__gameObject?.transform.copy();
    }

    public update(dt: number): void {
        if (!this.lastTransform?.equals(this.__gameObject?.transform)) {
            this.__gameObject?.transform.copyTo(this.lastTransform!);
            this.__dirty = true;
        }
    }


    public getColor(): vec4 {
        return this._color;
    }

    public getTexture(): Texture {
        return this.sprite.getTexture();
    }

    public getTexCoords(): vec2[] {
        return this.sprite.getTexCoords();
    }

    public setSprite(sprite: Sprite): void {
        this.sprite = sprite;
        this.__dirty = true;
    }

    public setColor(color: vec4): void {
        if (vec4.equals(this._color, color)) {
            return;
        }
        this._color = color;
        this.__dirty = true;
    }

    public isDirty(): boolean {
        return this.__dirty;
    }

    public setClean(): void {
        this.__dirty = false;
    }

    public static deserialize(data: any): SpriteRenderer {
        const spriteRenderer = new SpriteRenderer();
        spriteRenderer._color = vec4.fromValues(data._color[0], data._color[1], data._color[2], data._color[3]);
        spriteRenderer.sprite = new Sprite();
        spriteRenderer.sprite.setTexCoords(data.sprite.texCoords);
        const texture = AssetPool.getTexture(data.sprite.texture.filePath);
        spriteRenderer.sprite.setTexture(texture);
        return spriteRenderer;
    }
}