/* VARS USED IN INTRO */
const tag = document.querySelector(".tag");
const openButton = document.querySelector(".open-button");

/* VARS USED IN MOBILE EXPERIENCE */
const lightbox = document.querySelector(".lightbox");
const icons = document.querySelectorAll(".icon");
const lbImages = document.querySelectorAll(".img-container");
const snippets = document.querySelectorAll(".snippet");
const close = document.querySelector(".lb-close");
const mFooter = document.querySelector(".mobile-footer");

/* VARS USED IN DESKTOP EXPERIENCE */
const desktopTag = document.querySelector(".desktop-tag");
const buttonDesktop = document.querySelector(".desktop-open-button");
const gifts = document.querySelectorAll(".gift");
const desktopFooter = document.querySelector(".desktop-footer");

const song = document.querySelector("audio");

/* CENTER OF WINDOW */
let xCenter = window.innerWidth / 2;
let yCenter = window.pageYOffset + window.innerHeight / 2;

let lbOpen = false;
let current = null;

let isAnimating = false;

let screenSize = window.innerWidth;
let smallScreen = screenSize < 1025 ? true : false;

// Refresh page if window resize reaches below 1025px and handle visible mobile footer
window.onresize = () => {
  xCenter = window.innerWidth / 2;
  yCenter = window.innerHeight / 2;

  if (
    (!smallScreen && window.innerWidth < 1025) ||
    (smallScreen && window.innerWidth > 1024)
  ) {
    // if (mFooter.style.display === "block") {
    //   mFooter.style.display = "none";
    // }
    location.reload(true);
  }
};

// Update the window's center as you scroll
window.onscroll = () => {
  // yCenter = window.pageYOffset + window.innerHeight / 2;
};

window.onload = () => {
  // Mobile Intro animations
  // TODO: Combine these two intro animations into one univerasal

  const introTl = new TimelineMax();

  introTl
    .from(tag, 1, { yPercent: -100, ease: Power4.easeOut })
    .from(openButton, 0.4, { opacity: 0 });

  openButton.onclick = () => {
    const iconTl = new TimelineMax();
    iconTl
      .to(openButton, 0.3, {
        opacity: 0,
        onComplete: function() {
          tag.classList.add("is-pressed");
        }
      })
      .to(".icons-container", 0.8, {
        bottom: 0,
        display: "block",
        onComplete: function() {
          mFooter.style.display = "block";
        }
      });
  };

  let desktopIntro = new TimelineMax();

  desktopIntro
    .from(desktopTag, 1, { yPercent: -100, ease: Power4.easeOut })
    .from(buttonDesktop, 0.3, {
      opacity: 0,
      onComplete: function() {
        desktopTag.classList.add("is-pressed");
      }
    });

  buttonDesktop.onclick = () => {
    const treeTl = new TimelineMax();
    treeTl
      .to(buttonDesktop, 0.3, {
        opacity: 0
      })
      .to(
        desktopTag,
        0.8,
        {
          height: 0
        },
        "desktopPrep"
      )
      .to(
        ".tree-container",
        0.8,
        {
          bottom: 0,
          display: "block",
          onStart: randomScale,
          onComplete: function() {
            desktopFooter.style.display = "block";
          }
        },
        "desktopPrep"
      );
  };

  // // Desktop Intro Animations
  // const controller = new ScrollMagic.Controller();

  // const tagTween = TweenMax.to(desktopTag, 0.5, {
  //   scale: 0.2,
  //   transformOrigin: "center top"
  // });

  // const scene = new ScrollMagic.Scene({
  //   triggerElement: "#trigger1",
  //   triggerHook: "onLeave",
  //   duration: "100%"
  // })
  //   .setTween(tagTween)
  //   // .setPin(desktopTag)
  //   .addTo(controller);

  // Hide all pictures and captions in lightbox
  for (let i = 0; i < lbImages.length; i++) {
    const image = lbImages[i];
    const snippet = snippets[i];
    image.style.display = "none";
    snippet.style.display = "none";
  }

  // Add eventListener for every icon
  for (let i = 0; i < icons.length; i++) {
    icons[i].onclick = () => openLightbox(i);
  }

  close.onclick = () => {
    closeLightbox();
  };

  // Add eventListener to all gifts on tree
  for (let i = 0; i < gifts.length; i++) {
    const gift = gifts[i];
    gift.onclick = () => {
      isAnimating = true;
      const clone = cloneOnTop(gift);
      document.body.appendChild(clone);
      //   gift.style.visibility = "hidden";
      zoomEffect(clone);
    };
  }
};

