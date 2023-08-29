
/* --------------------------------- Loader --------------------------------- */

function initLoader(){

  const phrases = [
    "Prima frase",
    "Seconda frase",
    "Terza frase",
    "quarta frase",
    "quinta frase"
  ];

  let currentIndex = 0;

  function changePhrase() {
    $("#phrase").text(phrases[currentIndex]);
    currentIndex = (currentIndex + 1) % phrases.length;

    let displayTime = (currentIndex === 1) ? 500 : 150;
    if (currentIndex === 0) displayTime=100000; //Stop the sentence change at the fifth sentence, it goes to 0 because it comes after the increase of the index

    setTimeout(changePhrase, displayTime);
  }

  //change the phrases
  changePhrase();

  function loader() {
    const tl = gsap.timeline();

    tl.set("#loader", { top: 0 })
      .to("#loader", { duration: 0.8, top: "-100%", ease: "Power4.easeInOut", delay: 1.45 })
      .to("#phrase-container", { duration: 0.8, opacity: 0, ease: "Power4.easeInOut" }, "<")
      .to("#loader .rounded-div", { duration: 1.2, height: "0vh", ease: "Power4.easeInOut" }, "=-.8")
      .set("html", { cursor: "auto" }, "=-.8")
      .fromTo(".WelcomeSlider", { opacity: 0, top: "50%" }, { duration: 0.7, opacity: 1, top: "0%", ease: "Power4.easeInOut" }, "=-1");
  }

  //Scroll the loader.
  loader();
}

/* --------------------------------- Header --------------------------------- */

