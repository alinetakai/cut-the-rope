class Rope {
    constructor(nlink, pointA) {
        const group = Matter.Body.nextGroup(true);

        const rects = Matter.Composites.stack(
            pointA.x,
            pointA.y,
            nlink,
            1,
            5,
            5,
            function(x, y) {
                return Matter.Bodies.rectangle(
                    x,
                    y,
                    40,
                    5,
                    {
                        collisionFilter: {group: group},
                        frictionAir: 0.05
                    }
                );

            }
        );

        this.body = Matter.Composites.chain(
            rects,
            0.5,
            0,
            -0.5,
            0,
            {
                stiffness: 0.9,
                length: 0
            }
        );

        Matter.World.add(world, this.body);

        Matter.Composite.add(
            this.body,
            Matter.Constraint.create({
                pointA: pointA,
                bodyB: rects.bodies[0],
                pointB: {x: 0, y: 0},
                stiffness: 1,
                //length: 0
                damping: 0.2
            })
        );
    }

    break() {
        if(this.body.bodies.length > 0){
            Matter.Composite.remove(
                this.body,
                this.body.bodies[this.body.bodies.length - 1]
            );
        }
    }

    display() {
        stroke("#8B5A2B");
        strokeWeight(4);

        for(let i = 0; i < this.body.bodies.length - 1; i++){

            let bodyA = this.body.bodies[i];
            let bodyB = this.body.bodies[i + 1];

            line(
                bodyA.position.x,
                bodyA.position.y,
                bodyB.position.x,
                bodyB.position.y
            );
        }

        noStroke();
    }
}