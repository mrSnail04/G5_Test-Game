import * as PIXI from "pixi.js";

export class Scene {
    constructor() {
        this.container = new PIXI.Container();
        this.create();
    }
}
