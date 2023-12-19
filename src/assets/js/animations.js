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
     locoScroll.on('scroll', (position) => {
       if ((position.scroll.y) > 50) {
       document.querySelector('.site-header').classList.add('scrolled');
     } else {
       document.querySelector('.site-header').classList.remove('scrolled');
     }  
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
       ease: Power2. easeInOut,
       scrollTrigger: {
         scroller: ".scrollContainer",
         trigger: lineXItem,
         start: "top 90%",
       }
   })
   });
   
   // Footer parallax
   if (window.matchMedia("(min-width: 767px)").matches) {
     gsap.from(".footer-parallax", {
       y: "-35%",
       scrollTrigger: {
         scroller: ".scrollContainer",
         trigger: ".site-footer",
         start: "top 95%",
         end: "bottom 90%",
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
   
   // Client logos
   gsap.from(".client-item", {
     opacity: 0,
     autoAlpha: 0,
     y: 20,
     duration: 1,
     delay: .3,
     stagger: 0.12,
     scrollTrigger: {
       trigger: ".clients-wrap",
       scroller: ".scrollContainer",
     }
   });
     
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
   tl.from('.nav-info', {
       duration: .6,
       opacity: 0,
     y: 20,
     ease: Power3,
   }, "-=0.8");
   tl.from('.h-line-y', {
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
         let image = container.querySelector("img");
       
         let tl = gsap.timeline({
             scrollTrigger: {
               scroller: ".scrollContainer",
               trigger: container,
               scrub: true,
               pin: false,
             },
           }); 
           tl.from(image, {
             yPercent: -10,
             ease: "none",
           }).to(image, {
             yPercent: 10,
             ease: "none",
           }); 
       });
     };
   
     // Acordion
     if (document.querySelector(".accordion")) {
     let t = document.getElementsByClassName("accordion");
     for (let e = 0; e < t.length; e++) t[e].addEventListener("click", function () {
       let e = this.nextElementSibling;
       if (e.style.maxHeight) e.style.maxHeight = null, this.classList.remove("open");
       else {
         for (let a = 0; a < t.length; a++) t[a].classList.remove("open"), t[a].nextElementSibling.style.maxHeight = null;
         e.style.maxHeight = e.scrollHeight + "px", this.classList.toggle("open");
       }
     });
     };
   
   // Scroll progress
   if (document.querySelector(".scrollprogress")) {
   gsap.to(".scrollprogress", {
     height: "calc(100% - 65px)",
     ease: 'none',
     scrollTrigger: { 
       scroller: ".scrollContainer",
       trigger: ".content",
       start: "top 80px",
       end: "bottom 99%",
       scrub: true,
     }
   });
   };
   
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