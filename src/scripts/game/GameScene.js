import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Graphics, settings, Ticker } from "pixi.js";
import { Dog } from "../system/Dog";
import { App } from "../system/App";
import { FinishGame } from "./FinishGame";
import { Button } from "./Button";
import { StartGame } from "./StartGame";

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createDogs();
        this.createOverlay();
        this.createStartScreen();
        this.createFinishScreen();
        this.createButton();
        window.addEventListener('resize', () => this.resize());
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createDogs() {
        this.dogs = [];
        for (let i = 0; i < 5; i++){
            const dog = new Dog(App.config.dogsInfo[i])
            this.container.addChild(dog.container);
            this.dogs.push(dog);
        }
        this.container.name="GameScene";
        this.resize();
    }

    createOverlay() {
        this.overlay = new Graphics();
        this.overlay.alpha = 0;
        this.overlay.beginFill(0x000000);
        this.overlay.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.overlay.endFill();
        this.container.addChild(this.overlay);
        this.resize();
    }

    createStartScreen() {
        this.startScreen = new StartGame();
        this.fadeIn(2000, false);
        this.startScreen.scaleStartScreen();
        this.container.addChild(this.startScreen.container);
        this.resize();
    }

    createFinishScreen() {
        this.finishScreen = new FinishGame();
        this.container.addChild(this.finishScreen.container);
        this.resize();
    }

    createButton() {
        this.button = new Button();
        this.container.addChild(this.button.container);
        this.resize();
    }

    fadeIn(duration, finishScreen) {
        this.overlay.renderable = true;
        this.overlay.alpha = 0;
        if (!finishScreen){
            this.startScreen.container.renderable = true;
            this.startScreen.container.alpha = 0;
        } else {
            this.finishScreen.container.renderable = true;
            this.finishScreen.container.alpha = 0;
            this.button.animateButton();
        }
        const ticker = Ticker.shared;
        const onTick = (delta) => {
            this.overlay.alpha += delta / settings.TARGET_FPMS / duration;
            if (!finishScreen){
                this.startScreen.container.alpha += delta / settings.TARGET_FPMS / duration;
            } else {
                this.finishScreen.container.alpha += delta / settings.TARGET_FPMS / duration;
            }
            if (this.overlay.alpha > 0.95) {
                ticker.remove(onTick);
                if (!finishScreen){
                    setTimeout(() => this.fadeOut(2000), 3000);
                }
            }
        };
        ticker.add(onTick);
    }

    fadeOut(duration) {
        this.overlay.alpha = 0.95;
        this.startScreen.container.alpha = 0.95;
        const ticker = Ticker.shared;
        const onTick = (delta) => {
            this.overlay.alpha -= delta / settings.TARGET_FPMS / duration;
            this.startScreen.container.alpha -= delta / settings.TARGET_FPMS / duration;
            if (this.overlay.alpha < 0) {
                ticker.remove(onTick);
                this.dogs.map((el) => el.container.interactive = true)
                this.overlay.renderable = false;
                this.startScreen.container.renderable = false;
                this.resize();
            }
        };
        ticker.add(onTick);
    }
    resize() {
        const w = App.canvas.clientWidth;
        const h = App.canvas.clientHeight;
        const ration = w/h;
        const bgW = 1075;
        const bgH = 767;
        const bgRation = bgW/bgH;
        if (this.overlay) {
            this.overlay.width = w;
            this.overlay.height = h;
        }
        if (ration >= 1) {
            this.button?.container.scale.set(h/bgH);
            this.button?.container.position.set(w/2, h/1.2);

            this.startScreen?.container.scale.set(h/bgH * 0.9);
            this.startScreen?.container.position.set(w/2, h/2);

            this.finishScreen?.resizeLandscape();
            this.finishScreen?.container.scale.set(h/bgH);
            this.finishScreen?.container.position.set(w/2, h/2);

            this.dogs.map((el, i) =>{
                el.container.position.x = w * App.config.dogsInfo[i].posXLand / bgW;
                el.container.position.y = h * App.config.dogsInfo[i].posYLand / bgH;
            })
            if (ration >= bgRation) {
                this.dogs.map((el)=> el.container.scale.set(w/bgW));
            } else {
                this.dogs.map((el)=> el.container.scale.set(h/bgH));
            }
        } else {
            this.button?.container.scale.set(w/bgW * 1.3);
            this.button?.container.position.set(w/2, h/1.1);

            this.startScreen?.container.scale.set(w/bgW);
            this.startScreen?.container.position.set(w/2, h/2);

            this.finishScreen?.resizePortrait();
            this.finishScreen?.container.scale.set(w/bgH);
            this.finishScreen?.container.position.set(w/2, h/1.7);

            this.dogs.map((el, i) => {
                el.container.position.x = w * App.config.dogsInfo[i].posXPort / bgH;
                el.container.position.y = h * App.config.dogsInfo[i].posYPort / bgW;
            })
            if (ration >= bgRation) {
                this.dogs.map((el)=> el.container.scale.set(w/bgW));
            }else {
                this.dogs.map((el)=> el.container.scale.set(h/bgH));
            }
        }
    }
}
