import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
const player = new Player(iframeEl);

window.addEventListener('DOMContentLoaded', onLoad);

player.setVolume(0.4);
player.on('timeupdate', throttle(OnTimeUpdate, 1000, { trailing: false }));

function OnTimeUpdate(e) {
  localStorage.setItem(LOCAL_STORAGE_KEY, e.seconds);
  // loging update
  console.log('saved time:', e.seconds);
}

function onLoad() {
  const savedTime = getSavedTime(LOCAL_STORAGE_KEY);
  if (!savedTime) return console.log('there is no saved time');

  player.setCurrentTime(savedTime);
  console.log(`time ${savedTime} has been set`);
}

function getSavedTime(storageKey) {
  return Number(localStorage.getItem(storageKey));
}
