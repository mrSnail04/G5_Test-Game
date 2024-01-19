import { Container, Text } from "pixi.js";
import { App } from "../system/App";
import gsap from "gsap";

export class Button {
    constructor() {
        this.container = new Container();
        this.createButton();
    }
    createButton() {
        this.textContainer = new Container();
        this.bg = App.sprite("btn");
        this.text = new Text("Play Now", {
            fill: 0xFFFFCC,
            fontSize: 50,
            fontWeight: 'bold',
            stroke: "#1a1a1a",
            strokeThickness: 2
        });
        this.bg.anchor.set(0.5);
        this.text.anchor.set(0.5);
        this.container.position.set(App.canvas.clientWidth / 2, 600);
        this.textContainer.addChild(this.bg);
        this.textContainer.addChild(this.text);
        this.container.addChild(this.textContainer);
        this.container.interactive = true;
        this.container.on("click", () => this.clickButton());
        this.container.on("touchstart", () => this.clickButton());
    }

    clickButton() {
        window.location.href = "http://www.g5.com/";
    }

    animateButton() {
        const wiggleTween = gsap.timeline({repeat: -1, yoyo: true});
        wiggleTween.fromTo(this.textContainer.scale,
        1,
        {x: this.textContainer.scale.x, y: this.textContainer.scale.y},
        {x: this.textContainer.scale.x * 1.1, y: this.textContainer.scale.y  * 1.1},
        )
    }
}
