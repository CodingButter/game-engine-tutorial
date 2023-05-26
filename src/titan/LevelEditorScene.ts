import { vec2, vec4 } from "gl-matrix";
import Scene from "./Scene";
import Camera from "./Camera";
import GameObject from "./GameObject";
import Transform from "./Transform";
import SpriteRenderer from "./components/SpriteRenderer";
import Renderer from "./renderer/Renderer";
import AssetPool from "./util/AssetPool";

export default class LevelEditorScene extends Scene {

  public init(): void {
    this.camera = new Camera(vec2.create())
    this.renderer = new Renderer()
    this.loadResources();
    const xOffset = 10;
    const yOffset = 10;

    const totalWidth = 600 - xOffset * 2;
    const totalHeight = 600 - yOffset * 2;
    const sizeX = totalWidth / 100.0
    const sizeY = totalHeight / 100.0

    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        let xPos = x * sizeX + xOffset;
        let yPos = y * sizeY + yOffset;
        let gameObject = new GameObject(
          `Object ${x} ${y}`,
          new Transform(
            vec2.fromValues(xPos, yPos),
            vec2.fromValues(sizeX, sizeY)
          ));

        gameObject.addComponent(
          new SpriteRenderer(
            vec4.fromValues(
              xPos / totalWidth,
              yPos / totalHeight,
              1.0,
              1.0
            )
          )
        )
        this.addGameObjectToScene(gameObject);
      }
    }

  }

  private loadResources(): void {
    AssetPool.getShader("/assets/shaders/default.glsl")

  }

  public update(dt: number): void {
    for (let gameObject of this.gameObjects) {
      gameObject?.update(dt);
    }
    this.renderer.render()
  }
}