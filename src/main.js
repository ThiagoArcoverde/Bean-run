import kaboom from "kaboom"
import { gameSetup } from "./gameSetup"


const game = kaboom()
let setup = new gameSetup(game)

game.scene("game", () => {
	
	game.loadSprite("forest", "sprites/forest.jpg")
	const forest = game.add([
		sprite("forest"),
		pos(0, 0),
		scale(3),
	])

	game.loadSprite("bean", "sprites/bean.png")
	const bean = game.add([
		sprite("bean"),
		pos(550, 150),
		area(),
		body(),
	])
	bean.onCollide("tree", () => {
		game.addKaboom(bean.pos)
		game.shake()
		game.go("lose");
	})

	setup.onUpdate(game)

	game.add([
		rect(width(), 48),
		pos(0, height() - 48),
		outline(2),
		area(),
		body({ isStatic: true }),
		color(130, 220, 140),
	])

	game.loop(1.5, () => {
		wait(rand(1.5, 3.5), () => {
			spawnTree();
		});
	})

	function spawnTree() {
		game.add([
			rect(48, rand(24, 64)),
			area(),
			outline(4),
			pos(width(), height() - 48),
			anchor("botleft"),
			color(200, 150, 50),
			move(LEFT, 350),
			"tree"
		]);
	}

	game.setGravity(1200)

	game.onClick(() => game.addKaboom(game.mousePos()))

	game.onKeyPress("space", () => {
		if (bean.isGrounded()) {
			bean.jump();
		}
	})
})

	setup.onLose(game)

game.go("game")





