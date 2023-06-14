import Sprite from "./components/Sprite";
import SpriteRenderer from "./components/SpriteRenderer";
import { vec2 } from "gl-matrix";
import GameObject from "./GameObject";
import Transform from "./Transform";
import Window from "./Window";

class Prefabs {
    public static generateSpriteObject(sprite: Sprite, sizeX: number, sizeY: number): GameObject {
        const camera = Window.getScene().getCamera();
        const block = new GameObject("Sprite_Object_Gen", new Transform(vec2.clone(camera.position), vec2.fromValues(sizeX, sizeY)), 0);
        const renderer = new SpriteRenderer();
        renderer.setSprite(sprite);
        block.addComponent(renderer);
        return block;
    }
}

export default Prefabs;