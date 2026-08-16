document.addEventListener('DOMContentLoaded', () => {
    // Կարուսելի թերթելու ֆունկցիա
    window.scrollCarousel = function(direction) {
        const container = document.getElementById('carouselContainer');
        if (!container) return;
        const scrollAmount = 350; // Թերթելու չափը պիքսելներով
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const watchesBtn = document.getElementById("watches-btn");
    const watchesMenu = document.getElementById("watches-menu");

    if (watchesBtn && watchesMenu) {
        watchesBtn.addEventListener("click", (e) => {
            e.preventDefault();
            watchesMenu.classList.toggle("active");
        });

        // Եթե սեղմենք էջի այլ հատվածում, մենյուն կփակվի
        document.addEventListener("click", (e) => {
            if (!watchesBtn.contains(e.target) && !watchesMenu.contains(e.target)) {
                watchesMenu.classList.remove("active");
            }
        });
    }
});