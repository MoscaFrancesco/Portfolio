/* --------------------------- simpleLitBox setup --------------------------- */

function changeSection(sectionNumber) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(`section${sectionNumber}`).classList.add('active');
}

/* ------------ Funzione per aggiungere le immagini alla griglia ------------ */
function populateGrid(data, section) {
  const grid = section.querySelector(".masonry");

  data.forEach(imagePath => {
    const item = document.createElement("div");
    item.className = "item";

    const link = document.createElement("a");
    link.href = imagePath;

    const img = document.createElement("img");
    img.src = imagePath;
    img.className = "img-responsive";

    link.appendChild(img);
    item.appendChild(link);
    grid.appendChild(item);
  });
}

/* ----------------------------- fire al script ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.section');

  fetch('imageData.json')
    .then(response => response.json())
    .then(data => {
      sections.forEach((section, index) => {
        const sectionNumber = index + 1;
        const sectionData = data[`section${sectionNumber}`];
        populateGrid(sectionData, section);
      });

      // Inizializza SimpleLightbox dopo aver popolato la griglia con le immagini
      $('.item a').simpleLightbox({
        'showCounter': false,
        'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
        'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
        'captions': true, // Abilita le didascalie
        'captionSelector': 'img',
        'captionsData': 'alt',
        'fileExt': 'webp',
        'animationSpeed': 100,
        'loop': true,
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento dei dati JSON:', error);
    });



  /* ---------------- Serve per cambiare sezion in base al lini --------------- */
  var currentURL = window.location.href;

  // Estrapola i parametri dall'URL
  var urlParams = new URLSearchParams(window.location.search);

  // Leggi il valore del parametro "source"
  var source = urlParams.get("source");

  // Fai qualcosa in base alla fonte del link
  if (source === "Illustration") {
      document.getElementById(`section1`).classList.add('active')    
  } else if (source === "Cartoon") {
      document.getElementById(`section2`).classList.add('active')
      document.getElementById(`section1`).classList.remove('active')    

      } else if (source === "Sketch") {
          document.getElementById(`section3`).classList.add('active')
          document.getElementById(`section1`).classList.remove('active')    

          }


});