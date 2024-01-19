import { App } from "../system/App";
import { Container } from "pixi.js";

export class Background {
    constructor() {
        this.container = new Container();
        this.createSprite();
        window.addEventListener("resize", () => this.resize())
    }

    createSprite() {
        this.sprite = App.sprite("back_five_dogs");
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(window.innerWidth/2, window.innerHeight/2);
        this.container.addChild(this.sprite);
        this.resize();
    }
    resize() {
        const bgW = 1075;
        const bgH = 767;
        const ratio = bgW/bgH;
        if (window.innerWidth / window.innerHeight >= ratio) {
            this.sprite.scale.set(window.innerWidth / bgW)
            this.sprite.anchor.set(0.5);
            this.sprite.position.set(window.innerWidth/2, window.innerHeight/2);
        } else {
            this.sprite.scale.set(window.innerHeight / bgH)
            this.sprite.anchor.set(0.5)
            if (window.innerWidth / window.innerHeight < 1.17) {
                this.sprite.position.set(window.innerWidth/2 - 80, window.innerHeight/2);
            } else {
                this.sprite.position.set(window.innerWidth/2, window.innerHeight/2);
            }
        }
    }
}
