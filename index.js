const canvas = document.getElementById("canva");
ctx = canvas.getContext('2d')
TIEMPO_ESPERA = 700

class Personaje {
    constructor(name, health, damage, posX,sentido) {
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
        this.posX = posX;
        this.isAttacking = false;
        this.sentido = sentido
        
        this.velocity = 0;
        this.weapon = { dimentions : {maxLen: 200, minLen: 40, height: 40, len: 40},
        positions : {x : this.posX + 40, y : canvas.height-110}};
        
    }
    async attack(num) {
       switch(this.isAttacking){
        case true:
            if (this.weapon.dimentions.len >= this.weapon.dimentions.maxLen) {
                this.isAttacking = false;
            } else {
 
                this.weapon.dimentions.len += num;
            }
            break;
        case false:
            if (this.weapon.dimentions.len > this.weapon.dimentions.minLen) {
                this.weapon.dimentions.len -= num;
            }
            break;
       }       
    }
    update() {
        
        this.attack(15)
       
    }
}

const jugador = new Personaje("Jugador", 100, 1,100,1);
let ultimoDisparoPersonaje = Date.now();
const enemigo = new Personaje("Enemigo", 100, 1,1000,-1);
let ultimoDisparoEnemigo = Date.now();


//Ataque del jugador
document.addEventListener("keydown", event => {
    const tiempoActual = Date.now() 
    if(event.key == "e") if(tiempoActual - ultimoDisparoPersonaje > TIEMPO_ESPERA){

        jugador.isAttacking = true;
        ultimoDisparoPersonaje = Date.now();
    }
})

document.addEventListener("keyup", event => {
    if(event.key == "e") jugador.isAttacking = false   
})


//Ataque del enemigo
document.addEventListener("keydown", event => {
    const tiempoActual = Date.now()
    if(event.key == "m") if(tiempoActual-ultimoDisparoEnemigo > TIEMPO_ESPERA){
        enemigo.isAttacking = true    
        ultimoDisparoEnemigo = Date.now()
    }
})

document.addEventListener("keyup", event => {
    if(event.key == "m") enemigo.isAttacking = false  
})


//Movimiento del jugador
document.addEventListener("keypress", event => {
    if (event.key == "a") jugador.velocity = -5
    if (event.key == "d") jugador.velocity = 5
});


document.addEventListener("keyup", event => {
    if (event.key == "a") jugador.velocity = 0
    if (event.key == "d") jugador.velocity = 0
});

//Movimiento del enemigo
document.addEventListener("keydown", event => {   
    if (event.key == "ArrowLeft") enemigo.velocity = -5
    if (event.key == "ArrowRight") enemigo.velocity = 5
});

document.addEventListener("keyup", event => {
    if (event.key == "ArrowLeft") enemigo.velocity = 0
    if (event.key == "ArrowRight") enemigo.velocity = 0
});

function comprobarColision(atacante, objetivo) {
    const posicionArma = atacante.weapon.positions.x;
    const anchoArma = posicionArma + atacante.weapon.dimentions.len;
    const objetivoPosicion = objetivo.posX;
    const anchoObjetivo = objetivoPosicion + 80;
    return anchoArma >= objetivoPosicion && posicionArma <= anchoObjetivo;
}

function moverJugador(character,s,color){
    character.posX += character.velocity
    character.weapon.positions.x += character.velocity
    
    
    if (character.posX < 0){
        character.velocity = 0
        character.posX = 0
        character.weapon.positions.x = character.posX + 40
    }
    
    if(character.posX > canvas.width-80){
        character.velocity = 0
        character.posX = canvas.width-80
        character.weapon.positions.x = character.posX + 40
    }
    
    ctx.fillStyle = color
    ctx.fillRect(character.posX, canvas.height-160, 80, 160);
    ctx.fillStyle = 'red';

    ctx.fillRect(character.weapon.positions.x,character.weapon.positions.y,(s)*(character.weapon.dimentions.len),character.weapon.dimentions.height);
}

function dibujar() {
    canvas.width = canvas.width;
    ctx.fillStyle = 'black';
    jugador.update();
    ctx.fillStyle = 'red';
    enemigo.update();
}

function update() {
    dibujar();
    moverJugador(jugador,1,"blue")
    moverJugador(enemigo,-1,"black")
    let posicionArmaEnemiga = enemigo.posX-enemigo.weapon.dimentions.len;
    let posicionArmaJugador = jugador.weapon.positions.x + jugador.weapon.dimentions.len
    if(posicionArmaEnemiga < jugador.posX+20) {
        console.log("enemigo ataca a jugador")
        jugador.health -= enemigo.damage;
        document.querySelector('#jugadorVida').style.width = jugador.health + '%';
    }
    if(posicionArmaJugador > enemigo.posX){
        console.log("Jugador ataca a enemigo")
        enemigo.health -= jugador.damage;
        document.querySelector('#enemigoVida').style.width = enemigo.health + '%';
    }
    
    window.requestAnimationFrame(update);
}

update();