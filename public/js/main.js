document.addEventListener('DOMContentLoaded', () => {

    const watchesBtn = document.getElementById('watches-btn');
    const watchesMenu = document.getElementById('watches-menu');

    const collectionsBtn = document.getElementById('collections-btn');
    const collectionsMenu = document.getElementById('collections-menu');

    const colabsBtn = document.getElementById('colabs-btn');
    const colabsMenu = document.getElementById('colabs-menu');

    const atelierBtn = document.getElementById('atelier-btn');
    const atelierMenu = document.getElementById('atelier-menu');

    const navbar = document.querySelector('.navbar');


    // Բոլոր մենյուները փակելու և նկարը զրոյացնելու ֆունկցիա
    function closeAllMenus() {
        if (watchesMenu) {
            watchesMenu.style.display = 'none';
        }
        if (collectionsMenu) {
            collectionsMenu.style.display = 'none';
        }
        if (colabsMenu) {
            colabsMenu.style.display = 'none';
        }
        if (atelierMenu) {
            atelierMenu.style.display = 'none';
        }
        if (atelierBtn) {
            atelierBtn.classList.remove('active');
        }
        if (navbar) {
            navbar.classList.remove('navbar-dark-mode');
        }
        // Մենյուն փակվելիս նկարն էլ ենք թաքցնում
        const hoverImage = document.getElementById('hover-image');
        if (hoverImage) {
            hoverImage.style.display = 'none';
            hoverImage.src = '';
        }
    }

    // =========================
    // WATCHES
    // =========================
    if (watchesBtn && watchesMenu) {
        watchesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = watchesMenu.style.display === 'block';
            closeAllMenus();
            if (!isOpen) {
                watchesMenu.style.display = 'block';
            }
        });
    }

    // =========================
    // COLLECTIONS
    // =========================

    if (collectionsBtn && collectionsMenu) {
        collectionsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = collectionsMenu.style.display === 'block';
            closeAllMenus();
            if (!isOpen) {
                collectionsMenu.style.display = 'block';
            }
        });
    }

    // =========================
    // COLLECTIONS - ՀԱՎԱՔԱԾՈՒՆԵՐԻ ՆԿԱՐՆԵՐԻ ԿԱՌԱՎԱՐՈՒՄ
    // =========================
    const colLinks = document.querySelectorAll('.col-link');
    const hoverImage = document.getElementById('hover-image');

    colLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const imgSrc = link.getAttribute('data-image');
            if (imgSrc && hoverImage) {
                hoverImage.src = imgSrc;
                hoverImage.style.display = 'block'; // Ցույց է տալիս նկարը
            }
        });
    });

    // Եթե մկնիկը դուրս գա Collections մենյուից՝ նկարը թաքցնել
    if (collectionsMenu && hoverImage) {
        collectionsMenu.addEventListener('mouseleave', () => {
            hoverImage.style.display = 'none';
            hoverImage.src = '';
        });
    }

    // =========================
    // CO_LABS
    // =========================
    if (colabsBtn && colabsMenu) {
        colabsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = colabsMenu.style.display === 'block';
            closeAllMenus();
            if (!isOpen) {
                colabsMenu.style.display = 'block';
            }
        });
    }


    // =========================
    // ATELIER
    // =========================
    if (atelierBtn && atelierMenu) {
        atelierBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isOpen =
                atelierMenu.style.display === 'block' ||
                atelierMenu.style.display === 'flex';
            closeAllMenus();
            if (!isOpen) {
                atelierMenu.style.display = 'flex';
                atelierBtn.classList.add('active');
                if (navbar) {
                    navbar.classList.add('navbar-dark-mode');
                }
            }
        });
    }

    // =========================
    // ԷԿՐԱՆԻ ԱՅԼ ՀԱՏՎԱԾՈՒՄ ՍԵՂՄԵԼ
    // =========================
    document.addEventListener('click', (e) => {
        if (
            watchesBtn &&
            watchesMenu &&
            (
                watchesBtn.contains(e.target) ||
                watchesMenu.contains(e.target)
            )
        ) {
            return;
        }
        if (
            collectionsBtn &&
            collectionsMenu &&
            (
                collectionsBtn.contains(e.target) ||
                collectionsMenu.contains(e.target)
            )
        ) {
            return;
        }
        if (
            colabsBtn &&
            colabsMenu &&
            (
                colabsBtn.contains(e.target) ||
                colabsMenu.contains(e.target)
            )
        ) {
            return;
        }

        if (
            atelierBtn &&
            atelierMenu &&
            (
                atelierBtn.contains(e.target) ||
                atelierMenu.contains(e.target)
            )
        ) {
            return;
        }
        closeAllMenus();
    });

});

// =========================
// AUTH MODAL
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById("authModal");
    const closeAuthModal = document.getElementById("closeAuthModal");
    const tabBtns = document.querySelectorAll(".auth-tab-btn");
    const forms = document.querySelectorAll(".auth-form");
    const openTrigger = document.querySelector(".fa-user") || document.querySelector(".nav-right a:nth-child(2)");

    if (authModal) {
        authModal.classList.add("active");
    }

    if (openTrigger) {
        openTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            authModal.classList.add("active");
        });
    }

    if (closeAuthModal) {
        closeAuthModal.addEventListener("click", () => {
            authModal.classList.remove("active");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === authModal) {
            authModal.classList.remove("active");
        }
    });

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            forms.forEach(f => f.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active");
        });
    });
});

// =========================
// HAMBURGER MOBILE MENU
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinksContainer = document.getElementById('nav-links-container');

    if (hamburgerMenu && navLinksContainer) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('open');
            navLinksContainer.classList.toggle('active');
        });
    }
});