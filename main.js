const $botones = document.querySelectorAll('.boton');
let $botonesBot = [];
let $botonesJugador;
let aciertos;
let ronda = 0;

function resetearPartida(){
    $botonesBot = []
    $botonesJugador = []
    aciertos = 0
    ronda = 0
}

function llamarJugador(){
    desbloquearTurno()
    document.querySelector('#texto-turno').textContent = 'Es tu turno!' 
}

function bloquearTurno(){
    $botones.forEach(function(boton){
        boton.disabled = true
    })
}

function desbloquearTurno(){
    $botones.forEach(function(boton){
        boton.disabled = false
    })
}

function empezarRondaBot(){
    ronda++
    document.querySelector('.circulo').textContent = ronda
    document.querySelector('#texto-turno').classList.remove('oculto')
    document.querySelector('#texto-turno').textContent = 'Turno de la computadora'
    bloquearTurno()
    $botonesJugador = []
    $botonesBot.push($botones[Math.floor(Math.random()* 4)])
    $botonesBot.forEach(function(boton, index){
        setTimeout(function(){
            resaltarColor(boton)
        }, (index + 1) * 1000)
    })
    setTimeout(function(){
        llamarJugador()
    }, (1000*ronda)+300)
}


function empezarRondaJugador(e){
    aciertos = 0
    resaltarColor(e.target)   
    $botonesJugador.push(e.target)
    for (let i=0; i < $botonesJugador.length; i++){
        if (!($botonesBot[i] === $botonesJugador[i])){
            document.querySelector('#perder-audio').play()
            document.querySelector('#titulo').textContent = 'Game over...'
            document.querySelector('.boton-jugar').classList.remove('oculto')
            document.querySelector('#texto-turno').classList.add('oculto')
            bloquearTurno()
            return 
        }else{
            aciertos++
        }    
    } 
   if (aciertos === $botonesBot.length){
        empezarRondaBot()
   } 
}


function resaltarColor(boton){
    const botonHighlight = boton.dataset.id 
    boton.classList.add(`${botonHighlight}-highlight`)
    setTimeout(function(){
        boton.classList.remove(`${botonHighlight}-highlight`)
    }, 300)
}



$botones.forEach(function(boton){
    boton.onclick = empezarRondaJugador
})

document.querySelector('.boton-jugar').onclick = function(){
    document.querySelector('#jugar-audio').play()
    resetearPartida()
    document.querySelector('#texto-turno').classList.remove('oculto')
    document.querySelector('#titulo').textContent = 'Simon Dice'
    document.querySelector('.boton-jugar').classList.add('oculto')
    empezarRondaBot()
}
  



