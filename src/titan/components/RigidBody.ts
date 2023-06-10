import { vec3 } from "gl-matrix";
import Component from "titan/Component";
import { Num } from "titan/util/DataTypes";

export class RigidBody extends Component {
    private colliderType: number = 0;
    public friction: Num = new Num(.8, 0, 1, 0.01, 2);
    public mass: Num = new Num(1, 0, 100, 1, 0);
    public dynamic: boolean = false;
    public velocity: vec3 = vec3.fromValues(0, 0.5, 0);

    public static deserialize(data: any): RigidBody {
        const rigidBody = new RigidBody();
        rigidBody.colliderType = data.colliderType;
        rigidBody.dynamic = data.dynamic;
        rigidBody.mass = new Num(data.mass.value, data.mass.min, data.mass.max, data.mass.step, data.mass.precision);
        rigidBody.friction = new Num(data.friction.value, data.friction.min, data.friction.max, data.friction.step, data.friction.precision);
        rigidBody.velocity = vec3.fromValues(data.velocity[0], data.velocity[1], data.velocity[2]);
        return rigidBody;
    }
}

export default RigidBody;