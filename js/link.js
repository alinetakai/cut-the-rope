class Link {
    constructor(rope, body) {
        const lastLink = rope.body.bodies.length - 1;

        this.link = Matter.Constraint.create({
            bodyA: rope.body.bodies[lastLink],
            bodyB: body,
            pointA: {x: 0, y: 0},
            pointB: {x: 0, y: 0},
            length: 0,
            stiffness: 1
        });

        Matter.World.add(world, this.link);
    }

    detach() {
        Matter.World.remove(world, this.link);
    }
}