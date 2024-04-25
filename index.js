class Personaje {
    constructor(name, health, damage, posX, canvas) {
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
        this.posX = posX;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    dibujar() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.posX, canvas.height-160, 80, 160);
    }
    actualizarPos(posX) {
        this.posX += posX;
    }
}

const canvas = document.getElementById("canva");

const jugador = new Personaje("Jugador", 100, 10, 120, canvas);
const enemigo = new Personaje("Jugador", 100, 10, 600, canvas);

document.addEventListener("keydown", event => {
    if(event.key == "a" && jugador.posX >= 10) {
        jugador.actualizarPos(-10);
    }
    if(event.key == "d" && jugador.posX <= canvas.width-90) {
        jugador.actualizarPos(10);
    }

});




document.addEventListener("keydown", event =>{
    if(event.key == "ArrowLeft" && enemigo.posX >= 10) {
        enemigo.actualizarPos(-10);
    }
    if(event.key == "ArrowRight" && enemigo.posX <= canvas.width-90) {
        enemigo.actualizarPos(10);
    }
})

function dibujar() {
    canvas.width = canvas.width;

    jugador.dibujar();
    enemigo.dibujar();
}

function update() {
    dibujar();
    window.requestAnimationFrame(update);
}

update();