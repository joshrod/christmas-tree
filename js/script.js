/* VARS USED IN MOBILE EXPERIENCE */
const lightbox = document.querySelector('.lightbox');
const icons = document.querySelectorAll('.icon');
const lbImages = document.querySelectorAll('.img-container');
const snippets = document.querySelectorAll('.snippet');
const close = document.querySelector('.lb-close');

/* VARS USED IN DESKTOP EXPERIENCE */
const gifts = document.querySelectorAll('.gift');

/* CENTER OF WINDOW */
let xCenter = window.innerWidth / 2;
let yCenter = window.innerHeight / 2;

let lbOpen = false;
let current = null;


window.onload = () => {

    // Hide all pictures and captions in lightbox
    for (let i = 0; i < lbImages.length; i++) {
        const image = lbImages[i];
        const snippet = snippets[i];
        image.style.display = 'none';
        snippet.style.display = 'none';
    }

    // Add eventListener for every icon
    for (let i = 0; i < icons.length; i++) {
        icons[i].onclick = () => openLightbox(i);
    }
    
    close.onclick = () => {
        closeLightbox();
    }

    for (let i = 0; i < gifts.length; i++) {
        const gift = gifts[i];
        gift.onclick = () => {
            const clone = cloneOnTop(gift);
            document.body.appendChild(clone);
            gift.style.visibility = 'hidden';
            zoomEffect(clone);

            /* TODO: Move faces to the zoomEffect function */
            
            const faces = clone.querySelectorAll('.face');
            for (let j = 0; j < 2; j++) {
                const face = faces[j];
                TweenMax.to(face, 0.2, {rotationY: -165});
            }

        //     console.log('gift' + i + 'clicked');
        //     e.preventDefault();
        //     const clone = cloneOnTop(gift);
        //     console.log(clone.children[0]);
        //     document.body.appendChild(clone);
        //     // clone.children[0].checked = true;
        //     zoomEffect(clone);
        }
    }
}

function openLightbox(index) {
    if (lbOpen) {
        return;
    }
    lbOpen = true;
    current = index;
    let tl = new TimelineMax();
    tl.to(icons[index], 0.2, {y: -20, ease:Power2.easeOut}).to(icons[index], 0.3, {y: 0, ease: Bounce.easeOut, onComplete: function() {
        lightbox.classList.remove('is-hidden');
        lightbox.classList.add('is-visible');
        lbImages[index].style.display = 'block';
        snippets[index].style.display = 'block';
        close.style.display = 'block';
    }})
    .addLabel('lbAnimation')
    .from(lbImages[index], 0.6, {yPercent: -150, opacity: 0, delay: 0.2}, 'lbAnimation')
    .from(snippets[index], 0.6, {yPercent: 300, opacity: 0, delay: 0.2}, 'lbAnimation')
    .from(close, 0.3, {opacity: 0, scale: 0.5});
}

function closeLightbox() {
    lightbox.classList.remove('is-visible');
    lightbox.classList.add('is-hidden');
    lbImages[current].style.display = 'none';
    snippets[current].style.display = 'none';
    close.style.display = 'none';
    current = null;
    lbOpen = false;
}

function cloneOnTop(el) {
    const box = el.getBoundingClientRect();
    const clone = el.cloneNode(true);
    clone.style.width = `${box.width}px`;
    clone.style.height = `${box.height}px`;
    clone.style.top = box.top + 'px';
    clone.style.left = box.left + 'px';
    clone.classList.add('clone');
    return clone;
}

function zoomEffect(element) {
    const tl = new TimelineMax();
    const x = element.offsetLeft;
    const y = element.offsetTop;
    const cy = y + (element.offsetHeight / 2);
    const ratio = (0.65 * window.innerWidth) / (element.offsetWidth * 2) ;

    const text = element.querySelector('p');
    tl.addLabel('openCard')
    .to(element, 0.8, {x: xCenter - x, y: yCenter - cy, scale: ratio, ease: Power4.easeOut})
    .to(text, 0.5, {opacity: 1});
}
