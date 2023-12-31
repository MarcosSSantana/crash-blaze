import * as PIXI from "pixi.js";
import { Main } from "./Main";
import Character from "./Character";
export default class SceneOne extends PIXI.Container {
    private app: Main;
    public container: PIXI.Container;
    public Background: PIXI.Sprite = PIXI.Sprite.from("background");
    public Ball: PIXI.Sprite = PIXI.Sprite.from("ball");
    public animating = false;
    public curva = 12;

    public Character;
    constructor(app: Main) {
        super();
        this.app = app;

        this.container = new PIXI.Container();
        this.addChild(this.container);

        this.Background.scale.set(0.48);
        this.Background.y = -870;
        this.container.addChild(this.Background);

        this.Character = new Character(this.app);
        this.container.addChild(this.Character);

        this.Ball.anchor.set(0.5);
        this.Ball.position.set(240, 430);
        this.container.addChild(this.Ball);

        this.app.ticker.add(this.update.bind(this));

    }

    update(delta: number) {
        // console.log(delta);
        if (this.animating) {
            this.Ball.x += 15 * delta; // Controla a velocidade da animação
            if (this.Ball.x > this.app.screen.width + 100) {
                this.animating = false;
                console.log('troca de cena');
                this.app.event.emit("endSceneOne");
            }

            const decrementAmount = this.curva * delta; // Ajuste esse valor para controlar a velocidade da desaceleração
            this.Ball.y -= decrementAmount;
            this.curva = this.curva - 0.3;

            this.Ball.rotation += 0.08 * delta;

        }
    }

    animBall() {
        if (this.Ball.x == 240) {
            this.app.game.setText();
            if (!this.animating) {
                this.animating = true;
            }
        }
    }

    play() {
        this.Character.play();
        setTimeout(() => {
            this.animBall();
        }, 1050);
    }

}