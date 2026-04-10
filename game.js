/* ===============================
DREAM OCEAN – ADVANCED GAME ENGINE
Pikachu + Gold Miner + Fish Shooter
================================ */

let canvas = document.getElementById("main-canvas")
let ctx = canvas.getContext("2d")

let gameType=""
let animationId=null

/* ========= GLOBAL STATE ========= */

let p_board=[],p_selected=null

let m_hook={},m_items=[],m_score=0

let s_bullets=[],s_fish=[],s_score=0

/* ========= GAME HUB ========= */

function openGame(type){

document.getElementById("game-overlay").style.display="flex"

gameType=type

document.getElementById("game-title").innerText=type.toUpperCase()

stopGame()

resetGame()

}

function closeGame(){

document.getElementById("game-overlay").style.display="none"

stopGame()

}

function stopGame(){

if(animationId){
cancelAnimationFrame(animationId)
animationId=null
}

}

/* ========= RESET ========= */

function resetGame(){

if(gameType==="pikachu") initPikachu()

if(gameType==="miner") initMiner()

if(gameType==="shooter") initShooter()

}

/* ===============================
PIKACHU GAME
================================ */

function initPikachu(){

canvas.width=400
canvas.height=300

const ROWS=6
const COLS=8
const TILE=50

let icons=["🐟","🐠","🦀","🐙","🐡","🐬","🦑","🦞"]

let pool=[]

for(let i=0;i<24;i++){

let icon=icons[i%8]

pool.push(icon,icon)

}

pool.sort(()=>Math.random()-0.5)

p_board=[]

for(let r=0;r<ROWS;r++){

p_board[r]=[]

for(let c=0;c<COLS;c++){

p_board[r][c]=pool.pop()

}

}

p_selected=null

drawPikachu()

}

function drawPikachu(){

ctx.clearRect(0,0,canvas.width,canvas.height)

p_board.forEach((row,r)=>row.forEach((val,c)=>{

if(!val) return

ctx.strokeStyle="#00f2ff"
ctx.strokeRect(c*50,r*50,50,50)

ctx.font="28px Arial"

ctx.fillStyle="white"

ctx.fillText(val,c*50+12,r*50+32)

if(p_selected && p_selected.r===r && p_selected.c===c){

ctx.strokeStyle="yellow"
ctx.strokeRect(c*50+2,r*50+2,46,46)

}

}))

}

/* ===============================
GOLD MINER
================================ */

function initMiner(){

canvas.width=500
canvas.height=400

m_score=0

m_hook={

x:250,
y:50,
angle:0,
len:40,
speed:0.03,
state:"swing"

}

m_items=[]

for(let i=0;i<8;i++){

m_items.push({

x:Math.random()*400+50,
y:Math.random()*200+150,
r:15+Math.random()*10,
value:10+Math.random()*20

})

}

updateMiner()

}

function updateMiner(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* swing */

if(m_hook.state==="swing"){

m_hook.angle+=m_hook.speed

if(Math.abs(m_hook.angle)>1.2) m_hook.speed*=-1

}

/* shoot */

else if(m_hook.state==="shoot"){

m_hook.len+=6

if(m_hook.len>420) m_hook.state="back"

m_items.forEach((it,i)=>{

let hx=250+Math.sin(m_hook.angle)*m_hook.len
let hy=50+Math.cos(m_hook.angle)*m_hook.len

if(Math.hypot(hx-it.x,hy-it.y)<it.r){

m_score+=it.value

m_items.splice(i,1)

m_hook.state="back"

}

})

}

/* back */

else{

m_hook.len-=4

if(m_hook.len<=40) m_hook.state="swing"

}

/* draw hook */

ctx.strokeStyle="white"
ctx.beginPath()
ctx.moveTo(250,50)
ctx.lineTo(
250+Math.sin(m_hook.angle)*m_hook.len,
50+Math.cos(m_hook.angle)*m_hook.len
)
ctx.stroke()

/* draw gold */

m_items.forEach(it=>{

ctx.fillStyle="gold"
ctx.beginPath()
ctx.arc(it.x,it.y,it.r,0,Math.PI*2)
ctx.fill()

})

/* score */

ctx.fillStyle="white"
ctx.fillText("Gold: "+Math.floor(m_score),10,20)

animationId=requestAnimationFrame(updateMiner)

}

/* ===============================
FISH SHOOTER
================================ */

function initShooter(){

canvas.width=500
canvas.height=400

s_score=0
s_bullets=[]
s_fish=[]

spawnFish()

updateShooter()

}

function spawnFish(){

for(let i=0;i<6;i++){

s_fish.push({

x:Math.random()*500,
y:Math.random()*200+40,
speed:1+Math.random()*2

})

}

}

function updateShooter(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* cannon */

ctx.fillStyle="white"
ctx.beginPath()
ctx.arc(250,370,15,0,Math.PI*2)
ctx.fill()

/* bullets */

s_bullets.forEach((b,i)=>{

b.y-=6

ctx.fillStyle="cyan"
ctx.beginPath()
ctx.arc(b.x,b.y,5,0,Math.PI*2)
ctx.fill()

if(b.y<0) s_bullets.splice(i,1)

})

/* fish */

s_fish.forEach((f,i)=>{

f.x+=f.speed

if(f.x>520) f.x=-20

ctx.fillStyle="orange"
ctx.beginPath()
ctx.arc(f.x,f.y,12,0,Math.PI*2)
ctx.fill()

/* collision */

s_bullets.forEach((b,bi)=>{

if(Math.hypot(b.x-f.x,b.y-f.y)<15){

s_score+=10

s_fish.splice(i,1)

s_bullets.splice(bi,1)

spawnFish()

}

})

})

ctx.fillStyle="white"
ctx.fillText("Score: "+s_score,10,20)

animationId=requestAnimationFrame(updateShooter)

}

/* ===============================
CANVAS CLICK HANDLER
================================ */

canvas.onclick=(e)=>{

let rect=canvas.getBoundingClientRect()

let x=e.clientX-rect.left
let y=e.clientY-rect.top

/* pikachu */

if(gameType==="pikachu"){

let c=Math.floor(x/50)
let r=Math.floor(y/50)

if(!p_board[r] || !p_board[r][c]) return

if(!p_selected){

p_selected={r,c}

}else{

if(
p_board[r][c]===p_board[p_selected.r][p_selected.c] &&
(r!==p_selected.r || c!==p_selected.c)
){

p_board[r][c]=null
p_board[p_selected.r][p_selected.c]=null

}

p_selected=null

}

drawPikachu()

}

/* miner */

else if(gameType==="miner"){

if(m_hook.state==="swing") m_hook.state="shoot"

}

/* shooter */

else if(gameType==="shooter"){

s_bullets.push({

x:x,
y:360

})

}

}
