// /* INTRO VARS */
// const loader = document.querySelector(".loader");

// /* VARS USED IN INTRO */
// const tag = document.querySelector(".tag");
// const openButton = document.querySelector(".open-button");

// /* VARS USED IN MOBILE EXPERIENCE */
// const lightbox = document.querySelector(".lightbox");
// const icons = document.querySelectorAll(".icon");
// const lbImages = document.querySelectorAll(".img-container");
// const snippets = document.querySelectorAll(".snippet");
// const close = document.querySelector(".lb-close");
// const mFooter = document.querySelector(".mobile-footer");

// /* VARS USED IN DESKTOP EXPERIENCE */
// const desktopTag = document.querySelector(".desktop-tag");
// const buttonDesktop = document.querySelector(".desktop-open-button");
// const gifts = document.querySelectorAll(".gift");
// const overlay = document.querySelector(".invisible");
// const desktopFooter = document.querySelector(".desktop-footer");

// /* AUDIO HANDLING */
// const introSpeakers = document.querySelectorAll(".intro-volume");
// const contentSpeakers = document.querySelectorAll(".content-speaker");
// const song = document.querySelector(".song");

// /* CENTER OF WINDOW */
// let xCenter = window.innerWidth / 2;
// let yCenter = window.pageYOffset + window.innerHeight / 2;

// let lbOpen = false;
// let current = null;

// let isAnimating = false;
// let isPlaying = false;

// let screenSize = window.innerWidth;
// let smallScreen = screenSize < 1025 ? true : false;

// // Refresh page if window resize reaches below 1025px and handle visible mobile footer
// window.onresize = () => {
//   xCenter = window.innerWidth / 2;
//   yCenter = window.innerHeight / 2;

//   if (
//     (!smallScreen && window.innerWidth < 1025) ||
//     (smallScreen && window.innerWidth > 1024)
//   ) {
//     location.reload(true);
//   }
// };

// window.onload = () => {
//   // Remove loader when page is loaded
//   TweenMax.to(loader, 0.7, {
//     opacity: 0,
//     onComplete: function() {
//       loader.style.display = "none";
//     }
//   });
//   // Mobile Intro animations
//   // TODO: Combine these two intro animations into one universal

//   const introTl = new TimelineMax();

//   introTl
//     .from(tag, 1, { yPercent: -100, ease: Power4.easeOut })
//     .from(openButton, 0.4, { opacity: 0 })
//     .from(introSpeakers[0], 0.4, { opacity: 0 });

//   openButton.onclick = () => {
//     const iconTl = new TimelineMax();
//     iconTl
//       .addLabel("clearIcons")
//       .to(
//         openButton,
//         0.3,
//         {
//           opacity: 0,
//           onComplete: function() {
//             tag.classList.add("is-pressed");
//           }
//         },
//         "clearIcons"
//       )
//       .to(introSpeakers[0], 0.3, { opacity: 0 }, "clearIcons")
//       .to(".icons-container", 0.8, {
//         bottom: 0,
//         display: "block",
//         onComplete: function() {
//           mFooter.style.display = "block";
//         }
//       });
//   };

//   let desktopIntro = new TimelineMax();

//   desktopIntro
//     .from(desktopTag, 1, { yPercent: -100, ease: Power4.easeOut })
//     .from(buttonDesktop, 0.3, {
//       opacity: 0
//     })
//     .from(introSpeakers[1], 0.4, { opacity: 0 });

//   buttonDesktop.onclick = () => {
//     const treeTl = new TimelineMax();
//     treeTl
//       .addLabel("clearIcons")
//       .to(
//         buttonDesktop,
//         0.3,
//         {
//           opacity: 0
//         },
//         "clearIcons"
//       )
//       .to(introSpeakers[1], 0.3, { opacity: 0 }, "clearIcons")
//       .to(
//         desktopTag,
//         0.8,
//         {
//           height: 0
//         },
//         "desktopPrep"
//       )
//       .to(
//         ".tree-container",
//         0.8,
//         {
//           bottom: 0,
//           display: "block",
//           onStart: randomScale,
//           onComplete: function() {
//             desktopFooter.style.display = "block";
//           }
//         },
//         "desktopPrep"
//       );
//   };

