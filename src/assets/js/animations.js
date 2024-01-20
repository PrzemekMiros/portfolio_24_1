function animationMain() {
    gsap.registerPlugin(ScrollTrigger);
    locoScroll.on("scroll", ScrollTrigger.update);
     ScrollTrigger.scrollerProxy(".scrollContainer", {
       scrollTop(value) {
         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
       },
       getBoundingClientRect() {
         return {
           top: 0,
           left: 0,
           width: window.innerWidth,
           height: window.innerHeight
         }; 
       },
       pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
     });
     ScrollTrigger.defaults({ scroller: ".scrollContainer" });
     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
     ScrollTrigger.refresh();
     new ResizeObserver(() => locoScroll.update()).observe(document.querySelector(".scrollContainer"));

     // Header scrolled
     let lastScrollPos = 0;
     locoScroll.on('scroll', (position) => {
       const currentScrollPos = position.scroll.y;

       if (currentScrollPos > 50) {
         if (currentScrollPos > lastScrollPos) {
           document.querySelector('.site-header').classList.add('scrolled');
         } else {
           document.querySelector('.site-header').classList.remove('scrolled');
         }
       } else {
         document.querySelector('.site-header').classList.remove('scrolled');
       }
    
       lastScrollPos = currentScrollPos;
     });

    // Paragraph --------------------------------------------------------------
   if (document.querySelector('.split-text-lines')) {
   let splitTextLines = [...document.querySelectorAll('.split-text-lines')];
   splitTextLines.forEach(element =>{
      let mySplitText = new SplitText(element, {
        type:"lines",
        linesClass: "line"
      });
       new SplitText(element, {
        type:"lines",
        linesClass: "line-parent",
      });
       gsap.from(mySplitText.lines, {
           duration: 1,
           delay: .15,
           stagger: 0.05,
           yPercent: 100,
           ease: Power2. easeInOut,
           scrollTrigger: { 
             scroller: ".scrollContainer",
             trigger: element,
             start: "top 95%",
             //toggleActions: 'restart pause reverse pause',
           },
       })
   });
   };
   
   // Fade in
       const fadeIn = gsap.utils.toArray('.fadeIn');
         fadeIn.forEach(fadeInItem => {
           gsap.from(fadeInItem, { 
             opacity: 0,
             y: 20,
             duration: 1,
             delay: .15,
             scrollTrigger: {
               scroller: ".scrollContainer",
               trigger: fadeInItem,
               start: "top 90%",
             }
       })
   });
   
   // Line animation
   const lineX = gsap.utils.toArray('.line-x');
   lineX.forEach(lineXItem => {
     gsap.from(lineXItem, { 
       width: "0",
       duration: .7,
       delay: .15,
       ease: Power2. easeInOut,
       scrollTrigger: {
         scroller: ".scrollContainer",
         trigger: lineXItem,
         start: "top 90%",
       }
   })
   });

   // Scroll progress
   if (window.matchMedia("(min-width: 767px)").matches) {
   gsap.to(".scrollprogress", {
    height: "100vh",
    ease: 'none',
    scrollTrigger: { 
      scroller: ".scrollContainer",
      trigger: ".scrollContainer",
      start: "top 0%",
      end: "bottom 99%",
      scrub: true,
    }
  });
  };

   // Footer parallax
   if (window.matchMedia("(min-width: 767px)").matches) {
     gsap.from(".footer-parallax", {
       y: "-25%",
       scrollTrigger: {
         scroller: ".scrollContainer",
         trigger: ".site-footer",
         start: "top 95%",
         end: "bottom 80%", 
         scrub: true
       }
     });
     } else {
       gsap.from(".footer-parallax", {
         y: "-15%",
         scrollTrigger: {
           scroller: ".scrollContainer",
           trigger: ".site-footer",
           start: "top 95%",
           end: "bottom 90%",
           scrub: true
         }
       });
     }; 

     if (window.matchMedia("(min-width: 767px)").matches) {
     const paths = [...document.querySelectorAll('path.path-anim')];

     paths.forEach(el => {
     const svgEl = el.closest('.separator');
     const pathTo = el.dataset.pathTo;
   
     gsap.timeline({
         scrollTrigger: {
             trigger: svgEl,
             start: "top bottom",
             end: "bottom 40%",
             scrub: true
         }
     })
     .to(el, {
         ease: 'none',
         attr: { d: pathTo }
     });
     });
    };
   
   
   // Magnetic
   if(document.querySelector('.magnetic')) {
     var magnets = document.querySelectorAll('.magnetic');
     var magnetText = document.querySelectorAll(".btn-text");
     if(window.innerWidth > 767){
       // Mouse Reset
       magnets.forEach( (magnet) => {
         magnet.addEventListener('mousemove', moveMagnet );
         // $(this.parentNode).removeClass('not-active');
         magnet.addEventListener('mouseleave', function(event) {
           gsap.to( event.currentTarget, 1.5, {
             x: 0, 
             y: 0, 
             ease: 'Elastic.easeOut'
           });
           gsap.to( magnetText, 1.5, {
             x: 0, 
             y: 0, 
             ease: 'Elastic.easeOut'
           });
         });
       });
       // Mouse move
       function moveMagnet(event) {
         var magnetButton = event.currentTarget;
         var bounding = magnetButton.getBoundingClientRect();
         var magnetsStrength = magnetButton.getAttribute("data-strength");
         var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
         var magnetText = magnetButton.querySelector(".btn-text");
         gsap.to( magnetButton, 1.5, {
           x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
           y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
           rotate: '0.005deg',
           ease: 'Power4.easeOut'
         });
         gsap.to( magnetText, 1.5, {
           x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
           y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
           rotate: '0.001deg',
           ease: 'Power4.easeOut'
         });
       }
     }; 
   };
     
   // Nav menu
   const menuToggle = document.getElementById("menuToggle");
   const menuBar = gsap.timeline();
   var tl = gsap.timeline({ paused: true});
   tl.to('.fullpage-menu', {
       duration: 0,
       display: "block",
       ease: 'Expo.easeInOut',
   });
   tl.from('.menu-bg', {
       duration: .8,
       opacity: 0,
       ease: 'Expo.easeInOut'
   });
   tl.from('.main-menu li a', {
       duration: 1.3,
       y:"110%",
       stagger: 0.1,
       ease: 'Expo.easeInOut'
   }, "-=0.6");
   tl.from('.line-xh', {
    duration: 1,
    stagger: .1,
    width: "0",
    ease: 'Expo.easeInOut'
   }, "-=1.3");
   tl.from('.nav-info', {
       duration: .6,
       opacity: 0,
     y: 20,
     ease: Power3,
   }, "-=0.8");
   tl.from('.line-yh', {
       duration: 1,
       height: "0",
       ease: 'Expo.easeInOut'
   }, "-=1.3");
   tl.reverse();
   menuToggle.addEventListener('click', function(){
       menuBar.reversed(!menuBar.reversed());
       tl.reversed(!tl.reversed());
     // menuWrap.classList.toggle("active");
   });
   
   // Greeting
   if (document.querySelector("#greeting")) {
     const greeting = document.getElementById("greeting");
     const hour = new Date().getHours();
     const welcomeTypes = ["Dzień dobry !", "Dobry wieczór !"];
     let welcomeText = "";
     if (hour < 20) welcomeText = welcomeTypes[0];
     else welcomeText = welcomeTypes[1];
     greeting.innerHTML = welcomeText;
   };
   
   // parallax 
   if (window.matchMedia("(min-width: 767px)").matches) {
       gsap.utils.toArray(".parallax-wrap").forEach(function(container) {
         let image = container.querySelector("picture img");
       
         let tl = gsap.timeline({
             scrollTrigger: {
               scroller: ".scrollContainer",
               trigger: container,
               scrub: true,
               pin: false,
             },
           }); 
           tl.from(image, {
             yPercent: -5,
             ease: "none",
           }).to(image, {
             yPercent: 5,
             ease: "none",
           }); 
       });
     };

// Reveal images parallax
if (document.querySelector(".works")) {
  if (window.matchMedia("(min-width: 767px)").matches) {

const elementsWorks = document.querySelectorAll(".item-work");
const slidePicWorks = document.querySelector("#gallery-work");
const slidePicsWorks = document.querySelector("#work-images");

gsap.set(slidePicWorks, { autoAlpha: 0 });

elementsWorks.forEach((element, index) => {
  element.addEventListener("mouseenter", function () {
    gsap.to(slidePicsWorks, {
      marginTop: `-${320 * index}px`,
      ease: "power1.out",
      duration: .5, // Image in wrapper
    });
  });

  element.addEventListener("mouseleave", function () {
    gsap.to(element, { 
      color: "initial", 
      duration: .2, // Image fade out
    });
  });
});

window.addEventListener("mousemove", function (e) {
  gsap.to(slidePicWorks, {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`,
    xPercent: -40,
    yPercent: -45,
    duration: .5, // Main image wrap
  });
});

if (document.querySelector(".items-works")) {
document.querySelector(".items-works").addEventListener("mouseenter", function () {
    gsap.to(slidePicWorks, {
      autoAlpha: 1,
      scale: 1,
      duration: .2, // Image fade in
    });
  });

document.querySelector(".items-works").addEventListener("mouseleave", function () {
    gsap.to(slidePicWorks, {
      autoAlpha: 0,
      scale: 0,
      duration: .2, // Image fade in
    });
  });
};
};
};

// Reveal images
function imageReveal() {
  const revealContainers = document.querySelectorAll(".reveal");
  revealContainers.forEach((container) => {
    let clipPath;
    // Left to right
    if (container.classList.contains("reveal--left")) {
      clipPath = "inset(0 0 0 100%)";
    }
    // Right to left
    if (container.classList.contains("reveal--right")) {
      clipPath = "inset(0 100% 0 0)";
    }
    // Top to bottom
    if (container.classList.contains("reveal--top")) {
      clipPath = "inset(0 0 100% 0)";
    }
    // Bottom to top
    if (container.classList.contains("reveal--bottom")) {
      clipPath = "inset(100% 0 0 0)";
    }

    const image = container.querySelector("img");

    // Animation trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scroller: ".scrollContainer",
        start: "top bottom",
        end: "bottom top",
      }
    });

    // Animation timeline
    tl.set(container, { autoAlpha: 1 });
    tl.from(container, {
      clipPath,
      duration: 1,
      delay: 0.2,
      ease: Power4.easeInOut
    });
    if (container.classList.contains("reveal--overlay")) {
      tl.from(image, { clipPath, duration: 0.6, ease: Power4.easeOut });
    }
    tl.from(image, {
      scale: 1.3,
      duration: 1.2,
      delay: -1,
      ease: Power2.easeOut
    });
  });

  ScrollTrigger.refresh();
}
imageReveal();


// End animation
}
   
   function addMenuClass() {
     MenuClass = document.querySelector("body");
     MenuToggle = document.querySelector(".menu-toggle");
     MenuToggle.addEventListener('click', () => {
       MenuClass.classList.toggle("menu-open");
     });
   }
   addMenuClass();
   function removeMenuClass() {
     document.querySelector("body").classList.remove("menu-open");
   }