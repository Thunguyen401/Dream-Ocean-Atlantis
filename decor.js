function decor(){

for(let i=0;i<6;i++){

let f=document.createElement("div")
f.className="fish"
f.innerText="🐟"

f.style.top=Math.random()*90+"vh"
f.style.animationDuration=15+Math.random()*10+"s"

document.body.appendChild(f)

}

for(let i=0;i<20;i++){

let b=document.createElement("div")
b.className="bubble"
b.innerText="🫧"

b.style.left=Math.random()*100+"vw"
b.style.animationDuration=5+Math.random()*8+"s"

document.body.appendChild(b)

}

}

decor()
