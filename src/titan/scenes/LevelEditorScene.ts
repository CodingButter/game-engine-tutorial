import { vec2 } from "gl-matrix";
import Scene from "./Scene";
import Camera from "titan/Camera";
import Renderer from "titan/renderer/Renderer";
import AssetPool from "titan/util/AssetPool";
import Spritesheet from "titan/components/Spritesheet";



export default class LevelEditorScene extends Scene {
  private spriteIndex: number = 0;
  private sprites: Spritesheet | null = null;
  private assetsLoaded: boolean = false;

  public init(): void {
    this.camera = new Camera(vec2.fromValues(0, 0))

    this.renderer = new Renderer()
    this.loadResources(() => {
      this.sprites = AssetPool.getSpritesheet("/assets/images/tileset.png") as Spritesheet
      this.assetsLoaded = true;
      this.save();
    })

  }

  private loadResources(loaded: () => void): void {
    AssetPool.getShader("/assets/shaders/default.glsl")
    const spritesheet = new Spritesheet(AssetPool.getTexture("/assets/images/tileset.png"), 8 * 8, 64, 64)
    AssetPool.addSpritesheet("/assets/images/tileset.png", spritesheet)
    spritesheet.on("load", loaded)
  }

  public update(dt: number): void {
    if (!this.assetsLoaded) return;
    this.camera.adjustProjection();
    for (let gameObject of this.gameObjects) {
      gameObject?.update(dt);
    }
    this.renderer.render()
  }
}