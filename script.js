// Aggiungo un listener per il cambio di stato del radio button
var radioButtons = document.querySelectorAll('input[name="tabsSelection"]');
var contents = document.querySelectorAll('.content');

radioButtons.forEach(function(radio) {
  radio.addEventListener('change', function() {
    var selectedContentId = this.id.replace('radio', 'content');

    contents.forEach(function(content) {
      content.classList.remove('active');
    });

    var selectedContent = document.getElementById(selectedContentId);
    selectedContent.classList.add('active');
  });
});

const loader = document.getElementById("loader");

window.addEventListener("load", function(){
  var phrases = [
    "Prima frase",
    "Seconda frase",
    "Terza frase"
  ];

  var phraseElement = document.getElementById("phrase");
  var currentIndex = 0;

  function changePhrase() {
    phraseElement.innerHTML = phrases[currentIndex];
    currentIndex = (currentIndex + 1) % phrases.length;
  }

  setInterval(changePhrase, 300);
  setTimeout(function() {
    loader.style.animation="slide-down 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards";
    document.getElementById("MainPage").style.animation="slide-down-sections 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards"
    clearInterval(changePhrase)
     // Nascondi l'elemento di caricamento una volta che la pagina è stata completamente caricata
  }, 1300);
});