let showAnim;
// This makes the header reappear when you scroll upwards.
function initHeader(){
 showAnim = gsap.from('header', { 
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);
  
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
}

//Social Card (left) 
function initSocialButton(){
  

    function Social() {
      gsap.to($("#SocialButton, #SocialButton .MagneticChild"), 1.5, {
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 0.5
      });
  
      $("#SocialButton").removeClass("magnetic")
                        .css({ height: "300px", width: "200px", borderRadius: "30px" });
      $("#card-photo").css("transform", "scale(0.36) translate(176px, 165px)");
      $("#card-socials").css({ height: "35px", opacity: "1" });
    }
  
    $("#SocialButton").on("mouseleave", function() {
      setTimeout(function() {
        $("#card-photo").css("transform", "scale(0.3) translate(220px, 230px)");
      }, 300);
  
      $(this).addClass("magnetic")
             .css({ height: "60px", width: "60px" });
    });
  
    $("#SocialButton").on("click", Social);
}

let animationExecuted = false; // Variabile per tenere traccia dello stato dell'animazione

//Change section ---IN PROGRESS---
function initChangeSection(){

//questa serve per far cambiare lo sfondo della Navbar
const radioButtons = document.querySelectorAll('input[type="radio"]');
const background1 = document.querySelector(".background1");
const background2 = document.querySelector(".background2");
const tab = document.querySelector(".tab")

radioButtons.forEach(function (radio) {
  radio.addEventListener("change", function () {
    if (this.id === "radio-2" && this.checked) {
      background1.style.opacity = 0;
      background2.style.opacity = 1;
      tab.style.color = "white"
    } else {
      background1.style.opacity = 1;
      background2.style.opacity = 0;
      tab.style.color = "black"
    }
  });
});
  
//questa invece per far cambiare sezione
const fadeOutDuration = 100;
const overlayDelay = 300;
const overlay = $('#overlay');
let isTransitioning = false; // Aggiunto per gestire lo stato di transizione

//le due transizioni in fade
function fadeIn(element) {
  element.css({ display: 'flex', opacity: 1 });
  $('footer').css({ opacity: 1 });
  
}

function fadeOut(element) {
  element.css({ opacity: 0 });
  $('footer').css({ opacity: 0 });
  setTimeout(function () {
    element.hide();
  }, fadeOutDuration);
}

//gestisce quando chiamare le due transizioni
function fadeOutInTransition(selectedContentId) {
  if (isTransitioning) {
    return; // Esce se c'è già una transizione in corso
  }
  isTransitioning = true; // Imposta lo stato di transizione su true

  const activeContent = $('.content.active');
  if (activeContent.length) {
    fadeOut(activeContent);
    activeContent.removeClass('active');
  }

  overlay.css("z-index", 1);
  overlay.css({ opacity: 1, pointerEvents: 'auto' });

  setTimeout(function () {
    overlay.css({ opacity: 0, pointerEvents: 'none' });

    const selectedContent = $('#' + selectedContentId);
    fadeIn(selectedContent);
    selectedContent.addClass('active');

      if (!animationExecuted) {
        InitDivisorAnim(); // Chiamata a InitDivisorAnim() solo se non è già stata eseguita
        animationExecuted = true; // Imposta lo stato dell'animazione su "eseguita"
      }
    

    isTransitioning = false; // Resetta lo stato di transizione
    setTimeout(function () {
      overlay.css("z-index", -1);
    }, overlayDelay)
  }, overlayDelay);
}

//evento on change
$('input[name="tabsSelection"]').on('change', function () {
  $('.ScrollDots').css('position', 'absolute');
  const selectedContentId = this.id.replace('radio', 'content');
  fadeOutInTransition(selectedContentId);

  setTimeout(function () {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, 50)

});

//cambio sezione manuale
const section2Button = document.getElementById('section2Button');
section2Button.addEventListener('click', function() {
    showAnim.play()
    setTimeout(() => { //prima mostra la navbar e poi cambia
      document.getElementById("radio-2").checked = true;
      fadeOutInTransition('content-2'); // Cambia con l'ID della tua prima sezione
      background1.style.opacity = 0;
        background2.style.opacity = 1;
        tab.style.color = "white"
    }, 300);
});

}

//Menu Button (right)
function initMenuButton() {

  function Menu() {
    gsap.to([$("#MenuButton"), $("#MenuButton").find(".MagneticChild")], 1.5, {
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)",
      duration: 0.5
    });

    $("#MenuButton").removeClass("magnetic")
              .css({ height: "300px", width: "200px", borderRadius: "30px" });
  }

  $("#MenuButton").on("mouseleave", function() {
    $("#MenuButton").addClass("magnetic")
              .css({ height: "60px", width: "60px" });
  });

  $("#MenuButton").on("click", Menu);
}

function initWelcomeSlider(){
  gsap.to(".OverlaySlider", {
    x: "0%",
    ease: "Linear.out", 
    scrollTrigger: {
      trigger: ".WelcomeSlider",
      start: "center center", 
      end: "300% center", 
      scrub: true, 
      pin: true, 
    }
  });
}

/* ------------------------------ First Section ----------------------------- */

function initSmoothScroll(){
  const lenis = new Lenis({
    duration:1,
    smoothWheel:true,
    smoothTouch:true,
  });

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf)

}

function initParallax(){
  var winScrollTop = 0;
  $.fn.is_on_screen = function(){    
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

  function parallax() { 
    var scrolled = $(window).scrollTop();
    $('.parallax ').each(function(){ 
      if ($(this).is_on_screen()) {	
        var firstTop = $(this).offset().top; 
        var $span = $(this).find("img");
        var moveTop = (firstTop - winScrollTop) * 0.10; // speed
        var currentScale = parseFloat($span.css("transform").split(',')[3]); // Ottieni l'attuale valore di scale
  
        $span.css({
          transform: "translate3d(0, " + -moveTop + "px, 0) scale(" + currentScale + "," + currentScale + ")" // Combina translate3d e scale
        });
      }
    });
  }
  
  
  $(window).scroll(function(e){
    winScrollTop = $(this).scrollTop();
    parallax();
  });

}

function InitParagraphAnim(){
  gsap.utils.toArray(".animateP").forEach(elem => {
    gsap.set(elem, { autoAlpha: 0 });
    
    ScrollTrigger.create({
      trigger: elem,
      start: "top 95%",
      end: "bottom 20%",
      animation: gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1,
          delay: .3,
          y: 0,
          autoAlpha: 1,
          ease: "expo",
          overwrite: "auto"
        }
      ),
      toggleActions: "play none none reverse",
      scrub: 0.5,
    });
  });
  
}

