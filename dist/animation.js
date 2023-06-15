"use strict";
const canvas = document.querySelector("#paper");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const animations = {
    walk: {
        totalFrames: 10,
        action: "Walk",
        loop: true,
    },
    die: {
        totalFrames: 12,
        action: "Dead",
        loop: false,
    },
    attack: {
        totalFrames: 8,
        action: "Attack",
        loop: true,
    },
    idle: {
        totalFrames: 15,
        action: "Idle",
        loop: true,
    },
};
let isGenderMale = true;
let activeAnimation = animations.walk;
const changeAction = (action) => {
    activeAnimation = animations[action];
    // Needs to be done or the animation will continue using the last frameIndex value [Big Brain]
    frameIndex = 1;
};
const changeGender = () => {
    isGenderMale = !isGenderMale;
};
const genderButton = document.getElementById("gender-btn");
const idleButton = document.getElementById("idle-btn");
const walkButton = document.getElementById("walk-btn");
const dieButton = document.getElementById("die-btn");
const attackButton = document.getElementById("attack-btn");
genderButton.addEventListener("click", () => changeGender());
idleButton.addEventListener("click", (event) => changeAction(event.target.name));
walkButton.addEventListener("click", (event) => changeAction(event.target.name));
dieButton.addEventListener("click", (event) => changeAction(event.target.name));
attackButton.addEventListener("click", (event) => changeAction(event.target.name));
let frameIndex = 1;
const frameDelay = 150;
const draw = () => {
    const zombieImg = new Image();
    zombieImg.src = `./${isGenderMale ? "male" : "female"}/${activeAnimation.action} (${frameIndex}).png`;
    let spriteWidth = isGenderMale ? 300 : 320;
    let spriteHeight = isGenderMale ? 300 : 320;
    spriteHeight += activeAnimation.action === "Dead" ? 40 : 0;
    spriteWidth += activeAnimation.action === "Dead" ? 120 : 0;
    zombieImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(zombieImg, canvas.width / 2 - (isGenderMale ? 0 : 50), canvas.height / 2 - (isGenderMale ? 0 : 20), spriteWidth, spriteHeight);
        frameIndex = (frameIndex % activeAnimation.totalFrames) + 1;
        setTimeout(draw, frameDelay);
    };
};
draw();
