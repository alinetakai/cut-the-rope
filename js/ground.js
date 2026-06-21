class Ground {
    constructor(x, y, w, h) {
        const options = {
            isStatic: true
        };

        this.body = Bodies.rectangle(x, y, w, h, options);

        this.w = w;
        this.h = h;

        World.add(world, this.body);
    }

    display() {
        const pos = this.body.position;

        push();
        rectMode(CENTER);
        // Invisível (serve apenas para colisão)
        noStroke();
        fill(0, 0, 0, 0);
        rect(pos.x, pos.y, this.w, this.h);
        pop();
    }

}