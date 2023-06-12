import { vec2 } from "gl-matrix";
import Scene from "./Scene";
import Camera from "./Camera";
import GameObject from "./GameObject";
import Renderer from "./renderer/Renderer";
import AssetPool from "./util/AssetPool";
import Spritesheet from "./components/Spritesheet";
// import SpriteRenderer from "./components/SpriteRenderer";
// import Sprite from "./components/Sprite";
// import RigidBody from "./components/RigidBody";
// import Transform from "./Transform";
// import { vec4 } from "gl-matrix";



export default class LevelEditorScene extends Scene {


  private spriteIndex: number = 0;
  private spriteFliptime: number = 0.2;
  private spriteFlipLeft: number = 0;
  private obj1: GameObject | null = null;
  private activeGameObject: GameObject | null = this.obj1;
  private sprites: Spritesheet | null = null;
  private assetsLoaded: boolean = false;

  public init(): void {
    this.camera = new Camera(vec2.create())
    this.renderer = new Renderer()
    this.loadResources(() => {
      this.sprites = AssetPool.getSpritesheet("/assets/images/spritesheet.png") as Spritesheet


      // this.obj1 = new GameObject("Mario", new Transform(vec2.fromValues(250, 200), vec2.fromValues(100, 100)), -1)
      // const spriteRenderer1 = new SpriteRenderer()
      // spriteRenderer1.setColor(vec4.fromValues(1, 0.5, 0, 1))
      // spriteRenderer1.setSprite(this.sprites?.getSprite(0) as Sprite)
      // this.obj1.addComponent(spriteRenderer1)
      // this.obj1.addComponent(new RigidBody());
      // this.addGameObjectToScene(this.obj1)

      this.assetsLoaded = true;
      this.setActiveGameObject(this.gameObjects[0])
      this.save();
    })

  }

  public setActiveGameObject(gameObject: GameObject) {
    this.activeGameObject = gameObject;
    this.emitter.emit("activeGameObjectChanged", this.activeGameObject)
  }

  public getActiveGameObject(): GameObject {
    return this.activeGameObject as GameObject;
  }


  private loadResources(loaded: () => void): void {
    AssetPool.getShader("/assets/shaders/default.glsl")
    const spritesheet = new Spritesheet(AssetPool.getTexture("/assets/images/spritesheet.png"), 26, 16)
    AssetPool.addSpritesheet("/assets/images/spritesheet.png", spritesheet)
    spritesheet.on("load", loaded)
  }

  public update(dt: number): void {
    if (!this.assetsLoaded) return;
    for (let gameObject of this.gameObjects) {
      gameObject?.update(dt);
    }
    this.renderer.render()
  }
}