//   // Play music and change icon when speaker div is clicked
//   for (let i = 0; i < introSpeakers.length; i++) {
//     const speaker = introSpeakers[i];
//     speaker.onclick = () => {
//       if (isPlaying) {
//         song.pause();
//         speaker.children[0].src = "img/volume-on.svg";
//         isPlaying = false;
//         updateSpeakers();
//         return;
//       }
//       song.play();
//       speaker.children[0].src = "img/volume-off.svg";
//       isPlaying = true;
//       updateSpeakers();
//     };
//   }

//   for (let i = 0; i < contentSpeakers.length; i++) {
//     const speaker = contentSpeakers[i];
//     speaker.onclick = () => {
//       if (isPlaying) {
//         song.pause();
//         isPlaying = false;
//         updateSpeakers();
//         return;
//       }
//       song.play();
//       isPlaying = true;
//       updateSpeakers();
//     };
//   }

//   // // Desktop Intro Animations
//   // const controller = new ScrollMagic.Controller();

//   // const tagTween = TweenMax.to(desktopTag, 0.5, {
//   //   scale: 0.2,
//   //   transformOrigin: "center top"
//   // });

//   // const scene = new ScrollMagic.Scene({
//   //   triggerElement: "#trigger1",
//   //   triggerHook: "onLeave",
//   //   duration: "100%"
//   // })
//   //   .setTween(tagTween)
//   //   // .setPin(desktopTag)
//   //   .addTo(controller);

//   // Hide all pictures and captions in lightbox
//   for (let i = 0; i < lbImages.length; i++) {
//     const image = lbImages[i];
//     const snippet = snippets[i];
//     image.style.display = "none";
//     snippet.style.display = "none";
//   }

//   // Add eventListener for every icon
//   for (let i = 0; i < icons.length; i++) {
//     icons[i].onclick = () => openLightbox(i);
//   }

//   close.onclick = () => {
//     closeLightbox();
//   };

//   // Add eventListener to all gifts on tree
//   for (let i = 0; i < gifts.length; i++) {
//     const gift = gifts[i];
//     gift.onclick = () => {
//       isAnimating = true;
//       const clone = cloneOnTop(gift);
//       document.body.appendChild(clone);
//       zoomEffect(clone);
//     };
//   }
// };

// function updateSpeakers() {
//   if (isPlaying) {
//     for (let i = 0; i < contentSpeakers.length; i++) {
//       const speaker = contentSpeakers[i];
//       speaker.children[0].src = "img/volume-off.svg";
//     }
//     return;
//   }
//   for (let i = 0; i < contentSpeakers.length; i++) {
//     const speaker = contentSpeakers[i];
//     speaker.children[0].src = "img/volume-on.svg";
//   }
// }

// function openLightbox(index) {
//   if (lbOpen) {
//     return;
//   }
//   lbOpen = true;
//   current = index;
//   let tl = new TimelineMax();
//   tl.to(icons[index], 0.2, { y: -20, ease: Power2.easeOut })
//     .to(icons[index], 0.3, {
//       y: 0,
//       ease: Bounce.easeOut,
//       onComplete: function() {
//         lightbox.classList.remove("is-hidden");
//         lightbox.classList.add("is-visible");
//         lbImages[index].style.display = "block";
//         snippets[index].style.display = "block";
//         close.style.display = "block";
//       }
//     })
//     .addLabel("lbAnimation")
//     .from(
//       lbImages[index],
//       0.6,
//       { yPercent: -150, opacity: 0, delay: 0.2 },
//       "lbAnimation"
//     )
//     .from(
//       snippets[index],
//       0.6,
//       { yPercent: 300, opacity: 0, delay: 0.2 },
//       "lbAnimation"
//     )
//     .from(close, 0.3, { opacity: 0, scale: 0.5, rotation: -80 });
// }

// function closeLightbox() {
//   lightbox.classList.remove("is-visible");
//   lightbox.classList.add("is-hidden");
//   lbImages[current].style.display = "none";
//   snippets[current].style.display = "none";
//   close.style.display = "none";
//   current = null;
//   lbOpen = false;
// }

