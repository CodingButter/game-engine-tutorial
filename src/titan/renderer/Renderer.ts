import type GameObject from "@titan/GameObject";
import RenderBatch from "./RenderBatch";
import SpriteRenderer from "@titan/components/SpriteRenderer";
import Shader from "./Shader";

export default class Renderer {
    private MAX_BATCH_SIZE = 1000;
    private batches: Set<RenderBatch> = new Set<RenderBatch>();

    constructor() {
        console.log("Renderer created");
        this.batches = new Set<RenderBatch>();
    }

    public add(gameObject: GameObject) {
        const spriteRenderer: SpriteRenderer = gameObject.getComponent(SpriteRenderer)!;
        if (spriteRenderer)
            this.addSpriteRenderer(spriteRenderer)
    }

    private addSpriteRenderer(sprite: SpriteRenderer) {
        let added = false;
        for (let batch of this.batches) {
            if (batch.hasRoom()) {
                batch.addSprite(sprite);
                added = true;
                break;
            }
        }
        if (!added) {
            const newBatch = new RenderBatch(this.MAX_BATCH_SIZE);
            newBatch.start();
            this.batches.add(newBatch);
            newBatch.addSprite(sprite);
        }
    }

    public render(): void {
        for (let batch of this.batches) {
            batch.render();
        }
    }
}