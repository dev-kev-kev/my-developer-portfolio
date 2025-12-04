document.addEventListener('DOMContentLoaded', () => {
    // 1. Hole das HTML-Element des Schalters und des Body-Tags
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 2. Rufe die gespeicherte Theme-Einstellung (aus dem Browser-Speicher) ab
    const savedTheme = localStorage.getItem('theme');

    // Funktion zum Umschalten des Themas
    const toggleTheme = () => {
        // Prüfe, ob der Body aktuell die Klasse 'dark-mode' hat
        const isDarkMode = body.classList.toggle('dark-mode');
        
        // Speichere die neue Einstellung im Browser
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️'; // Ändere Icon auf Sonne
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙'; // Ändere Icon auf Mond
        }
    };

    // Beim Laden der Seite: Wende das gespeicherte Thema an
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    } else {
        // Setze Standard auf Light Mode und Icon auf Mond
        themeToggle.innerHTML = '🌙';
    }

    // Beim Klick auf den Button: Schalte das Thema um
    themeToggle.addEventListener('click', toggleTheme);


    /* ----------------------------------------------------------------- */
    /* 4. Hamburger-Menü Verbesserung (JavaScript) */
    /* ----------------------------------------------------------------- */
    
    // Der CSS-Hack (Checkbox) ist gut, aber JS macht es besser!
    // Wir entfernen hier den CSS-Hack (Checkbox) und nutzen JS für die Logik.
    
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Füge einen Event Listener zum Hamburger Icon (dem Label) hinzu
        document.querySelector('.hamburger-icon').addEventListener('click', () => {
            navLinks.classList.toggle('menu-open');
        });

        // Schließe das Menü, wenn ein Link angeklickt wird (wichtig für UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('menu-open');
            });
        });
    }

});