// Reference
const container = document.querySelector(".container");
const playMusic = document.querySelector("#play-btn");
const pauseMusic = document.querySelector("#pause-btn");
const nextMusic = document.getElementById("next-btn");
const prevMusic = document.getElementById("prev-btn");
const audio = document.querySelector("#audio");
const musicImg = document.querySelector(".music-img");
const title = document.querySelector("#title");
const progressContainer = document.querySelector(".progress-container");
const progress = document.getElementById("progress");
const musicList = ['hey','summer','ukulele'];
let songIndex = 2;


const loadSong = function (songIndex) {
    title.textContent = musicList[songIndex]
    audio.src = `music/${musicList[songIndex]}.mp3`;
    musicImg.src = `images/${musicList[songIndex]}.jpg`
}
loadSong(songIndex)

// play song 
const musicPlayer = function() {
    container.classList.add("play")
    playMusic.classList.add("hide")
    pauseMusic.classList.remove("hide")
    audio.play()
}
musicPlayer()

// pause song
const musicPause = function() {
    container.classList.remove("play")
    pauseMusic.classList.add("hide")
    playMusic.classList.remove("hide")
    audio.pause()
}
musicPause()

// next song
const nextSongFun = function() {
    songIndex++;
    if (songIndex > musicList.length - 1)
        songIndex = 0;

    loadSong(songIndex)
    musicPlayer()
}

// prev song
const prevSongFun = function() {
    songIndex--;
    if (songIndex < 0) 
        songIndex = musicList.length - 1;
    

    loadSong(songIndex)
    musicPlayer()
}

// update progress 
const updateProgressBar = function(e) {
    const {duration , currentTime} = e.srcElement;
    const  progresPercent =( currentTime / duration ) * 100;
    progress.style.width = `${progresPercent}px`
}

// set progress
const setProgress = function (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration
}

// Events handlers
playMusic.addEventListener("click",musicPlayer)
pauseMusic.addEventListener("click",musicPause)
audio.addEventListener('timeupdate',updateProgressBar)
prevMusic.addEventListener('click', prevSongFun)
nextMusic.addEventListener('click',nextSongFun)
progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSongFun)