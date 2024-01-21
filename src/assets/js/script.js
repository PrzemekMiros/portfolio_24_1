function appMain() {
  const changeTheme = document.querySelector(".change-theme");
  let theme = localStorage.getItem("theme");
  changeTheme.addEventListener("click", () => {
    if (theme === "dark") {
      document.querySelector("html").classList.remove("dark");
      document.querySelector("html").classList.add("light");
      theme = "light";
    } else {
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });
  if (theme === "dark") {
    document.querySelector("html").classList.add("dark");
  }
  if (theme === "light") {
    document.querySelector("html").classList.add("light");
  }

  // Lazy blur images
  if (document.querySelector(".blur-load")) {
    const blurImgWrap = document.querySelectorAll(".blur-load");
    blurImgWrap.forEach((item) => {
      const img = item.querySelector("picture img");
      function loaded() {
        item.classList.add("loaded");
      }
      if (img.complete) {
        loaded();
      } else {
        img.addEventListener("load", loaded);
      }
    });
  }

  if (document.querySelector(".swiper")) {
    var swiper = new Swiper(".swiper", {
      grabCursor: true,
      slidesPerView: 2,
      spaceBetween: 20,
      lazy: true,
      centeredSlides: false,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 3000,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: false,
      breakpoints: {
        460: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3
        },
        991: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

  // Acordion
  if (document.querySelector(".accordion")) {
    let t = document.getElementsByClassName("accordion");
    for (let e = 0; e < t.length; e++)
      t[e].addEventListener("click", function () {
        let e = this.nextElementSibling;
        if (e.style.maxHeight)
          (e.style.maxHeight = null), this.classList.remove("open");
        else {
          for (let a = 0; a < t.length; a++)
            t[a].classList.remove("open"),
              (t[a].nextElementSibling.style.maxHeight = null);
          (e.style.maxHeight = e.scrollHeight + "px"),
            this.classList.toggle("open");
        }
      });
  }
}