// function randomScale() {
//   const randomArray = [gifts.length];
//   for (let i = 0; i < gifts.length; i++) {
//     randomArray[i] = Math.floor(Math.random() * gifts.length);
//     for (let j = 0; j < i; j++) {
//       if (randomArray[i] === randomArray[j]) {
//         i--;
//         break;
//       }
//     }
//   }

//   const scaleTl = new TimelineMax();

//   for (let k = 0; k < randomArray.length; k++) {
//     const randomNum = randomArray[k];
//     scaleTl.from(gifts[randomNum], 0.15, { scale: 0 });
//   }
// }

// function cloneOnTop(el) {
//   const box = el.getBoundingClientRect();
//   const clone = el.cloneNode(true);
//   clone.style.width = `${box.width}px`;
//   clone.style.height = `${box.height}px`;
//   clone.style.top = box.top + "px";
//   clone.style.left = box.left + "px";
//   clone.classList.add("clone");
//   return clone;
// }

// function zoomEffect(clone) {
//   overlay.style.display = "block";
//   addCloseButton(clone);
//   const tl = new TimelineMax({
//     paused: true,
//     reversed: true
//   });
//   const x = clone.offsetLeft;
//   const y = clone.offsetTop;
//   const cy = y + clone.offsetHeight / 2;
//   const ratio = (0.65 * window.innerWidth) / (clone.offsetWidth * 2);

//   const text = clone.querySelector("p");
//   const faces = clone.querySelectorAll(".face");
//   tl.addLabel("openCard")
//     .to(
//       clone,
//       0.8,
//       {
//         x: xCenter - x,
//         y: yCenter - cy,
//         scale: ratio,
//         ease: Power4.easeOut
//       },
//       "openCard"
//     )
//     .to([faces[0], faces[1]], 0.2, { rotationY: -165 }, "openCard")
//     .addLabel("finishingTouches")
//     .to(text, 0.3, { opacity: 1 }, "finishingTouches")
//     .from(
//       clone.children[0],
//       0.3,
//       { opacity: 0, scale: 0, rotation: -80 },
//       "finishingTouches"
//     );

//   tl.play().timeScale(1);
//   disableScroll();
//   isAnimating = false;

//   clone.onclick = () => {
//     zoomBack(clone, x, y, faces);
//   };
// }

// function removeClones() {
//   overlay.style.display = "none";
//   const clones = document.querySelectorAll(".clone");
//   for (let i = 0; i < clones.length; i++) {
//     const clone = clones[i];
//     document.body.removeChild(clone);
//   }
// }

// function addCloseButton(clone) {
//   const cross = document.createElement("span");
//   cross.className = "exit";
//   clone.insertBefore(cross, clone.firstChild);
// }

// function zoomBack(clone, xPos, yPos, facesArray) {
//   const xMove = xPos - clone.offsetLeft;
//   const yMove = yPos - clone.offsetTop;
//   if (isAnimating) {
//     return;
//   }
//   const cloneTl = new TimelineMax();
//   cloneTl
//     .addLabel("closeCard")
//     .to(clone.children[0], 0.2, { opacity: 0 })
//     .to([facesArray[0], facesArray[1]], 0.2, { rotationY: 0 }, "closeCard")
//     .to(
//       clone,
//       0.6,
//       {
//         x: xMove,
//         y: yMove,
//         scale: 1,
//         ease: Power4.easeOut,
//         onComplete: function() {
//           removeClones();
//           enableScroll();
//         }
//       },
//       "closeCard"
//     );
// }

// function disableScroll() {
//   window.addEventListener("DOMMouseScroll", preventDefaultScroll, false);
//   window.onwheel = preventDefaultScroll;
// }

// function enableScroll() {
//   window.removeEventListener("DOMMouseScroll", preventDefaultScroll, false);
//   window.onwheel = null;
// }

// function preventDefaultScroll(e) {
//   e = e || window.event;
//   e.preventDefault();
//   e.returnValue = false;
// }

"use strict";

/* INTRO VARS */
var loader = document.querySelector(".loader");

