window.navHTML = `
<div class="max-w-[1200px] mx-auto px-6 lg:px-12 flex justify-between items-center h-16 relative">
    <!-- Left: Logo -->
    <div class="flex items-center">
        <a href="index.html"
            class="font-bold tracking-widest text-lg sm:text-xl font-mono hover:text-baccent transition-colors"
            aria-label="Voltar ao início">[ LBB ]</a>
    </div>

    <!-- Center: Links (Desktop) -->
    <div
        class="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-bold text-sm tracking-widest uppercase">
        <a href="index.html" class="nav-link text-btext hover:text-white transition-colors py-1"
            data-i18n="nav_home">HOME</a>
        <a href="projetos.html" class="nav-link text-btext hover:text-white transition-colors py-1"
            data-i18n="nav_projects">PROJETOS</a>
        <a href="curriculo.html" class="nav-link text-btext hover:text-white transition-colors py-1"
            data-i18n="nav_resume">CURRÍCULO</a>
    </div>

    <!-- Mobile: Links -->
    <div
        class="flex lg:hidden items-center gap-4 font-bold text-xs sm:text-sm uppercase tracking-wider ml-auto mr-4 sm:mr-6">
        <a href="index.html" class="nav-link text-btext hover:text-white transition-colors" data-i18n="nav_home">HOME</a>
        <a href="projetos.html" class="nav-link text-btext hover:text-white transition-colors"
            data-i18n="nav_projects">PROJ</a>
        <a href="curriculo.html" class="nav-link text-btext hover:text-white transition-colors"
            data-i18n="nav_resume">CV</a>
    </div>

    <!-- Right: Toggles -->
    <div
        class="flex items-center gap-3 sm:gap-4 border-l-2 border-btext border-opacity-30 pl-3 sm:pl-4 relative z-10">
        <button id="theme-toggle" class="hover:text-white transition-colors focus:outline-none"
            aria-label="Alternar tema">
            <svg class="w-5 h-5 theme-icon-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                </path>
            </svg>
            <svg class="w-5 h-5 theme-icon-light hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
            </svg>
        </button>
        <div class="flex items-center gap-1 text-xs font-mono font-bold">
            <button class="lang-btn hover:text-white transition-colors" data-lang="pt">PT</button>
            <span class="opacity-30">|</span>
            <button class="lang-btn hover:text-white transition-colors opacity-50" data-lang="en">EN</button>
            <span class="opacity-30">|</span>
            <button class="lang-btn hover:text-white transition-colors opacity-50" data-lang="es">ES</button>
        </div>
    </div>
</div>
`;

window.footerHTML = `
<p class="opacity-70 text-sm text-center md:text-left font-mono">
    &copy; 2026 <strong class="text-btext opacity-100">Leonardo Barbosa Burgomeister</strong>
</p>
<div class="flex gap-6">
    <a href="https://www.linkedin.com/in/leoburgomeister/" target="_blank" rel="noopener noreferrer"
        class="font-bold text-sm uppercase hover:text-white transition-colors tracking-wider"
        aria-label="Visitar LinkedIn">LinkedIn ↗</a>
    <a href="https://github.com/leoburgomeister" target="_blank" rel="noopener noreferrer"
        class="font-bold text-sm uppercase hover:text-white transition-colors tracking-wider"
        aria-label="Visitar Github">Github ↗</a>
</div>
`;
