const body = document.querySelector('body');
const lightbox = document.querySelector('.lightbox');
const icons = document.querySelectorAll('.icon');
const lbImages = document.querySelectorAll('.img-container');
const snippets = document.querySelectorAll('.snippet');
const close = document.querySelector('.lb-close');
const cards = document.querySelectorAll('.card');

let lbOpen = false;
let current = null;


window.onload = () => {
    for (let i = 0; i < lbImages.length; i++) {
        const image = lbImages[i];
        const snippet = snippets[i];
        image.style.display = 'none';
        snippet.style.display = 'none';
    }

    for (let i = 0; i < icons.length; i++) {
        icons[i].onclick = () => openLightbox(i);
    }

    close.onclick = () => {
        closeLightbox();
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
