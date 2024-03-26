//DOM Elements

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressBar = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const previousButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

//music library

const musicLibrary = [
    {
        name: 'mixkit-a-very-happy-christmas-897',
        displayName: 'A Very Happy Christmas',
        artist: "Christmas"
    }, 
    {
        name: 'mixkit-hazy-after-hours-132',
        displayName: 'Hazy After Hours',
        artist: "EDM"
    },
    {
        name: 'mixkit-hip-hop-02-738',
        displayName: "Hip Hop 02",
        artist: "Beats"
    },
    {
        name: 'mixkit-tech-house-vibes-130',
        displayName: 'Tech House Vibes',
        artist: 'Techno'
    }
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

//play button control

playButton.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

//update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
    songIndex++;
    if (songIndex > musicLibrary.length-1) {
        songIndex = 0;
    }
    loadSong(musicLibrary[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = musicLibrary.length -1;
    }
    loadSong(musicLibrary[songIndex]);
    playSong();
}

loadSong(musicLibrary[0]);

//Updating progress bar and time
function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime} = event.srcElement;
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

previousButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
progressBar.addEventListener('click', setProgressBar);