import Scene from "./Scene";
import type Shader from "./renderer/Shader";

export default class LevelScene extends Scene{
    public getShader(): Shader {
       return "" as unknown as Shader;
    }
    public init(): void {
        
    }
    public update(dt: number): void {
        
    }
}