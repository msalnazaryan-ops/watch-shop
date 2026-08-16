document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById("authModal");
    const closeAuthModal = document.getElementById("closeAuthModal");
    const tabBtns = document.querySelectorAll(".auth-tab-btn");
    const forms = document.querySelectorAll(".auth-form");

    // Ստուգում ենք՝ արդյոք օգտատերն արդեն մուտք է գործել
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userName = localStorage.getItem("userName");

    if (isLoggedIn === "true") {
        if (authModal) {
            authModal.style.display = "none";
            authModal.classList.remove("active");
        }
        updateUserUI(userName);

        // Արգելափակում ենք մարդուկի կոճակը միայն այն ժամանակ, երբ ՄՈՒՏՔ Է ՄԱՐԴԸ
        const userIconBtn = document.getElementById("userDisplayContainer");
        if (userIconBtn) {
            userIconBtn.addEventListener("click", (e) => {
                if (e.target.id !== "logoutLink") {
                    e.stopImmediatePropagation();
                }
            }, true);
        }
    } else {
        // Եթե մուտք գործածՉԵՔ, թողնում ենք, որ մարդուկին սեղմելիս մոդալ պատուհանը բացվի
        const userIconBtn = document.getElementById("userDisplayContainer");
        if (userIconBtn && authModal) {
            userIconBtn.addEventListener("click", (e) => {
                e.preventDefault();
                authModal.style.display = "flex";
                authModal.classList.add("active");
            });
        }
    }

    // Փակել X կոճակով
    if (closeAuthModal) {
        closeAuthModal.addEventListener("click", () => {
            if (authModal) {
                authModal.classList.remove("active");
                authModal.style.display = "none";
            }
        });
    }

    // Tab-երի փոխարկում (Sign In / Register)
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            forms.forEach(f => f.classList.remove("active"));
            btn.classList.add("active");
            const targetEl = document.getElementById(btn.dataset.target);
            if (targetEl) {
                targetEl.classList.add("active");
            }
        });
    });

    // 1. Գրանցման ֆորմայի ուղարկումը (Register)
    const registerForm = document.getElementById("registerTab");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = registerForm.querySelectorAll("input");
            const name = inputs[0] ? inputs[0].value.trim() : "";
            const email = inputs[1] ? inputs[1].value.trim() : "";
            const password = inputs[2] ? inputs[2].value : "";

            if (name.length < 3 || password.length < 6) {
                alert("Լրացրեք տվյալները ճիշտ (անունը >= 3, պարոլը >= 6 նիշ):");
                return;
            }

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                if (response.ok) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userName", name);

                    if (authModal) {
                        authModal.classList.remove("active");
                        authModal.style.display = "none";
                    }
                    window.location.reload();
                } else {
                    const errorText = await response.text();
                    alert("Սխալ գրանցման ժամանակ: " + errorText);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Կապի սխալ սերվերի հետ:");
            }
        });
    }

    // 2. Մուտքի ֆորմայի ուղարկումը (Login)
    const loginForm = document.getElementById("loginTab");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = loginForm.querySelectorAll("input");
            const email = inputs[0] ? inputs[0].value.trim() : "";
            const password = inputs[1] ? inputs[1].value : "";

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    localStorage.setItem("isLoggedIn", "true");

                    const savedName = email.split('@')[0];
                    localStorage.setItem("userName", savedName);

                    if (authModal) {
                        authModal.classList.remove("active");
                        authModal.style.display = "none";
                    }
                    window.location.reload();
                } else {
                    const errorText = await response.text();
                    alert("Սխալ մուտքի ժամանակ: " + errorText);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Կապի սխալ սերվերի հետ:");
            }
        });
    }
});

function updateUserUI(userName) {
    const userContainer = document.getElementById("userDisplayContainer");

    if (userContainer) {
        const displayName = userName ? userName : "User";
        userContainer.innerHTML = `
            <i class="fa-regular fa-user"></i>
            <span class="nav-link" style="margin-left: 5px; font-weight: 500; font-size: 14px; display: inline-block;">${displayName}</span>
            <a href="#" id="logoutLink" class="nav-link" style="margin-left: 8px; font-size: 12px; text-decoration: none; display: inline-block;">Log out</a>
        `;

        const logoutLink = document.getElementById("logoutLink");
        if (logoutLink) {
            logoutLink.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
            });
        }
    }
}






