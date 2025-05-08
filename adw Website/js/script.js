const videos = [
    '../videos/video1.mp4',
    '../videos/video2.mp4',
    '../videos/video3.mp4',
    '../videos/video4.mp4'
];

const videoElement = document.getElementById('bgVideo');

function playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    videoElement.src = videos[randomIndex];
    videoElement.load();
    videoElement.play();
}

videoElement.addEventListener('ended', playRandomVideo);

// Start with first random video
playRandomVideo();
