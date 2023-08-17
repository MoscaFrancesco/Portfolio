
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

// This makes the header reappear when you scroll upwards.
function initHeader(){
const showAnim = gsap.from('header', { 
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
  
//Change section ---IN PROGRESS---
function initChangeSection(){

    const fadeOutDuration = 100;
    const overlayDelay = 300;
    const overlay = $('#overlay');
  
    function fadeIn(element) {
      element.css({ display: 'flex', opacity: 1 });
    }
  
    function fadeOut(element) {
      element.css({ opacity: 0 });
      setTimeout(function() {
        element.hide();
      }, fadeOutDuration);
    }
  
    function fadeOutInTransition(selectedContentId) {
      const activeContent = $('.content.active');
      if (activeContent.length) {
        fadeOut(activeContent);
        activeContent.removeClass('active');
      }
  
      overlay.css({ opacity: 1, pointerEvents: 'auto' });
  
      setTimeout(function() {
        overlay.css({ opacity: 0, pointerEvents: 'none' });
  
        const selectedContent = $('#' + selectedContentId);
        fadeIn(selectedContent);
        selectedContent.addClass('active');
      }, overlayDelay);
    }
  
    $('input[name="tabsSelection"]').on('change', function() {
      history.scrollRestoration = 'manual'; 
      window.scrollTo(0, 0);
      $('#OtherContent').scrollTop(0);
  
      $('#OtherContent').css('pointerEvents', 'none');
      $('.ScrollDots').css('position', 'absolute');
  
      const selectedContentId = this.id.replace('radio', 'content');
      fadeOutInTransition(selectedContentId);
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

/* ------------------------------ First Section ----------------------------- */

function initSmoothScroll(){
  const lenis = new Lenis({
    smoothTouch: true,
    smoothWheel: true,
    syncTouch: true
  });
lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
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
        var moveTop = (firstTop - winScrollTop) * 0.05; // speed
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

/* ---------------------------------- Works --------------------------------- */

function initsimpleLightbox(){

  $('.zoomItem a').simpleLightbox({
    'showCounter': false,
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'animationSpeed':100,
    'loop':true,
  });

  $('.zoomItemCartoon a').simpleLightbox({
    'showCounter': false,
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'animationSpeed':100,
    'disableScroll': true,
    'loop':true,
  });

  $('.zoomItemSketch a').simpleLightbox({
    'showCounter': false,
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'animationSpeed':100,
    'disableScroll': true,
    'loop':true,
  });

  $('.zoomItemIll a').simpleLightbox({
    'showCounter': false,
    'closeText': '<i class="fa fa-times" aria-hidden="true"></i>',
    'navText': ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    'captions': true, // Abilita le didascalie
    'captionSelector': 'img' ,
    'captionsData': 'alt',
    'animationSpeed':100,
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


// Fire all scripts on page load
// Fire all scripts on page load
$(document).ready(function() {
  //loader
  initLoader()

  //header
  initHeader()
  initSocialButton()
  initChangeSection()
  initMenuButton()

  setTimeout(function() { //run after the loader 
      $("body").css("overflow", "visible");
      initSmoothScroll()
      //initParallax() 
      initMagneticButtons()
      initLinks()
      
    }, 2300);
  
  //Section 1


  //Works
  initsimpleLightbox()
});

//beforeUnload
$(window).on('beforeunload', () => window.scrollTo(0, 0));
