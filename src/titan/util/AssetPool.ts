import Spritesheet from "titan/components/Spritesheet";
import Shader from "titan/renderer/Shader";
import Texture from "titan/renderer/Texture";

export default class AssetPool {
    private static shaders: Map<string, Shader> = new Map<string, Shader>();
    private static textures: Map<string, Texture> = new Map<string, Texture>();
    private static spritesheets: Map<string, Spritesheet> = new Map<string, Spritesheet>();

    public static getShader(resourceName: string): Shader {
        if (AssetPool.shaders.has(resourceName)) {
            return this.shaders.get(resourceName)!;
        }
        const shader = new Shader(resourceName);
        shader.loadCompileLink();
        AssetPool.shaders.set(resourceName, shader);
        return shader;
    }

    public static getTexture(resourceName: string): Texture {
        if (AssetPool.textures.has(resourceName)) {
            return this.textures.get(resourceName)!;
        }
        const texture = new Texture();
        texture.init(resourceName)
        AssetPool.textures.set(resourceName, texture);
        return texture;
    }

    public static addSpritesheet(resourceName: string, spritesheet: Spritesheet) {
        if (!AssetPool.spritesheets.has(resourceName)) {
            AssetPool.spritesheets.set(resourceName, spritesheet);
        }
    }

    public static getSpritesheet(resourceName: string): Spritesheet {
        if (AssetPool.spritesheets.has(resourceName)) {
            return this.spritesheets.get(resourceName)!;
        }
        // return blank spritesheet
        return new Spritesheet(AssetPool.getTexture("/assets/images/blank.png"), 480, 480);
    }

}