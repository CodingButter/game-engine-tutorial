import { vec2, vec4 } from "gl-matrix";
import Scene from "./Scene";
import Camera from "./Camera";
import GameObject from "./GameObject";
import Transform from "./Transform";
import SpriteRenderer from "./components/SpriteRenderer";
import Renderer from "./renderer/Renderer";
import AssetPool from "./util/AssetPool";
import Spritesheet from "./components/Spritesheet";
import Sprite from "./components/Sprite";

const gameObjectString = `{
    "name": "Object 2",
    "transform": {
        "position": {
            "0": 300,
            "1": 200
        },
        "scale": {
            "0": 100,
            "1": 100
        }
    },
    "components": [
        {
            "color": {
                "0": 1,
                "1": 1,
                "2": 1,
                "3": 1,
                "type": "Float32Array"
            },
            "sprite": {
                "texture": {
                    "filePath": "/assets/images/spritesheet.png",
                    "gl": {
                        "type": "WebGL2RenderingContext"
                    },
                    "textID": {
                        "type": "WebGLTexture"
                    },
                    "width": 224,
                    "height": 32,
                    "type": "Texture"
                },
                "texCoords": [
                    {
                        "0": 0.0714285746216774,
                        "1": 1,
                        "type": "Float32Array"
                    },
                    {
                        "0": 0.0714285746216774,
                        "1": 0.5,
                        "type": "Float32Array"
                    },
                    {
                        "0": 0,
                        "1": 0.5,
                        "type": "Float32Array"
                    },
                    {
                        "0": 0,
                        "1": 1,
                        "type": "Float32Array"
                    }
                ],
                "type": "Sprite"
            },
            "lastTransform": null,
            "type": "SpriteRenderer"
        }
    ]
}`

export default class LevelEditorScene extends Scene {

  private spriteIndex: number = 0;
  private spriteFliptime: number = 0.2;
  private spriteFlipLeft: number = 0;
  private obj1: GameObject | null = null;
  private obj2: GameObject | null = null;
  private sprites: Spritesheet | null = null;

  public init(): void {
    this.camera = new Camera(vec2.create())
    this.renderer = new Renderer()
    this.loadResources(() => {
      this.sprites = AssetPool.getSpritesheet("/assets/images/spritesheet.png") as Spritesheet

      this.obj1 = new GameObject("Object 1", new Transform(vec2.fromValues(250, 200), vec2.fromValues(100, 100)), -1)
      const spriteRenderer1 = new SpriteRenderer()
      spriteRenderer1.setColor(vec4.fromValues(1, 0.5, 0, 1))
      this.obj1.addComponent(spriteRenderer1)
      this.addGameObjectToScene(this.obj1)

      const deserialized = GameObject.deserialize(gameObjectString);
      console.log(deserialized);
      this.addGameObjectToScene(deserialized)
    })

  }

  private loadResources(loaded: () => void): void {
    AssetPool.getShader("/assets/shaders/default.glsl")
    const spritesheet = new Spritesheet(AssetPool.getTexture("/assets/images/spritesheet.png"), 26, 16)
    AssetPool.addSpritesheet("/assets/images/spritesheet.png", spritesheet)
    spritesheet.on("load", loaded)

  }


  public update(dt: number): void {


    this.spriteFlipLeft -= dt;
    if (this.spriteFlipLeft <= 0) {
      this.spriteFlipLeft = this.spriteFliptime;
      this.spriteIndex++;
      if (this.spriteIndex > 4) {
        this.spriteIndex = 0;
      }
      this.obj1?.getComponent(SpriteRenderer)?.setSprite(this.sprites?.getSprite(this.spriteIndex) as Sprite)
    }
    for (let gameObject of this.gameObjects) {
      gameObject?.update(dt);
    }
    this.renderer.render()
  }
}