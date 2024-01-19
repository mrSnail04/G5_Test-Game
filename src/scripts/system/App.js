import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";

export class Application {
    run(config) {
        PIXI.settings.RESOLUTION = window.devicePixelRatio || 2;
        this.clickedDog = 0;
        this.config = config;
        this.canvas = document.querySelector(".canvas");

        this.app = new PIXI.Application({
            resizeTo: this.canvas,
            autoDensity: true,
            backgroundColor: 0x000000
        });
        globalThis.__PIXI_APP__ = this.app;

        this.canvas.appendChild(this.app.view);

        this.loader = new Loader(this.app.loader, this.config);
        this.loader.preloader().then(() => this.start());

        this.scenes = new ScenesManager();
        this.app.stage.addChild(this.scenes.container);
    }

    sprite(key) {
        return new PIXI.Sprite(this.loader.resources[key].texture);
    }

    texture(key) {
        return new PIXI.Texture(this.loader.resources[key].texture);
    }

    start() {
        this.scenes.start("Game");
    }
}

export const App = new Application();
