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