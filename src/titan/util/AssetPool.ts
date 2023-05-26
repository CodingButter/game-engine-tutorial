import Shader from "@titan/renderer/Shader";
import Texture from "@titan/renderer/Texture";

export default class AssetPool {
    private static shaders: Map<string, Shader> = new Map<string, Shader>();
    private static textures: Map<string, Texture> = new Map<string, Texture>();

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
        const texture = new Texture(resourceName);
        AssetPool.textures.set(resourceName, texture);
        return texture;
    }
}