function InitfooterAnimation(){
gsap.utils.toArray(".animateFooter").forEach(elem => {
  gsap.set(elem, { autoAlpha: 0 });
  
  ScrollTrigger.create({
    trigger: elem,
    start: "top 60%",
    end: "bottom 20%",
    animation: gsap.fromTo(
      elem,
      { y: 100, autoAlpha: 0 },
      {
        duration: 1,
        delay: .3,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
      }
    ),
    toggleActions: "play none none reverse",
    markers:true
  });
});

}

function InitImageAnimation(){
  const image = document.querySelector('.FirstWrapper img:nth-child(3)');

    gsap.fromTo(image,{
      x: '10%',
    },  {
      x: '0%',

      ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scrollTrigger: {
        trigger: image,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    const image2 = document.querySelector('.SecondWrapper img:nth-child(1)');

    gsap.fromTo(image2,{
      x: '-10%',
    },  {
      x: '0%',
      ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scrollTrigger: {
        trigger: image2,
        start: 'top center',
        end: 'bottom center',
        scrub: true
        }
    });
}

function InitCitAnimation(){

  gsap.registerPlugin(ScrollTrigger);
gsap.set(".about_text_p", { autoAlpha: 0, yPercent: 200 });

  function DividiInLinee() {
    // Ottieni il contenuto del paragrafo non diviso in righe
    const unformattedParagraph = document.querySelector(".about_text_pWrap")
      .textContent;

    // Dividi il contenuto in righe utilizzando il carattere di nuova riga "\n" come delimitatore
    const lines = unformattedParagraph
      .split("\n")
      .filter((line) => line.trim() !== "");

    // Seleziona l'elemento HTML in cui vuoi sostituire il paragrafo esistente
    const aboutTextDiv = document.querySelector(".about_text");

    // Rimuovi tutti gli elementi figli dell'elemento aboutTextDiv
    while (aboutTextDiv.firstChild) {
      aboutTextDiv.removeChild(aboutTextDiv.firstChild);
    }

    // Crea un nuovo elemento div per ogni riga e aggiungilo alla struttura HTML
    lines.forEach((line) => {
      const lineDivWrap = document.createElement("div");
      lineDivWrap.className = "about_text_pWrap";

      const lineContent = document.createElement("div");
      lineContent.className = "about_text_p";
      lineContent.textContent = line;

      lineDivWrap.appendChild(lineContent);
      aboutTextDiv.appendChild(lineDivWrap);
    });
  }
  DividiInLinee();

  setTimeout(() => {
    //prima mostra la navbar e poi cambia

    ScrollTrigger.batch(".about_text", {
      onEnter: (batch) => {
        batch.forEach((section, i) => {
          gsap.to(section.querySelectorAll(".about_text_p"), {
            autoAlpha: 1,
            transform: "translateY(0%)",
            duration: 0.6,
            ease: "power1.inOut",
            stagger: 0.1,
            delay: 0,
          });
        });
      },
      onLeaveBack: (batch) => {
        batch.forEach((section) => {
          gsap.to(section.querySelectorAll(".about_text_p"), {
            autoAlpha: 0,
            transform: "translateY(200%)",
            duration: 0.3,
            ease: "power1.inOut"
          });
        });
      },
      start: "top 95%",
      end: "bottom 55%",
      //markers: true
    });
  }, 1000);
}

/* ---------------------------------- Works --------------------------------- */

function initsimpleLightbox(){

  $('.zoomItem a').simpleLightbox({
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'fileExt':'webp',
    'animationSpeed':200,
    'loop':true,
  });

  $('.zoomItemCartoon a').simpleLightbox({
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'animationSpeed':200,
    'disableScroll': true,
    'fileExt':'webp',
    'loop':true,

  });

  $('.zoomItemSketch a').simpleLightbox({
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'fileExt':'webp',
    'animationSpeed':200,
    'disableScroll': true,
    'loop':true,
  });

  $('.zoomItemIll a').simpleLightbox({
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'animationSpeed':200,
    'fileExt': 'webp',
    'disableScroll': true,
    'loop':true,
  });
  
}

function initMagneticButtons() {
  
  $(".magnetic").each(function() {
    const OuterMagneticRange = $(this).closest(".OuterMagneticRange");
    OuterMagneticRange.on("mousemove", moveMagnet);
    OuterMagneticRange.on("mouseleave", resetMagnet);
  });

  function moveMagnet(event) {
    
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
    const magnetButton = $(this).find(".magnetic");
    const ButtonText = magnetButton.find(".MagneticChild");

    gsap.to([magnetButton, ButtonText], 1.5, {
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)"
    });
  }
}

function initLinks(){
  document.querySelectorAll(".link").forEach((link) => {
    link.innerHTML =
        "<div><span>" +
        link.textContent.trim().split("").join("</span><span>") +
        "</span></div>";
    link.querySelectorAll("span").forEach(
        (s) => (s.innerHTML = s.textContent == " " ? "&nbsp;" : s.textContent)
    );
    link.insertAdjacentHTML(
        "beforeend",
        '<div><svg preserveAspectRatio="none" viewBox="0 0 192 5"><path d="M191.246 4H129C129 4 127.781 4.00674 127 4C114.767 3.89447 108.233 1 96 1C83.7669 1 77.2327 3.89447 65 4C64.219 4.00674 63 4 63 4H0.751923" /></svg></div>'
    );

    function setTransitionDelays(selector, delayIncrement) {
        const elements = link.querySelectorAll(selector); // Cambio da document.querySelectorAll a link.querySelectorAll
        elements.forEach((element, index) => {
            const delay = (index + 1) * delayIncrement;
            element.style.transitionDelay = `${delay}s`;
        });
    }

    // Chiama la funzione per assegnare i ritardi ai tuoi elementi
    setTransitionDelays(".OtherTextWrapper .link div span:nth-child(n)", 0.01); // Puoi cambiare qui per modificare il ritardo tra le lettere
});
}

function InitDivisorAnim() {

  const elementsLabelDivisore = document.querySelectorAll(".LabelDivisore");
  const elementsDivisore = document.querySelectorAll(".divisore");
  
  elementsLabelDivisore.forEach((element) => {
    const tl = gsap.timeline();
    tl.from(element, {
      opacity: 0,
      y: 30,
      duration: 0.2,
      ease: "power2.inOut"
    });

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      end: "bottom 80%",
      animation: tl,
      toggleActions: "play none none reverse",
    });
  });

  elementsDivisore.forEach((element, index) => {
    const label = elementsLabelDivisore[index];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: label,
        start: "top 80%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      element,
      { width: '0px' },
      { width: "100%", duration: 0.5, ease: "power2.inOut" }
    );
  });
}




/* ---------------------- Fire all scripts on page load --------------------- */
$(document).ready(function() {
  //loader
  //initLoader() devo rimettere top a 0 nel css e va tolto anche il commento da beforeunload, oltre che rimettere il timer a 2300
  initWelcomeSlider()

  initHeader()
  initSocialButton()
  initChangeSection()
  initMenuButton()
  InitfooterAnimation()
  InitImageAnimation()
  initParallax() 
  initsimpleLightbox()
  InitDivisorAnim()
  InitParagraphAnim()

  setTimeout(function() { //run after the loader 
      $("body").css("overflow-y", "visible");

      if(('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints > 0)) {
      InitCitAnimation()
      initSmoothScroll()
      initMagneticButtons()
      initLinks()
      }
    }, 0); //va a 2300


});

//beforeUnload
$(window).on('beforeunload', () => window.scrollTo(0, 0));
$(window).on('unload', () => document.getElementById("radio-1").checked = true);

