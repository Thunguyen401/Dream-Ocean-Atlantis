const container=document.getElementById("memoryContainer")

let memories=JSON.parse(localStorage.getItem("memories"))||[]

function renderMemories(){

container.innerHTML=""

memories.forEach(m=>{

let div=document.createElement("div")

div.className="memory-pearl"

div.innerHTML=`<div class="m-date">${m.date}</div><div>${m.text}</div>`

container.appendChild(div)

})

}

function addMemory(){

let text=prompt("Bạn muốn lưu kỷ niệm gì?")

if(!text)return

let m={

date:new Date().toLocaleDateString(),

text:text

}

memories.push(m)

localStorage.setItem("memories",JSON.stringify(memories))

renderMemories()

}

renderMemories()
