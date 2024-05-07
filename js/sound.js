export const moveSound = new Howl({
  src: ['assets/sounds/move.mp3'],
  volume: 0.6,
});

export const changeStageSound = new Howl({
  src: ['assets/sounds/change-stage.mp3'],
  volume: 0.3,
});

export const systemSound = new Howl({
  src: ['assets/sounds/system.mp3'],
  volume: 0.1,
});

export const clearSound = new Howl({
  src: ['assets/sounds/clear.mp3'],
  volume: 0.25,
});

export function soundOn() {
  moveSound.mute(false);
  changeStageSound.mute(false);
  systemSound.mute(false);
  systemSound.mute(false);
  document.getElementById('sound-off-btn').hidden = false;
  document.getElementById('sound-on-btn').hidden = true;
}

export function soundOff() {
  moveSound.mute(true);
  changeStageSound.mute(true);
  systemSound.mute(true);
  systemSound.mute(true);
  document.getElementById('sound-off-btn').hidden = true;
  document.getElementById('sound-on-btn').hidden = false;
}