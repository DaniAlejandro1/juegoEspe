class Personaje {
    constructor(name, health, damage) {
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
    }
    estaVivo() {
        return this.health > 0;
    }
    mover() {

    }
}

const jugador1 = new Personaje("Jugador", 100, 10, 120);
const jugador2 = new Personaje("Jugador", 100, 10, 800);

let jugadorX = 0;

const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
        jugadorX -=10
    }
    if (event.key === "d") {
        jugadorX +=10
    }
});

function dibujar(posX) {
    ctx.beginPath();
    ctx.rect(posX, 560, 80, 160);
    ctx.stroke();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujar(jugadorX);
}

setInterval(function() {
    update();
}, 16);