/* VARS USED IN INTRO */
var tag = document.querySelector(".tag");
var openButton = document.querySelector(".open-button");

/* VARS USED IN MOBILE EXPERIENCE */
var lightbox = document.querySelector(".lightbox");
var icons = document.querySelectorAll(".icon");
var lbImages = document.querySelectorAll(".img-container");
var snippets = document.querySelectorAll(".snippet");
var close = document.querySelector(".lb-close");
var mFooter = document.querySelector(".mobile-footer");
var snowContainer = document.querySelector(".snow-container");
var iconsContainer = document.querySelector(".icons-container");

/* VARS USED IN DESKTOP EXPERIENCE */
var desktopTag = document.querySelector(".desktop-tag");
var buttonDesktop = document.querySelector(".desktop-open-button");
var gifts = document.querySelectorAll(".gift");
var overlay = document.querySelector(".invisible");
var desktopFooter = document.querySelector(".desktop-footer");
var boxes = document.querySelectorAll(".gift, .box");
var treeContainer = document.querySelector(".tree-container");

/* AUDIO HANDLING */
//var introSpeakers = document.querySelectorAll(".intro-volume");
var contentSpeakers = document.querySelectorAll(".content-speaker");
var song = document.querySelector(".song");

/* CENTER OF WINDOW */
var xCenter = window.innerWidth / 2;
var yCenter = window.pageYOffset + window.innerHeight / 2;

var lbOpen = false;
var current = null;

var isAnimating = false;
var isPlaying = false;

var cardOpen = false;

// Refresh page if window resize reaches below 1025px and handle visible mobile footer
window.onresize = function() {
  xCenter = window.innerWidth / 2;
  yCenter = window.innerHeight / 2;

  if (window.innerWidth > 1024 && lbOpen) {
    closeLightbox();
  }
  if (window.innerWidth < 1025 && cardOpen) {
    removeClones();
    cardOpen = false;
    enableScroll();
  }

  if (cardOpen) {
    var centerClone = document.querySelector(".clone");
    TweenMax.set(centerClone, {
      x: xCenter - centerClone.offsetLeft,
      y: yCenter - (centerClone.offsetTop + centerClone.offsetHeight / 2)
    });
  }
};

// Event Listener for Page Visibility
document.addEventListener(
  "visibilitychange",
  function() {
    if (document.hidden) {
      song.pause();
    } else {
      song.play();
    }
  },
  false
);

// Event Listener for when the audio is playing
song.addEventListener(
  "playing",
  function() {
    isPlaying = true;
    updateSpeakers();
  },
  false
);

// Event Listener for when the audio is paused
song.addEventListener(
  "pause",
  function() {
    isPlaying = false;
    updateSpeakers();
  },
  false
);

// Event Listener for error with the audio playback
song.onerror = function() {
  console.log("Error " + song.error.code + "; details: " + song.error.message);
  isPlaying = false;
};

