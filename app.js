const  menuButton = document.getElementById("dropbtn");
const  menu = document.getElementById("menu");

menuButton.addEventListener("click", function() {
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
});   


// MUSIC //
document.addEventListener('DOMContentLoaded', () => {
  const tracks = document.querySelectorAll('.music .loader');
  let currentAudio = null;
  let currentTrack = null;

  tracks.forEach(track => {
    const coverUrl = track.dataset.cover;
    const coverEl = track.querySelector('.albumcover');
    if (coverUrl && coverEl) {
      coverEl.style.backgroundImage = `url('${coverUrl}')`;
      coverEl.style.backgroundSize = 'cover';
      coverEl.style.backgroundPosition = 'center';
    }

    track.addEventListener('click', () => {
      const src = track.dataset.src;
      if (!src) return;
      const playBtn = track.querySelector('.play');

      // Clicked the track that's already playing -> pause it
      if (currentTrack === track && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        playBtn.classList.remove('playing');
        return;
      }

      // Clicked the track that's already loaded but paused -> resume
      if (currentTrack === track && currentAudio && currentAudio.paused) {
        currentAudio.play();
        playBtn.classList.add('playing');
        return;
      }

      // Switching to a different track: stop the old one
      if (currentAudio) {
        currentAudio.pause();
        currentTrack.querySelector('.play').classList.remove('playing');
      }

      // Play the new track
      currentAudio = new Audio(src);
      currentTrack = track;
      currentAudio.play();
      playBtn.classList.add('playing');

      currentAudio.addEventListener('ended', () => {
        playBtn.classList.remove('playing');
      });
    });
  });
});