function openLightbox(index) {
  if (lbOpen) {
    return;
  }
  lbOpen = true;
  current = index;
  let tl = new TimelineMax();
  tl.to(icons[index], 0.2, { y: -20, ease: Power2.easeOut })
    .to(icons[index], 0.3, {
      y: 0,
      ease: Bounce.easeOut,
      onComplete: function() {
        lightbox.classList.remove("is-hidden");
        lightbox.classList.add("is-visible");
        lbImages[index].style.display = "block";
        snippets[index].style.display = "block";
        close.style.display = "block";
      }
    })
    .addLabel("lbAnimation")
    .from(
      lbImages[index],
      0.6,
      { yPercent: -150, opacity: 0, delay: 0.2 },
      "lbAnimation"
    )
    .from(
      snippets[index],
      0.6,
      { yPercent: 300, opacity: 0, delay: 0.2 },
      "lbAnimation"
    )
    .from(close, 0.3, { opacity: 0, scale: 0.5 });
}

function closeLightbox() {
  lightbox.classList.remove("is-visible");
  lightbox.classList.add("is-hidden");
  lbImages[current].style.display = "none";
  snippets[current].style.display = "none";
  close.style.display = "none";
  current = null;
  lbOpen = false;
}

function randomScale() {
  const randomArray = [gifts.length];
  for (let i = 0; i < gifts.length; i++) {
    randomArray[i] = Math.floor(Math.random() * gifts.length);
    for (let j = 0; j < i; j++) {
      if (randomArray[i] === randomArray[j]) {
        i--;
        break;
      }
    }
  }

  const scaleTl = new TimelineMax();

  for (let k = 0; k < randomArray.length; k++) {
    const randomNum = randomArray[k];
    scaleTl.from(gifts[randomNum], 0.15, { scale: 0 });
  }
}

function cloneOnTop(el) {
  const box = el.getBoundingClientRect();
  const clone = el.cloneNode(true);
  clone.style.width = `${box.width}px`;
  clone.style.height = `${box.height}px`;
  clone.style.top = box.top + "px";
  clone.style.left = box.left + "px";
  clone.classList.add("clone");
  return clone;
}

function zoomEffect(clone) {
  const tl = new TimelineMax({
    paused: true,
    reversed: true,
    onReverseComplete: removeClones
  });
  const x = clone.offsetLeft;
  const y = clone.offsetTop;
  const cy = y + clone.offsetHeight / 2;
  const ratio = (0.65 * window.innerWidth) / (clone.offsetWidth * 2);

  const text = clone.querySelector("p");
  const faces = clone.querySelectorAll(".face");
  tl.addLabel("openCard")
    .to(
      clone,
      0.8,
      {
        x: xCenter - x,
        y: yCenter - cy,
        scale: ratio,
        ease: Power4.easeOut
      },
      "openCard"
    )
    .to([faces[0], faces[1]], 0.2, { rotationY: -165 }, "openCard")
    .to(text, 0.5, { opacity: 1 });

  tl.play().timeScale(1);
  isAnimating = false;

  clone.onclick = () => {
    if (isAnimating) {
      return;
    }
    tl.reverse().timeScale(1.5);
  };
}

function removeClones() {
  const clones = document.querySelectorAll(".clone");
  for (let i = 0; i < clones.length; i++) {
    const clone = clones[i];
    document.body.removeChild(clone);
  }
}