window.onload = function() {
  // Remove loader when page is loaded
  TweenMax.to(loader, 0.7, {
    opacity: 0,
    onComplete: function onComplete() {
      loader.style.display = "none";
    }
  });
  // Mobile Intro animations
  // TODO: Combine these two intro animations into one universal

  var introTl = new TimelineMax();

  introTl
    .from(tag, 1, { yPercent: -100, ease: Power4.easeOut })
    .from(openButton, 0.4, { opacity: 0 });
  // .from(introSpeakers[0], 0.4, { opacity: 0 });

  openButton.onclick = function() {
    song.play();
    gtag("event", "Start Animation");
    var iconTl = new TimelineMax();
    iconTl
      .addLabel("clearIcons")
      .to(
        openButton,
        0.3,
        {
          opacity: 0,
          onComplete: function onComplete() {
            tag.classList.add("is-pressed");
          }
        },
        "clearIcons"
      )
      // .to(introSpeakers[0], 0.3, { opacity: 0 }, "clearIcons")
      .to(".snow-container", 0.8, {
        bottom: 0,
        display: "block",
        onStart: function() {
          if (window.innerWidth > 1024) {
            randomScale();
          }
        },
        onComplete: function onComplete() {
          mFooter.style.display = "block";
        }
      });
  };

  // var desktopIntro = new TimelineMax();

  // desktopIntro
  //   .from(desktopTag, 1, { yPercent: -100, ease: Power4.easeOut })
  //   .from(buttonDesktop, 0.3, {
  //     opacity: 0
  //   });
  // // .from(introSpeakers[1], 0.4, { opacity: 0 });

  // buttonDesktop.onclick = function() {
  //   song.play();
  //   gtag("event", "Start Animation");
  //   var treeTl = new TimelineMax();
  //   treeTl
  //     .addLabel("clearIcons")
  //     .to(
  //       buttonDesktop,
  //       0.3,
  //       {
  //         opacity: 0
  //       },
  //       "clearIcons"
  //     )
  //     // .to(introSpeakers[1], 0.3, { opacity: 0 }, "clearIcons")
  //     .to(
  //       desktopTag,
  //       0.8,
  //       {
  //         height: 0
  //       },
  //       "desktopPrep"
  //     )
  //     .to(
  //       ".tree-container",
  //       0.8,
  //       {
  //         bottom: 0,
  //         display: "block",
  //         onStart: randomScale,
  //         onComplete: function onComplete() {
  //           desktopFooter.style.display = "block";
  //         }
  //       },
  //       "desktopPrep"
  //     );
  // };

  // Play music and change icon when speaker div is clicked

  // var _loop = function _loop(i) {
  //   var speaker = introSpeakers[i];
  //   speaker.onclick = function() {
  //     if (isPlaying) {
  //       song.pause();
  //       speaker.children[0].src =
  //         "/wp-content/themes/andersonmg/assets/img/christmas/volume-off.svg";
  //       isPlaying = false;
  //       updateSpeakers();
  //       return;
  //     }
  //     song.play();
  //     speaker.children[0].src =
  //       "/wp-content/themes/andersonmg/assets/img/christmas/volume-on.svg";
  //     isPlaying = true;
  //     updateSpeakers();
  //   };
  // };

  // for (var i = 0; i < introSpeakers.length; i++) {
  //   _loop(i);
  // }

  for (var i = 0; i < contentSpeakers.length; i++) {
    var _speaker = contentSpeakers[i];
    _speaker.onclick = function() {
      if (isPlaying) {
        song.pause();
        return;
      }
      song.play();
    };
  }

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
  for (var _i = 0; _i < lbImages.length; _i++) {
    var image = lbImages[_i];
    var snippet = snippets[_i];
    image.style.display = "none";
    snippet.style.display = "none";
  }

  // Add eventListener for every icon

  var _loop2 = function _loop2(_i2) {
    icons[_i2].onclick = function() {
      return openLightbox(_i2);
    };
  };

  for (var _i2 = 0; _i2 < icons.length; _i2++) {
    _loop2(_i2);
  }

  close.onclick = function() {
    closeLightbox();
  };

  // Add eventListener to all gifts on tree

  var _loop3 = function _loop3(_i3) {
    var gift = gifts[_i3];
    gift.onclick = function() {
      isAnimating = true;
      cardOpen = true;
      var clone = cloneOnTop(gift);
      snowContainer.appendChild(clone);
      zoomEffect(clone);
    };
  };

  for (var _i3 = 0; _i3 < gifts.length; _i3++) {
    _loop3(_i3);
  }
};

function updateSpeakers() {
  if (isPlaying) {
    for (var i = 0; i < contentSpeakers.length; i++) {
      var _speaker2 = contentSpeakers[i];
      _speaker2.children[0].src = "./assets/img/christmas/volume-on.svg";
    }
    return;
  }
  for (var _i4 = 0; _i4 < contentSpeakers.length; _i4++) {
    var _speaker3 = contentSpeakers[_i4];
    _speaker3.children[0].src = "./assets/img/christmas/volume-off.svg";
  }
}

