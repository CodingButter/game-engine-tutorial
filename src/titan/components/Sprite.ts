import Component from "@titan/Component";
import Texture from "@titan/renderer/Texture";
import { vec2 } from "gl-matrix";

export default class Sprite {
    private texture: Texture | undefined | null;
    private texCoords: vec2[] = [
        vec2.fromValues(1.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec2.fromValues(0.0, 0.0),
        vec2.fromValues(0.0, 1.0)
    ];
    constructor(texture?: Texture, texCoords?: vec2[]) {
        this.texture = texture;
        this.texCoords = texCoords || this.texCoords;
    }

    public start(): void {
    }

    public update(dt: number): void {
    }

    public getTexture(): Texture | null | undefined {
        return this.texture;
    }

    public getTexCoords(): vec2[] {
        return this.texCoords;
    }
}