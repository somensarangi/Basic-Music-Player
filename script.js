console.log('Welcome to Spotify');

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.querySelector('.songItemContainer');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
	{ songName: 'Hulara - J Star', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
	{ songName: 'Top Notch Gabru', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
	{
		songName: 'Khushi Jab bhi teri - Jubin Nautiyal',
		filePath: 'songs/3.mp3',
		coverPath: 'covers/3.jpg',
	},
	{
		songName: 'Dil Galti Kar Baitha Hai - Jubin Nautiyal',
		filePath: 'songs/4.mp3',
		coverPath: 'covers/4.jpg',
	},
	{ songName: 'Raataan Lambiyan', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
	{ songName: 'Insane - A.P Dhillon', filePath: 'songs/2.mp3', coverPath: 'covers/6.jpg' },
	{
		songName: 'Dua Lipa - Levitating Featuring',
		filePath: 'songs/2.mp3',
		coverPath: 'covers/7.jpg',
	},
	{ songName: 'Is Qadar', filePath: 'songs/2.mp3', coverPath: 'covers/8.jpg' },
	{ songName: 'Rim Jhim - Jubin Nautiyal', filePath: 'songs/2.mp3', coverPath: 'covers/9.jpg' },
	{
		songName: 'Naach Meri Rani - Guru Randhawa',
		filePath: 'songs/4.mp3',
		coverPath: 'covers/10.jpg',
	},
];
console.log(songItemContainer);
songs.forEach((element, index) => {
	const outerdiv = document.createElement('div');
	outerdiv.className = 'songItem';
	// const coverPath = document.createElement('img');
	// coverPath.src = element.coverPath;
	// const songName = document.createElement('span');
	// songName.className = 'songName';
	// songName.innerHTML = element.songName;
	// const songlistplay = document.createElement('span');
	// songlistplay.className = 'songlistplay';
	// const timestamp = document.createElement('span');
	// timestamp.className = 'timestamp';
	// timestamp.innerHTML = element.timestamp;
	// const playbtn = document.createElement('i');
	// playbtn.id = index;
	// playbtn.className = 'far songItemPlay fa-play-circle';

	// timestamp.appendChild(playbtn);
	// songlistplay.appendChild(timestamp);
	// outerdiv.appendChild(coverPath);
	// outerdiv.appendChild(songName);
	// outerdiv.appendChild(songlistplay);
	outerdiv.innerHTML = `
		<img alt='' src = '${element.coverPath}' />
		<span class='songName'>${element.songName}</span>
		<span class='songlistplay'>
			<span class='timestamp'>
				${element.timestamp}</span><i id='${index}' class='far songItemPlay fa-play-circle'></i>
			</span>
		</span>
	    `;

	songItemContainer.appendChild(outerdiv);
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		masterPlay.classList.remove('fa-play-circle');
		masterPlay.classList.add('fa-pause-circle');
		gif.style.opacity = 1;
	} else {
		audioElement.pause();
		masterPlay.classList.remove('fa-pause-circle');
		masterPlay.classList.add('fa-play-circle');
		gif.style.opacity = 0;
	}
});
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
	// Update Seekbar
	progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
	myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
	audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
	Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
		element.classList.remove('fa-pause-circle');
		element.classList.add('fa-play-circle');
	});
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
	element.addEventListener('click', (e) => {
		makeAllPlays();
		songIndex = parseInt(e.target.id);
		e.target.classList.remove('fa-play-circle');
		e.target.classList.add('fa-pause-circle');
		audioElement.src = `songs/${songIndex + 1}.mp3`;
		masterSongName.innerText = songs[songIndex].songName;
		audioElement.currentTime = 0;
		audioElement.play();
		gif.style.opacity = 1;
		masterPlay.classList.remove('fa-play-circle');
		masterPlay.classList.add('fa-pause-circle');
	});
});

document.getElementById('next').addEventListener('click', () => {
	if (songIndex >= 9) {
		songIndex = 0;
	} else {
		songIndex += 1;
	}
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove('fa-play-circle');
	masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
	if (songIndex <= 0) {
		songIndex = 0;
	} else {
		songIndex -= 1;
	}
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove('fa-play-circle');
	masterPlay.classList.add('fa-pause-circle');
});
