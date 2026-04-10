let gold=localStorage.getItem("gold")||0

document.getElementById("gold").innerText=gold

function addGold(n){

gold=parseInt(gold)+n

localStorage.setItem("gold",gold)

document.getElementById("gold").innerText=gold

}

function addMemory(){

let text=prompt("Bạn muốn lưu ký ức gì?")

if(text){

document.getElementById("memory").innerText=text

}

}

function toggleMusic(){

let music=document.getElementById("bgMusic")

let selector=document.getElementById("musicSelect")

if(music.paused){

music.src=selector.value
music.play()

}else{

music.pause()

}

}

/* GAME NGỌC TRAI */

const canvas=document.getElementById("pearl-game")

const ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=110

let target={x:100,y:50}

let score=0

canvas.addEventListener("mousemove",e=>{

let r=canvas.getBoundingClientRect()

let mx=e.clientX-r.left
let my=e.clientY-r.top

if(Math.hypot(mx-target.x,my-target.y)<20){

score++

document.getElementById("score").innerText=score

addGold(1)

target.x=Math.random()*canvas.width
target.y=Math.random()*canvas.height

}

})

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.beginPath()

ctx.arc(target.x,target.y,8,0,Math.PI*2)

ctx.fillStyle="white"

ctx.fill()

requestAnimationFrame(draw)

}

draw()

function discover(name){

alert("Bạn khám phá "+name)

addGold(10)

}
