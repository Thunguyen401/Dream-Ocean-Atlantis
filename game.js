const canvas=document.getElementById("game")
const ctx=canvas.getContext("2d")

let score=0
let best=localStorage.getItem("best")||0
let time=30

let target={x:100,y:100}

function resize(){

canvas.width=canvas.offsetWidth
canvas.height=canvas.offsetHeight

}

resize()

window.addEventListener("resize",resize)

function move(){

target.x=Math.random()*canvas.width
target.y=Math.random()*canvas.height

}

canvas.addEventListener("mousemove",e=>{

if(time<=0)return

const r=canvas.getBoundingClientRect()

let mx=e.clientX-r.left
let my=e.clientY-r.top

if(Math.hypot(mx-target.x,my-target.y)<20){

score++

if(score>best){

best=score
localStorage.setItem("best",best)

}

move()

}

})

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.shadowBlur=15
ctx.shadowColor="#00e5ff"

ctx.fillStyle="white"

ctx.beginPath()
ctx.arc(target.x,target.y,10,0,Math.PI*2)
ctx.fill()

requestAnimationFrame(draw)

}

draw()

function update(){

if(time>0){

time--

document.getElementById("scoreBoard").innerText=
`Score: ${score} | Best: ${best} | Time: ${time}`

}

}

setInterval(update,1000)

function restartGame(){

score=0
time=30

}
