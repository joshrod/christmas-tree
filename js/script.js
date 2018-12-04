const lightbox = document.querySelector('.lightbox');
const cards = document.querySelectorAll('.card');
const lbImages = document.querySelectorAll('.img-container');
const snippets = document.querySelectorAll('.snippet');


window.onload = () => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = () => openLightbox();
    }
}

function openLightbox() {
    lightbox.classList.remove('is-hidden');
    lightbox.classList.add('is-visible');

    TweenMax.from(lbImages[0], 0.8, {yPercent: -150, opacity: 0, delay: 0.2});
    TweenMax.from(snippets[0], 0.8, {yPercent: 300, opacity: 0, delay: 0.2});
}
