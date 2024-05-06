export function closeClearModal() {
  document.getElementById('clear-mask').hidden = true;
  document.getElementById('clear-modal').hidden = true;
}

export function closeHowToModal() {
  document.getElementById('how-to-mask').hidden = true;
  document.getElementById('how-to-modal').hidden = true;
}

export function openHowToModal() {
  document.getElementById('how-to-mask').hidden = false;
  document.getElementById('how-to-modal').hidden = false;
}