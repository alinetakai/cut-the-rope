const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

let engine;
let world;

let backgroundImg;

// OM NOM
let omNomFrames = [];
let currentFrame = 0;
let frameDelay = 15;

let omNom = {x: 505, y: 670,size: 160};

let supportImg;

let rope;
let pinImg;
let candy;
let candyImg;
let candyCon;

let ground;

let gameState = "playing";

function preload() {
    backgroundImg = loadImage("assets/bg-box.jpeg");
    supportImg = loadImage("assets/support1.png");
    candyImg = loadImage("assets/candy.png");

    // Frames da animação
    omNomFrames.push(loadImage("assets/om-nom1.png"));
    omNomFrames.push(loadImage("assets/om-nom2.png"));
    omNomFrames.push(loadImage("assets/om-nom2.png"));
    omNomFrames.push(loadImage("assets/om-nom1.png"));
    omNomFrames.push(loadImage("assets/om-nom3.png"));
    omNomFrames.push(loadImage("assets/om-nom4.png"));
    omNomFrames.push(loadImage("assets/om-nom4.png"));
    omNomFrames.push(loadImage("assets/om-nom5.png"));
    omNomFrames.push(loadImage("assets/om-nom4.png"));
    omNomFrames.push(loadImage("assets/om-nom5.png"));
    omNomFrames.push(loadImage("assets/om-nom6.png"));

    pinImg = loadImage("assets/pino-parede.png");
}

function setup() {
    createCanvas(1027, 768);

    engine = Engine.create();

    engine.positionIterations = 12;
    engine.velocityIterations = 10;
    engine.constraintIterations = 8;

    world = engine.world;
    
    loadLevel1();
}

function draw() {
    background(0);

    imageMode(CORNER);
    image(backgroundImg, 0, 0, width, height);

    Engine.update(engine);

    drawPins();

    if (ground) {
        ground.display();
    }

    if (rope) {
        rope.display();
    }

    imageMode(CENTER);

    image(supportImg, 505, 720, 160, 160);

    drawOmNom();

    if (candy) {
        image(candyImg, candy.position.x, candy.position.y, 60, 60);
    }

    checkWin();
    checkLose();

    drawGameState();

    if(
        candyCon &&
        candyCon.link &&
        candyCon.link.bodyA &&
        candy
    ){
        stroke(255);

        line(
            candyCon.link.bodyA.position.x,
            candyCon.link.bodyA.position.y,
            candy.position.x,
            candy.position.y
        );
    }
}

function drawOmNom() {

    if (frameCount % frameDelay === 0) {
        currentFrame++;

        if (currentFrame >= omNomFrames.length) {
            currentFrame = 0;
        }
    }

    image(omNomFrames[currentFrame], omNom.x, omNom.y, omNom.size, omNom.size);
}

function drawPins(){
    for(let pin of pins){
        image(pinImg, pin.x, pin.y, pin.size, pin.size);
    }
}

function checkWin() {
    if (!candy) return;

    let d = dist(candy.position.x, candy.position.y, omNom.x, omNom.y);

    if (d < 80) {
        gameState = "win";
        World.remove(world, candy);
        candy = null;
    }
}

function checkLose() {
    if (!candy) return;

    if (candy.position.y > height + 150 || candy.position.x < -100 || candy.position.x > width + 100) {
        console.log("PERDEU!");

        gameState = "lose";
        World.remove(world, candy);
        candy = null;
    }
}

function drawGameState() {
    textAlign(CENTER);
    textSize(40);
    fill(255);

    if (gameState === "win") {
        text("VOCÊ GANHOU!", width / 2, 250);
    }

    if (gameState === "lose") {
        text("VOCÊ PERDEU!", width / 2, 250);
    }
}

function mouseDragged() {
    if (!rope) return;

    for (let body of rope.body.bodies) {
        let d = dist(mouseX, mouseY, body.position.x, body.position.y);

        if (d < 20) {
            rope.break();

            if (candyCon) {
                candyCon.detach();
                candyCon = null;
            }

            World.remove(world, rope);

            break;
        }
    }
}