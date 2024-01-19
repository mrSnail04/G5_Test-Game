import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(png|jpe?g)$/)),
    scenes: {
        "Game": GameScene,
    },
    dogsInfo: [
        {id: 0, posYLand: 265, posXLand: 181, posYPort: 300, posXPort: 260, rotate: true},
        {id: 1, posYLand: 330, posXLand: 550, posYPort: 545, posXPort: 460, rotate: true},
        {id: 2, posYLand: 610, posXLand: 230, posYPort: 650, posXPort: 270, rotate: false},
        {id: 3, posYLand: 255, posXLand: 930, posYPort: 330, posXPort: 675, rotate: false},
        {id: 4, posYLand: 600, posXLand: 970, posYPort: 820, posXPort: 580, rotate: false}
    ]
};
