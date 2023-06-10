import Texture from "titan/renderer/Texture";
import Sprite from "./Sprite";
import { vec2 } from "gl-matrix";
import EventEmitter from "events";

export default class Spritesheet extends EventEmitter {
    private texture: Texture;
    private sprites: Set<Sprite> = new Set<Sprite>();

    constructor(texture: Texture | null, numSprites: number = 1, spriteWidth: number = 16, spriteHeight?: number, spacing?: number) {
        super();
        this.texture = texture as Texture;
        this.texture.on("load", () => {
            this.setSheet(this.texture, numSprites, spriteWidth, spriteHeight, spacing);
            this.emit("load");
        });
    }

    private async setSheet(texture: Texture, numSprites: number, spriteWidth: number, spriteHeight?: number, spacing?: number): Promise<void> {
        spacing = spacing || 0;
        numSprites = numSprites || 1;
        spriteHeight = spriteHeight || spriteWidth;
        let currentX = 0;
        let currentY = texture.getHeight() - spriteHeight;
        for (let i = 0; i < numSprites; i++) {
            let topY = (currentY + spriteHeight) / texture.getHeight();
            let rightX = (currentX + spriteWidth) / texture.getWidth();
            let leftX = currentX / texture.getWidth();
            let bottomY = currentY / texture.getHeight()

            const texCoords = [
                vec2.fromValues(rightX, topY),
                vec2.fromValues(rightX, bottomY),
                vec2.fromValues(leftX, bottomY),
                vec2.fromValues(leftX, topY)
            ]
            const sprite = new Sprite(texture, texCoords);
            this.sprites.add(sprite);
            currentX += spriteWidth + spacing;
            if (currentX + spriteWidth > texture.getWidth()) {
                currentX = 0;
                currentY -= spriteHeight + spacing;
            }
        }
    }

    public getSprite(index: number): Sprite {
        return Array.from(this.sprites)[index];
    }
}