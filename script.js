CY.loader()
  .licenseKey("4efce2041fb8db76165ffb122b3515a0cb60e8740dfd")
  .addModule(CY.modules().FACE_AGE.name)
  .addModule(CY.modules().FACE_GENDER.name)
  .addModule(CY.modules().FACE_EMOTION.name)
  .load()
  .then(({ start, stop }) => start());

const age_div = document.querySelector("#age");
const gen_div = document.querySelector("#gender");
const emo_div = document.querySelector("#emotion");

window.addEventListener(CY.modules().FACE_AGE.eventName, (evt) => {
  age_div.textContent = 'Edad: ' + evt.detail.output.numericAge;
});

window.addEventListener(CY.modules().FACE_GENDER.eventName, (evt) => {
  gen_div.textContent = 'Género: ' + evt.detail.output.mostConfident;
});

window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
  emo_div.textContent = 'Emoción: ' + evt.detail.output.dominantEmotion;
});

const videoElement = document.getElementById('camera');
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    videoElement.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing camera:', error);
  });