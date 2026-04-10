const music=document.getElementById("bgMusic")
const selector=document.getElementById("musicSelect")

function playMusic(){

music.src=selector.value
music.play()

localStorage.setItem("music",selector.value)

}

function pauseMusic(){

music.pause()

}

if(localStorage.getItem("music")){

music.src=localStorage.getItem("music")

}
