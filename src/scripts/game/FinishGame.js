import { Container, Text } from "pixi.js";
import { App } from "../system/App";

export class FinishGame {
    constructor() {
        this.container = new Container();
        this.createFinishText();
    }
    createFinishText() {
        this.text_1 = new Text("Great Jod", {
            fill: [0xEEE8AA, 0xFFA500],
            fillGradientStops: [0, 0.8],
            fontSize: 90,
            fontWeight: 'bold',
            stroke: "#1a1a1a",
            strokeThickness: 2
        });
        this.text_2 = new Text("Can you solve", {
            fill: "#FFFFFF",
            fontSize: 55,
            fontWeight: 'bold',
            stroke: "#000000",
            strokeThickness: 2
        });
        this.text_3 = new Text("every mystery?", {
            fill: "#FFFFFF",
            fontSize: 55,
            fontWeight: 'bold',
            stroke: "#000000",
            strokeThickness: 2
        });
        this.logo = App.sprite("logo");
        this.charLand = App.sprite("char");
        this.charPort = App.sprite("char2");
        this.logo.anchor.set(0.5);
        this.charPort.scale.set(-0.5, 0.5);
        this.charPort.anchor.set(0.5);
        this.charPort.position.set(0, -20);
        this.charLand.scale.set(0.9);
        this.charLand.anchor.set(0.5, 0.5);
        this.charLand.position.set(-390, 10);
        this.text_1.anchor.set(0.5);
        this.text_2.anchor.set(0.5);
        this.text_3.anchor.set(0.5);
        this.container.addChild(this.charLand);
        this.container.addChild(this.charPort);
        this.container.addChild(this.logo);
        this.container.addChild(this.text_1);
        this.container.addChild(this.text_2);
        this.container.addChild(this.text_3);
        this.container.renderable = false;
        this.container.position.set(App.canvas.clientWidth/2, App.canvas.clientHeight/2);
    }
    resizePortrait() {
        this.charLand.renderable = false;
        this.charPort.renderable = true;
        this.logo.position.y = -350;
        this.text_1.style.fontSize = 120;
        this.text_2.style.fontSize = 70;
        this.text_3.style.fontSize = 70;
        this.text_1.position.y = -10;
        this.text_2.position.y = 80;
        this.text_3.position.y = 150;
    }
    resizeLandscape() {
        this.charLand.renderable = true;
        this.charPort.renderable = false;
        this.logo.position.y = -190;
        this.text_1.style.fontSize = 90;
        this.text_2.style.fontSize = 45;
        this.text_3.style.fontSize = 45;
        this.text_1.position.y = -40;
        this.text_2.position.y = 30;
        this.text_3.position.y = 90;
    }
}
