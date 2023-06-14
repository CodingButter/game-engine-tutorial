import Camera from 'titan/Camera';
import GameObject from 'titan/GameObject';
import Scene from 'titan/scenes/Scene';
import Window from 'titan/Window'
import Prefabs from 'titan/Prefab';
import AssetPool from 'titan/util/AssetPool';
import { vec2 } from 'gl-matrix';

export class WindowManager {
    public static get(): Window {
        return Window.get();
    }

    public static width(): number {
        return Window.getWidth();
    }

    public static height(): number {
        return Window.getHeight();
    }

    public static addListener(event: string, callback: () => void): void {
        Window.get().addListener(event, callback);
    }

    public staticremoveListener(event: string, callback: () => void): void {
        Window.get().removeListener(event, callback);
    }

    public static changeScene(scene: Scene): void {
        Window.changeScene(scene);
    }

    public static attachCanvas(canvas: HTMLDivElement): void {
        Window.attachCanvas(canvas);
    }
}


export class SceneManager {
    public static active(): Scene {
        return Window.getScene();
    }

    public static change(scene: Scene): void {
        Window.changeScene(scene);
    }

    public static gameObjects(): Array<GameObject> {
        const scene = Window.getScene();
        return scene.getGameObjects();
    }

    public static camera(): Camera {
        const scene = SceneManager.active();
        return scene.getCamera();
    }

    public static addBlockToScene(path: string, spriteId: number): GameObject {
        const scene = SceneManager.active();
        const spritesheet = AssetPool.getSpritesheet(path);
        const sprite = spritesheet?.getSprite(spriteId);
        const gameObject = Prefabs.generateSpriteObject(sprite, 32, 32);
        gameObject.transform.position = vec2.fromValues(SceneManager.camera().position[0], SceneManager.camera().position[1]);
        scene.addGameObjectToScene(gameObject);
        return gameObject;
    }
}

class Titan {
    public static WindowManager = WindowManager;
    public static SceneManager = SceneManager;
    public static Save(): void {
        Window.getScene()?.save();
    }

    public static Load(): void {
        Window.getScene()?.load();
    }
}

export default Titan;