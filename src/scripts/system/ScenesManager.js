import * as PIXI from "pixi.js";
import { App } from "./App";

export class ScenesManager {
    constructor() {
        this.container = new PIXI.Container();
        this.scene = null;
    }

    start(scene) {
        this.scene = new App.config.scenes[scene]();
        this.container.addChild(this.scene.container);
    }
}
