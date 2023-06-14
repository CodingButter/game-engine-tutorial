import type GameObject from "titan/GameObject";
import RenderBatch from "./RenderBatch";
import SpriteRenderer from "titan/components/SpriteRenderer";
import Texture from "./Texture";

export default class Renderer {
    private MAX_BATCH_SIZE = 1000;
    private batches: RenderBatch[] = [];

    constructor() {
        console.log("Renderer created");
    }

    public add(gameObject: GameObject) {
        const spriteRenderer: SpriteRenderer = gameObject.getComponent(SpriteRenderer)!;
        if (spriteRenderer)
            this.addSpriteRenderer(spriteRenderer)
    }

    private addSpriteRenderer(sprite: SpriteRenderer) {
        let added = false;
        for (let batch of this.batches) {
            if (batch.hasRoom() && batch.getZIndex() === sprite?.__gameObject?.getZIndex()) {
                const tex: Texture | null = sprite.getTexture();
                if (tex === null || (batch.hasTexture(tex) || batch.hasTextureRoom())) {
                    batch.addSprite(sprite);
                    added = true;
                    break;
                }
            }
        }
        if (!added) {
            const newBatch = new RenderBatch(this.MAX_BATCH_SIZE, sprite.__gameObject?.getZIndex());
            newBatch.start();
            this.batches.push(newBatch);
            newBatch.addSprite(sprite);
            this.batches.sort((a, b) => a.getZIndex() - b.getZIndex());
        }
    }

    public render(): void {

        this.batches.forEach((batch) => {
            for (let batch of this.batches) {
                batch.render();
            }
        })
    }
}