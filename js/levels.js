let pins = [];

function loadLevel1() {
    // pino parede
    pins = [];

    // corda
    rope = new Rope(5, { x: width / 2, y: 60 });

    pins.push({x: width / 2, y: 60, size: 40});

    // chão
    ground = new Ground(width / 2, height + 500, width, 20);

    // doce
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

    // estrelas
    stars = [];
    stars.push({x: width / 2, y: 360, collected: false});
    stars.push({x: width / 2, y: 460, collected: false});
    stars.push({x: width / 2, y: 560, collected: false});
}