function openLightbox(index) {
  if (lbOpen) {
    return;
  }
  lbOpen = true;
  current = index;
  var tl = new TimelineMax();
  tl.to(icons[index], 0.2, { y: -20, ease: Power2.easeOut })
    .to(icons[index], 0.3, {
      y: 0,
      ease: Bounce.easeOut,
      onComplete: function onComplete() {
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
    .from(close, 0.3, { opacity: 0, scale: 0.5, rotation: -80 });
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
  var randomArray = [boxes.length];
  for (var i = 0; i < boxes.length; i++) {
    randomArray[i] = Math.floor(Math.random() * boxes.length);
    for (var j = 0; j < i; j++) {
      if (randomArray[i] === randomArray[j]) {
        i--;
        break;
      }
    }
  }

  var scaleTl = new TimelineMax();

  for (var k = 0; k < randomArray.length; k++) {
    var randomNum = randomArray[k];
    scaleTl.from(boxes[randomNum], 0.15, { scale: 0 });
  }
}

function cloneOnTop(el) {
  var box = el.getBoundingClientRect();
  var clone = el.cloneNode(true);
  // clone.style.width = box.width + "px";
  // clone.style.height = box.height + "px";
  clone.style.top = box.top + "px";
  clone.style.left = box.left + "px";
  clone.classList.add("clone");
  return clone;
}

function zoomEffect(clone) {
  overlay.style.display = "block";
  TweenMax.set(clone, {
    scale:
      window.innerHeight / 10 > 90
        ? 90 / clone.offsetWidth
        : window.innerHeight / 10 / clone.offsetWidth
  });
  addCloseButton(clone);
  var tl = new TimelineMax({
    paused: true,
    reversed: true
  });
  var x = clone.offsetLeft;
  var y = clone.offsetTop;
  var cy = y + clone.offsetHeight / 2;
  var ratio = (0.65 * window.innerWidth) / (clone.offsetWidth * 2);

  var text = clone.querySelector("p");
  var faces = clone.querySelectorAll(".face");
  tl.addLabel("openCard")
    .to(
      clone,
      0.8,
      {
        x: xCenter - x,
        y: yCenter - cy,
        ease: Power4.easeOut,
        scale: 1,
        zIndex: 7
      },
      "openCard"
    )
    .to([faces[0], faces[1]], 0.2, { rotationY: -179 }, "openCard")
    .addLabel("finishingTouches")
    .to(text, 0.3, { opacity: 1 }, "finishingTouches")
    .from(
      clone.children[0],
      0.3,
      { opacity: 0, scale: 0, rotation: -80 },
      "finishingTouches"
    );

  tl.play().timeScale(1);
  disableScroll();
  isAnimating = false;

  clone.onclick = function() {
    zoomBack(clone, x, y, faces);
  };
}

function removeClones() {
  overlay.style.display = "none";
  var clones = document.querySelectorAll(".clone");
  for (var i = 0; i < clones.length; i++) {
    var clone = clones[i];
    snowContainer.removeChild(clone);
  }
}

function addCloseButton(clone) {
  var cross = document.createElement("span");
  cross.className = "exit";
  clone.insertBefore(cross, clone.firstChild);
}

function zoomBack(clone, xPos, yPos, facesArray) {
  var xMove = xPos - clone.offsetLeft;
  var yMove = yPos - clone.offsetTop;
  if (isAnimating) {
    return;
  }
  var cloneTl = new TimelineMax();
  cloneTl
    .addLabel("closeCard")
    .to(clone.children[0], 0.2, { opacity: 0 })
    .to([facesArray[0], facesArray[1]], 0.2, { rotationY: 0 }, "closeCard")
    .to(
      clone,
      0.6,
      {
        x: xMove,
        y: yMove,
        scale:
          window.innerHeight / 10 > 90
            ? 90 / clone.offsetWidth
            : window.innerHeight / 10 / clone.offsetWidth,
        ease: Power4.easeOut,
        onComplete: function onComplete() {
          removeClones();
          cardOpen = false;
          enableScroll();
        }
      },
      "closeCard"
    );
}

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefaultScroll, false);
  window.onwheel = preventDefaultScroll;
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefaultScroll, false);
  window.onwheel = null;
}

function preventDefaultScroll(e) {
  e = e || window.event;
  e.preventDefault();
  e.returnValue = false;
}
