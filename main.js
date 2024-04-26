const canvas = document.getElementById("canva");
ctx = canvas.getContext('2d')


class Personaje {
    constructor(name, health, damage, posX, sentido) {
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
        this.posX = posX;
        this.isAttacking = false;
        this.sentido = sentido;
        this.width = 80;
        
        this.velocity = 0;
        this.weapon = { dimentions : {maxLen: 200, minLen: 40, height: 40, len: 40},
        positions : {x : this.posX+40, y : canvas.height-110}};
        
    }

     attack(num) {
       

           switch(this.isAttacking){
            
            case true:
                if(this.weapon.dimentions.len >= this.weapon.dimentions.maxLen){
                    this.isAttacking = false;
    
                }else{
    
                    this.weapon.dimentions.len += num;
                }
    
                break;
            case false:
                if(this.weapon.dimentions.len > this.weapon.dimentions.minLen){
                    this.weapon.dimentions.len -= num;
                }
                break
           }
       
    


        
    }

    
                
    update() {
        
        this.attack(15)
        this.posX += this.velocity
        this.weapon.positions.x += this.velocity
        

        if (this.posX < 0){
            this.velocity = 0
            this.posX = 0
            this.weapon.positions.x = this.posX+40
        }
        
        if(this.posX > canvas.width-80){
            this.velocity = 0
            this.posX = canvas.width-80
            this.weapon.positions.x = this.posX
        }
        
        ctx.fillRect(this.posX, canvas.height-160, this.width, 160);
        ctx.fillStyle = 'blue';
        if(this.sentido === 1) ctx.fillRect(this.weapon.positions.x,this.weapon.positions.y,this.weapon.dimentions.len,this.weapon.dimentions.height)
        if(this.sentido === -1) ctx.fillRect(this.weapon.positions.x,this.weapon.positions.y,-this.weapon.dimentions.len,this.weapon.dimentions.height)


        
    }
    

}


const jugador = new Personaje("Jugador", 100, 120,100,1);
const enemigo = new Personaje("Jugador", 100, 600,230,-1);





document.addEventListener("keydown", event =>{
    if(event.key == "e") jugador.isAttacking = true
    
})

document.addEventListener("keyup", event =>{
    if(event.key == "e") jugador.isAttacking = false
    
})

document.addEventListener("keydown", event =>{
    if(event.key == "m") enemigo.isAttacking = true
    
})

document.addEventListener("keyup", event =>{
    if(event.key == "m") enemigo.isAttacking = false
    
})


document.addEventListener("keypress", event => {
    if (event.key == "a") jugador.velocity = -5
    if (event.key == "d") jugador.velocity = 5
});

document.addEventListener("keyup", event => {
    if (event.key == "a") jugador.velocity = 0
    if (event.key == "d") jugador.velocity = 0
});


document.addEventListener("keydown", event => {
   
        if (event.key == "ArrowLeft") enemigo.velocity = -5
        if (event.key == "ArrowRight") enemigo.velocity = 5
    
});

document.addEventListener("keyup", event => {
     
    if (event.key == "ArrowLeft") enemigo.velocity = 0
    if (event.key == "ArrowRight") enemigo.velocity = 0
    
});


function gestColision(){
    
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