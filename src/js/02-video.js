import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

const savedTime = Number(localStorage.getItem('videoplayer-current-time'));

if (savedTime) {
  player.setCurrentTime(savedTime);
  console.log(`time ${savedTime} has been set`);
} else {
  console.log('there is no saved time');
}

player.setVolume(0.4);

player.on('timeupdate', throttle(OnTimeUpdate, 1000, { trailing: false }));

function OnTimeUpdate(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);

  const savedTime = localStorage.getItem('videoplayer-current-time');
  console.log('saved time:', savedTime);
}
