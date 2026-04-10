const audio = new Audio();
const playlist = {
  "deep": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "dream": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
};

function playMusic() {
  const select = document.getElementById("musicSelect");
  audio.src = playlist[select.value];
  audio.play();
}

function pauseMusic() {
  audio.pause();
}