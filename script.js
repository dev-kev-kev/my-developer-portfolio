document.addEventListener('DOMContentLoaded', () => {
    // --- DARK MODE LOGIK ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    const toggleTheme = () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙';
        }
    };
    // Initiale Einstellung basierend auf gespeicherter Präferenz
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }

    themeToggle.addEventListener('click', toggleTheme);


    // --- HAMBURGER MENU LOGIK ---
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerIcon && navLinks) {
        // Öffnen/Schließen beim Klick auf das Icon
        hamburgerIcon.addEventListener('click', () => {
            navLinks.classList.toggle('menu-open');
        });

        // Schließen, wenn man auf einen Link klickt
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('menu-open');
            });
        });

        // Optional: Schließen, wenn man neben das Menü klickt (auf den Main Content)
        document.querySelector('main').addEventListener('click', () => {
             navLinks.classList.remove('menu-open');
        });
    }
    /* ----------------------------------------------------------------- */
    /* 5. Back to Top Button Logik */
    /* ----------------------------------------------------------------- */
    
    const backToTopButton = document.getElementById('back-to-top');

    // Funktion: Zeige Button nur, wenn man 300px gescrollt hat
    const toggleBackToTop = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    // Event Listener für das Scrollen
    window.addEventListener('scroll', toggleBackToTop);

    // Funktion: Beim Klick sanft nach oben scrollen
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Sanftes Scrollen
        });
    });

    // --- SPRACHUMSCHALTER LOGIK ---
    const langSwitch = document.getElementById('lang-switch');
    
    // Funktion zum Laden der Sprache
    const loadLanguage = async (lang) => {
        try {
            // 1. JSON fetchen
            const response = await fetch('languages.json');
            const data = await response.json();
            
            // 2. Alle Elemente mit data-i18n Attribut finden
            const elements = document.querySelectorAll('[data-i18n]');
            
            // 3. Text austauschen
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (data[lang] && data[lang][key]) {
                    el.textContent = data[lang][key];
                }
            });

            // 4. Button-Text im Dropdown anpassen (optional, falls nötig)
            
        } catch (error) {
            console.error('Fehler beim Laden der Sprache:', error);
        }
    };

    // Event Listener für den Schalter
    langSwitch.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        loadLanguage(selectedLang);
        // Speichern der Auswahl (optional)
        localStorage.setItem('preferredLang', selectedLang);
    });

    // Beim Laden der Seite prüfen, ob eine Sprache gespeichert war
    // NEU (Repariert):
    const savedLang = localStorage.getItem('preferredLang');
    const defaultLang = 'en'; // Standard ist Englisch

    // Entscheidung: Gespeicherte Sprache ODER Standard
    const langToLoad = savedLang || defaultLang;

    // Setze den Dropdown-Wert korrekt
    langSwitch.value = langToLoad;

    // Lade die Sprache SOFORT
    loadLanguage(langToLoad);
});