export class gameSetup {

    constructor(game) {
        this.score = 0;
        this.scoreLabel = game.add([
            text(this.score),
            pos(24, 24)
        ])
    }

    onUpdate(game) {
        game.onUpdate(() => {
                this.score++;
                this.scoreLabel.text = this.score;
        });

    }

    onLose(game){
        game.scene("lose", () => {
            add([
                text("Game Over"),
                pos(center()),
                anchor("center"),
            ]),
                add([
                    text("Score: " + this.score),
                    pos(center().sub(0, 50)),
                    anchor("center"),
                ])
            game.onKeyPress("space", () => go("game"));
            game.onClick(() => go("game"));

            this.score = 0
        })
    }

}