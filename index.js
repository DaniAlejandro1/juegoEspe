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

    attack(target) {
        
    }
    
    get_vida() {
        return this.health;
    }
}


document.addEventListener("keydown", function(event) {
    if (event.key === "a") {

    }
    if (event.key === "d") {
        
    }
});

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();