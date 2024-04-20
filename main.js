class Personaje {
    
    
}

const canvas = document.getElementById("canva")

const ctx = canvas.getContext("2d")


const pieza = {
    position: {x: 0, y: canvas.height-160},
    dimentions:{w: 80, h: 160}
}

const jugador1 = new Personaje("Jugador", 100, 10, 120)

let jugadorX = 10;



document.addEventListener("keydown", event =>{
    if(event.key == "a"){
        pieza.position.x-=10
        if(pieza.position.x < 0) pieza.position.x+=10
        console.log("izquierda")
    }
    if(event.key == "d"){
        pieza.position.x+=10 
        if(pieza.position.x > canvas.width-pieza.dimentions.w) pieza.position.x-=10
        console.log("derecha")
    }
})


function update(){
    
    draw()
    window.requestAnimationFrame(update)
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#000'
    ctx.fillRect(pieza.position.x, pieza.position.y, pieza.dimentions.w, pieza.dimentions.h);
    
}


update()
