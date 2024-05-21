import kaboom from "kaboom"

const k = kaboom()
let score = 0;

k.scene("game", () => {
	k.loadSprite("forest", "sprites/forest.jpg")
	const forest = k.add([
		sprite("forest"),
		pos(0, 0),
		scale(3),
	])

	k.loadSprite("bean", "sprites/bean.png")
	const bean = k.add([
		sprite("bean"),
		pos(550, 150),
		area(),
		body(),
	])
	bean.onCollide("tree", () => {
		k.addKaboom(bean.pos)
		k.shake()
		k.go("lose");
	})

	const scoreLabel = k.add([
		text(score),
		pos(24, 24)
	])
	k.onUpdate(() => {
		score++;
		scoreLabel.text = score;
	});

	k.add([
		rect(width(), 48),
		pos(0, height() - 48),
		outline(2),
		area(),
		body({ isStatic: true }),
		color(130, 220, 140),
	])

	k.loop(1.5, () => {
		wait(rand(1.5, 3.5), () => {
			spawnTree();
		});
	})

	function spawnTree() {
		k.add([
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

	k.setGravity(1200)

	k.onClick(() => k.addKaboom(k.mousePos()))

	k.onKeyPress("space", () => {
		if (bean.isGrounded()) {
			bean.jump();
		}
	})
})

k.scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		anchor("center"),
	]),
		add([
			text("Score: " + score),
			pos(center().sub(0, 50)),
			anchor("center"),
		])
	k.onKeyPress("space", () => go("game"));
	k.onClick(() => go("game"));

	score = 0
})

k.go("game")





