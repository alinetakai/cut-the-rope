let pins = [];

function loadLevel1() {
    pins = [];

    rope = new Rope(5, { x: width / 2, y: 60 });

    pins.push({
        x: width / 2 - 20,
        y: 52,
        size: 40
    });

    ground = new Ground(width / 2, height + 500, width, 20);

    candy = Bodies.circle(
        width / 2,
        320,
        25,
        {
            density: 0.0002,
            restitution: 1,
            friction: 0.2,
            frictionAir: 0.01
        }
    );

    World.add(world, candy);

    candyCon = new Link(rope, candy);
}