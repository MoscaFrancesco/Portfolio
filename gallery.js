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
  initMagneticButtons()


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
      function initializeSimpleLightbox(masonryId) {
      $(masonryId + ' .item a').simpleLightbox({
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
      }

      initializeSimpleLightbox('#masonry-1');
      initializeSimpleLightbox('#masonry-2');
      initializeSimpleLightbox('#masonry-3');
      initializeSimpleLightbox('#masonry-4');  
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

function initMagneticButtons() {
  $(".magnetic").each(function() {
    const OuterMagneticRange = $(this).closest(".OuterMagneticRange");
    OuterMagneticRange.on("mousemove", moveMagnet);
    OuterMagneticRange.on("mouseleave", resetMagnet);
  });

  function moveMagnet(event) {
    const hoverColor = $(this).find(".hovercolor");
    if (hoverColor.length > 0) {
      hoverColor.css({
        height: "100%",
        top: "auto"
      });
    }

    const magnetButton = $(this).find(".magnetic");
    const ButtonText = magnetButton.find(".MagneticChild");
    const bounding = magnetButton[0].getBoundingClientRect();
    const magnetsStrength = parseInt(magnetButton.data("strength"), 10);

    gsap.to([magnetButton, ButtonText], 1.5, {
      x: ((event.clientX - bounding.left) / magnetButton.width() - 0.5) * magnetsStrength,
      y: ((event.clientY - bounding.top) / magnetButton.height() - 0.5) * magnetsStrength,
      rotate: "0.001deg",
      ease: "power4.out"
    });
  }

  function resetMagnet(event) {
    const hoverColor = $(this).find(".hovercolor");
    if (hoverColor.length > 0) {
      hoverColor.css({
        height: "0%",
        top: "0%"
      });
    }

    const magnetButton = $(this).find(".magnetic");
    const ButtonText = magnetButton.find(".MagneticChild");

    gsap.to([magnetButton, ButtonText], 1.5, {
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)"
    });
  }
}
