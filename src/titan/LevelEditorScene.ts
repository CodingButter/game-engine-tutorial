import { vec2, vec4 } from "gl-matrix";
import Scene from "./Scene";
import Camera from "./Camera";
import GameObject from "./GameObject";
import Transform from "./Transform";
import SpriteRenderer from "./components/SpriteRenderer";
import Renderer from "./renderer/Renderer";
import AssetPool from "./util/AssetPool";
import Sprite from "./components/Sprite";
import Spritesheet from "./components/Spritesheet";

export default class LevelEditorScene extends Scene {

  public init(): void {
    this.camera = new Camera(vec2.create())
    this.renderer = new Renderer()
    this.loadResources(() => {
      const sprites = AssetPool.getSpritesheet("/assets/images/spritesheet.png")

      console.log(sprites)

      const obj1 = new GameObject("Object 1", new Transform(vec2.fromValues(0, 0), vec2.fromValues(100, 100)))
      obj1.addComponent(new SpriteRenderer(sprites.getSprite(0)))
      this.addGameObjectToScene(obj1)

      const obj2 = new GameObject("Object 2", new Transform(vec2.fromValues(300, 300), vec2.fromValues(100, 100)))
      obj2.addComponent(new SpriteRenderer(sprites.getSprite(15)))
      this.addGameObjectToScene(obj2)
    })
  }

  private loadResources(loaded: () => void): void {
    AssetPool.getShader("/assets/shaders/default.glsl")
    const spritesheet = new Spritesheet(AssetPool.getTexture("/assets/images/spritesheet.png"), 26, 16)
    AssetPool.addSpritesheet("/assets/images/spritesheet.png", spritesheet)
    spritesheet.on("load", loaded)

  }


  public update(dt: number): void {
    for (let gameObject of this.gameObjects) {
      gameObject?.update(dt);
    }
    this.renderer.render()
  }
}