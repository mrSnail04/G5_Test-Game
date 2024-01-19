import { Container, Text } from "pixi.js";
import { App } from "../system/App";
import gsap from "gsap";

export class StartGame {
    constructor() {
        this.container = new Container();
        this.createStartScreenText();
    }
    createStartScreenText() {
        this.bgStartScreenText = new Container();
        const text_1 = new Text("5 Hidden Dogs", {
            fill: "#FFFFFF",
            fontSize: 80,
            fontWeight: 'bold',
        });
        const text_2 = new Text("Can you spot them?", {
            fill: "#FFFFFF",
            fontSize: 80,
            fontWeight: 'bold',
        });
        const dog = App.sprite("doggy");
        dog.anchor.set(0.5, 0.5);
        dog.scale.x = -1;
        dog.position.x = text_1.width/2 + 70;
        text_1.addChild(dog);
        text_1.pivot.x = dog.width / 2;
        text_1.position.x = 0;
        text_2.position.set(0, 120);
        text_1.anchor.set(0.5, 0.5);
        text_2.anchor.set(0.5, 0.5);
        this.bgStartScreenText.addChild(text_1);
        this.bgStartScreenText.addChild(text_2);
        this.bgStartScreenText.pivot.set(0, text_2.height / 2);
        this.bgStartScreenText.position.set(App.canvas.clientWidth/2, App.canvas.clientHeight/2);
        this.container.pivot.set(App.canvas.clientWidth/2, App.canvas.clientHeight/2);
        this.container.position.set(App.canvas.clientWidth/2, App.canvas.clientHeight/2);
        this.container.addChild(this.bgStartScreenText);
    }
    scaleStartScreen() {
        const wiggleTween = gsap.timeline();
        wiggleTween.fromTo(
            this.bgStartScreenText.scale,
            7,
            {x: this.bgStartScreenText.scale.x, y: this.bgStartScreenText.scale.y},
            {x: this.bgStartScreenText.scale.x * 1.1, y: this.bgStartScreenText.scale.y * 1.1, repeat: 0}
        );
    }

}
