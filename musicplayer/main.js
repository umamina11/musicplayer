//javascript


let now_playing = document.querySelector(".now-playing");				//track details
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");			//play-pause button
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");				//sliders
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');


let track_list = 
[													                  //   tracks song /image /details
		{
				name: "Humnava",
				artist: "Mantavya",
				image:"image2.jpg",
				path: "song1.mpeg"
		},
		{
				name: "Le jana",
				artist: "Mantavya",
				image: "image7.jpg",
				path: "song2.mpeg"
		},
		{
				name: "Euphoria",
				artist: "BTS",
				image: "image13.jpg",
				path: "song3.mp3",
		},
];

function random_bg_Color() 
{

 
  let red =   Math.floor(Math.random() * 256) + 64;							//color shades
  let green = Math.floor(Math.random() * 256) + 64;
  let blue =  Math.floor(Math.random() * 256) + 64;

 
  let bgcolor = "rgb(" + red + "," + green + "," + blue + ")";


  document.body.style.background = bgColor;
}

function loadTrack(track_index) 											//track-details
{
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() 
{
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}


loadTrack(track_index);													//loading tracks

function playpauseTrack() 												//pause/play
{																		
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() 													//play
{
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() 													//pause
{
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() 													//next track
{
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() 													//previous track
{
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() 														//slider /time 
{
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() 													//slider/volume
{
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() 
{
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) 
  {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
