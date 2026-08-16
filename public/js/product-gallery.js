document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('main-product-img');
    const galleryImages = document.querySelectorAll('.clickable-gallery-img');

    if (mainImg && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                mainImg.src = img.src;

                galleryImages.forEach(el => el.classList.remove('active-thumb'));
                img.classList.add('active-thumb');

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }
});