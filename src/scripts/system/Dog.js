import { Container, AnimatedSprite } from "pixi.js";
import { App } from "./App";

export class Dog {
    constructor(data) {
        this.container = new Container();
        this.createBg(data);
        this.createAnim();
    }
    createBg(data) {
        this.bg = App.sprite("doggy");
        this.bg.scale.set(0.7);
        if (data.rotate) {
            this.bg.scale.x = -0.7;
        }
        this.bg.anchor.set(0.5);
        this.bg.x = 0;
        this.bg.y = 0;
        this.container.addChild(this.bg);
        this.container.x = data.posXLand;
        this.container.y = data.posYLand;
        this.container.interactive = false;
        this.container.on("click", this.playAnim);
        this.container.on("touchstart", this.playAnim);
    }
    createAnim() {
        const textureArray = [];
        for (let i = 1; i < 9; i++) {
            const texture = App.texture(`circle_${i}`);
            textureArray.push(texture);
        }
        this.animSprite = new AnimatedSprite(textureArray);
        this.animSprite.animationSpeed = 0.4;
        this.animSprite.anchor.set(0.5);
        this.animSprite.scale.x = -1;
        this.animSprite.renderable = false;
        this.container.addChild(this.animSprite);
        this.animSprite.loop = false;
    }
    playAnim = () => {
        if (this.animSprite.renderable === true) return;
        App.clickedDog += 1;
        if (App.clickedDog === 5) {
            App.scenes.scene.fadeIn(2000, true);
        }
        this.animSprite.renderable = true;
        this.animSprite.gotoAndPlay(0);
    }
}
