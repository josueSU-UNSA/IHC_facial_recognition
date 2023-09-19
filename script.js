


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

  const ctx = document.getElementById('emotion-histogram').getContext('2d');

  // Inicializa el arreglo de datos de emociones a cero.
  let emotionData = [0, 0, 0, 0, 0];
  
  const emotionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Feliz', 'Triste', 'Enojado', 'Sorprendido', 'Neutro'],
      datasets: [{
        label: 'Emociones',
        data: emotionData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Feliz
          'rgba(54, 162, 235, 0.5)', // Triste
          'rgba(255, 206, 86, 0.5)', // Enojado
          'rgba(75, 192, 192, 0.5)', // Sorprendido
          'rgba(201, 203, 207, 0.5)', // Neutro
        ],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
  
  window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    const emotions = evt.detail.output.emotions;
    if (emotions && emotions.length === 5) {
      emotionData = emotions; 
      emotionChart.data.datasets[0].data = emotionData;
      emotionChart.update();
    }
  });
  