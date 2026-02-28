// Note: Data is accessed via window.translations, window.navHTML, window.footerHTML

document.addEventListener('DOMContentLoaded', () => {
    
    // ─── INJECT COMPONENTS ─────────────────────────────────────────────────
    const injectComponent = (selector, html) => {
        const el = document.querySelector(selector);
        if (el && html) el.innerHTML = html;
    };

    injectComponent('nav', window.navHTML);
    injectComponent('footer', window.footerHTML);

    // ─── INITIALIZE APP ────────────────────────────────────────────────────
    initLanguage();
    initTheme();
    initAnimations();
    initNavigation();
    initActiveNav();
    initProjects(); // Initialize Project Modal logic
});

// ─── LANGUAGE LOGIC ────────────────────────────────────────────────────────
function initLanguage() {
    let currentLang = localStorage.getItem('lang') || 'pt';

    const updateLanguage = (lang) => {
        const translations = window.translations;
        if (!translations || !translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang === 'en' ? 'en' : (lang === 'es' ? 'es' : 'pt-BR');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('opacity-50', btn.dataset.lang !== lang);
        });
    };

    updateLanguage(currentLang);

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            e.preventDefault();
            updateLanguage(btn.dataset.lang);
        }
    });
}

// ─── THEME LOGIC ───────────────────────────────────────────────────────────
function initTheme() {
    const updateIcon = (isLight) => {
        document.querySelector('.theme-icon-dark')?.classList.toggle('hidden', isLight);
        document.querySelector('.theme-icon-light')?.classList.toggle('hidden', !isLight);
    };

    const isLight = localStorage.getItem('theme') === 'light';
    if (isLight) document.documentElement.classList.add('light');
    updateIcon(isLight);

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#theme-toggle');
        if (btn) {
            const isLightNow = document.documentElement.classList.toggle('light');
            localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
            updateIcon(isLightNow);
        }
    });
}

// ─── ANIMATIONS ────────────────────────────────────────────────────────────
function initAnimations() {
    document.body.classList.add('page-ready');
    document.body.classList.remove('loading');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const cls = el.classList.contains('block-reveal') ? 'revealed' : 'visible';
                setTimeout(() => el.classList.add(cls), i * 120);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.stagger-item, .block-reveal, .brutal-fade').forEach(el => observer.observe(el));
}

// ─── NAVIGATION ────────────────────────────────────────────────────────────
function initNavigation() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link || link.target === '_blank' || link.classList.contains('lang-btn') || link.classList.contains('project-btn')) return;

        const href = link.getAttribute('href');
        if (href.startsWith('#') || href.startsWith('http')) return;

        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => window.location.href = href, 450);
    });

    document.getElementById('back-to-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initActiveNav() {
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href]').forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.classList.add('text-baccent', 'border-b-2', 'border-baccent', 'pointer-events-none');
        }
    });
}

// ─── PROJECTS MODAL LOGIC ──────────────────────────────────────────────────
function initProjects() {
    const projectData = {
        'whirlpool-pautas': {
            title: 'Sistema de Gerenciamento de Pautas',
            company: 'Whirlpool S.A.',
            year: '2023',
            role: 'UX Researcher / Process Designer',
            tags: ['Mapeamento de Processos', 'Business Case', 'Gestão de Mudança', 'Pipefy'],
            pt: {
                desc: '<p class="mb-5">Análise, pesquisa e implementação de sistema de gestão de pautas na área de Comunicação Institucional da Whirlpool, substituindo processos manuais por automação integrada.</p>',
                challenge: '<p class="mb-5 opacity-90">A área de Comunicação Institucional gerenciava todas as pautas, aprovações e disparos de conteúdo por meio de uma planilha Google Sheets com codificação manual de cores, sem automação, sem métricas e com informações descentralizadas — gerando retrabalho, atrasos e falta de visibilidade sobre o processo.</p>',
                solution: '<p class="mb-5 opacity-90">Mapeei o fluxo atual de trabalho, identifiquei gargalos e conduzi o business case para a adoção do Pipefy como plataforma de gestão. Implementei um pipe personalizado com board Kanban, formulários integrados de solicitação de pauta, automações de notificação e aprovação hierárquica, conectando agência, comunicação institucional e aprovadores em um único fluxo.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Aprovações de pautas automatizadas e rastreáveis por etapa</li>
                        <li class="pl-4 border-l-2 border-baccent">Visibilidade de indicadores antes inexistentes, como tempo médio de aprovação e prioridade</li>
                        <li class="pl-4 border-l-2 border-baccent">Eliminação de tarefas manuais e repetitivas da equipe</li>
                        <li class="pl-4 border-l-2 border-baccent">Padronização do processo de solicitação e publicação de conteúdo</li>
                    </ul>`
            },
            en: {
                desc: '<p class="mb-5">Analysis, research, and implementation of an agenda management system for Whirlpool\'s Institutional Communication department.</p>',
                challenge: '<p class="mb-5 opacity-90">The department managed all content through manual Google Sheets with color coding, lacking automation and metrics.</p>',
                solution: '<p class="mb-5 opacity-90">Mapped workflows, identified bottlenecks, and led the business case for Pipefy. Implemented a custom Kanban pipe with integrated forms.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Automated and stage-trackable approvals</li>
                        <li class="pl-4 border-l-2 border-baccent">Visibility of new KPIs like average approval time</li>
                        <li class="pl-4 border-l-2 border-baccent">Elimination of manual repetitive tasks</li>
                    </ul>`
            },
            es: {
                desc: '<p class="mb-5">Análisis, investigación e implementación de un sistema de gestión de agendas en Whirlpool, reemplazando procesos manuales por automatización integrada.</p>',
                challenge: '<p class="mb-5 opacity-90">El departamento gestionaba contenidos mediante Google Sheets manuales con códigos de colores, sin métricas ni información centralizada.</p>',
                solution: '<p class="mb-5 opacity-90">Mapeé los flujos de trabajo y lideré el caso de negocio para Pipefy. Implementé un flujo Kanban personalizado con formularios integrados.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Aprobaciones automatizadas y trazables</li>
                        <li class="pl-4 border-l-2 border-baccent">Visibilidad de nuevos KPIs de gestión</li>
                        <li class="pl-4 border-l-2 border-baccent">Eliminación de tareas manuales repetitivas</li>
                    </ul>`
            }
        },
        'weg-powerapps': {
            title: 'Automação de Operações Internas com Power Platform',
            company: 'WEG Automação',
            year: '2025',
            role: 'UI Designer / Power Platform Developer',
            tags: ['UI Design', 'Power Apps', 'Power Automate', 'SharePoint', 'Power Platform'],
            pt: {
                desc: '<p class="mb-5">Desenvolvimento de aplicativo interno e automação de fluxos operacionais utilizando o ecossistema Microsoft Power Platform.</p>',
                challenge: '<p class="mb-5 opacity-90">Controle de pontos de venda e atualização de status em sistemas internos eram feitos manualmente, gerando inconsistências e dependência de processos não padronizados.</p>',
                solution: '<p class="mb-5 opacity-90">Desenvolvi um aplicativo interno de pontos de venda com Power Apps e SharePoint como base de dados, integrando Power Automate para automatizar a atualização de status entre diferentes sistemas — centralizando informações e eliminando etapas manuais do fluxo operacional.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Aplicativo interno funcional em produção</li>
                        <li class="pl-4 border-l-2 border-baccent">Atualização de status automatizada entre múltiplos sistemas</li>
                        <li class="pl-4 border-l-2 border-baccent">Redução de erros e retrabalho no controle de pontos de venda</li>
                    </ul>`
            },
            en: {
                desc: '<p class="mb-5">Development of internal applications and operational workflow automation using the Microsoft Power Platform ecosystem.</p>',
                challenge: '<p class="mb-5 opacity-90">Point-of-sale control and status updates in internal systems were done manually, leading to inconsistencies.</p>',
                solution: '<p class="mb-5 opacity-90">Developed an internal POS application with Power Apps and SharePoint, integrating Power Automate to automate status updates.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Functional internal application in production</li>
                        <li class="pl-4 border-l-2 border-baccent">Automated status updates across multiple systems</li>
                    </ul>`
            },
            es: {
                desc: '<p class="mb-5">Desarrollo de aplicaciones internas y automatización de flujos operativos utilizando el ecosistema Microsoft Power Platform.</p>',
                challenge: '<p class="mb-5 opacity-90">El control de puntos de venta y la actualización de estados en sistemas internos se realizaban manualmente.</p>',
                solution: '<p class="mb-5 opacity-90">Desarrollé una aplicación POS interna con Power Apps y SharePoint, integrando Power Automate.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Aplicación interna funcional en producción</li>
                        <li class="pl-4 border-l-2 border-baccent">Actualización de estados automatizada entre sistemas</li>
                    </ul>`
            }
        },
        'conecta-restaurantes': {
            title: 'Conecta — Plataforma de Trabalho Temporário',
            company: 'Startup própria · Jaraguá do Sul, SC',
            year: '2022',
            role: 'Co-Fundador & Product Designer',
            tags: ['Branding', 'UI Design', 'Product Design', 'Pitch Design', 'Startup'],
            pt: {
                desc: '<p class="mb-5">Concepção, design de produto e identidade visual de uma plataforma que conecta bares e restaurantes a profissionais temporários, do zero até a validação no mercado.</p>',
                challenge: '<p class="mb-5 opacity-90">Mais de 9% dos brasileiros dependem de trabalhos temporários para subsistência, enquanto o setor de bares e restaurantes enfrenta dificuldades constantes para contratar mão de obra rápida, segura e qualificada.</p>',
                solution: '<p class="mb-5 opacity-90">Desenvolvi a identidade visual da marca, o design do aplicativo mobile e a apresentação comercial da Conecta. A plataforma permite que estabelecimentos publiquem vagas temporárias e contratem profissionais com perfis verificados.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">2º lugar no Techstars Startup Weekend</li>
                        <li class="pl-4 border-l-2 border-baccent">Selecionado para incubação no Novale HUB</li>
                        <li class="pl-4 border-l-2 border-baccent">Admitido no Programa Nascer de aceleração de startups</li>
                    </ul>`
            },
            en: {
                desc: '<p class="mb-5">Conception, product design, and visual identity for a platform connecting restaurants with temporary workers.</p>',
                challenge: '<p class="mb-5 opacity-90">Over 9% of Brazilians rely on temporary work, while the restaurant sector struggles to find fast labor.</p>',
                solution: '<p class="mb-5 opacity-90">Developed brand identity, mobile app design, and business pitch.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">2nd place at Techstars Startup Weekend</li>
                        <li class="pl-4 border-l-2 border-baccent">Admitted to Nascer Startup Acceleration</li>
                    </ul>`
            },
            es: {
                desc: '<p class="mb-5">Concepción, diseño de producto e identidad visual de una plataforma que conecta restaurantes con trabajadores temporales.</p>',
                challenge: '<p class="mb-5 opacity-90">Más del 9% de los brasileños dependen del trabajo temporal.</p>',
                solution: '<p class="mb-5 opacity-90">Desarrollé la identidad de marca, diseño de app y pitch comercial.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">2º lugar en Techstars Startup Weekend</li>
                        <li class="pl-4 border-l-2 border-baccent">Admitido en aceleración Programa Nascer</li>
                    </ul>`
            }
        },
        'minha-notificacao': {
            title: 'Minha Notificação — App de Bem-Estar Digital',
            company: 'Apple Developer Academy · Hackathon',
            year: '2021',
            role: 'UI Designer',
            tags: ['UI Design', 'Figma', 'Hackathon', 'Mobile Design', 'Bem-Estar Digital'],
            pt: {
                desc: '<p class="mb-5">Design de interface mobile para aplicativo de controle de tempo de tela, desenvolvido em equipe durante hackathon da Apple Developer Academy.</p>',
                challenge: '<p class="mb-5 opacity-90">O uso excessivo de dispositivos móveis é um problema crescente, mas as ferramentas nativas de controle são pouco personalizáveis.</p>',
                solution: '<p class="mb-5 opacity-90">Projetei no Figma o fluxo completo do aplicativo — do onboarding ao dashboard diário — com foco em personalização: o usuário define horários produtivos e modelos de notificação.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Protótipo funcional entregue dentro do prazo do hackathon</li>
                        <li class="pl-4 border-l-2 border-baccent">Fluxo completo com 10 telas projetadas em equipe</li>
                        <li class="pl-4 border-l-2 border-baccent">Solução validada no ecossistema Apple Academy</li>
                    </ul>`
            },
            en: {
                desc: '<p class="mb-5">Mobile interface design for a screen time control app, developed during an Apple Developer Academy hackathon.</p>',
                challenge: '<p class="mb-5 opacity-90">Excessive mobile device usage is a growing problem.</p>',
                solution: '<p class="mb-5 opacity-90">Designed the complete app flow in Figma, from onboarding to daily dashboard.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Functional prototype delivered on time</li>
                    </ul>`
            },
            es: {
                desc: '<p class="mb-5">Diseño de interfaz móvil para una aplicación de control de tiempo de pantalla, desarrollada durante un hackathon de Apple.</p>',
                challenge: '<p class="mb-5 opacity-90">El uso excesivo de dispositivos móviles es un problema creciente.</p>',
                solution: '<p class="mb-5 opacity-90">Diseñé el flujo completo de la aplicación en Figma.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Prototipo funcional entregado</li>
                    </ul>`
            }
        },
        'banco-tree': {
            title: 'Banco Tree — Mobiliário Urbano',
            company: 'Projeto de Design Industrial',
            year: '2022',
            role: 'Product Designer',
            tags: ['Product Design', 'Design Industrial', 'Sustentabilidade', 'Prototipagem Físico'],
            pt: {
                desc: '<p class="mb-5">Projeto de mobiliário urbano focado em sustentabilidade e facilidade de montagem utilizando pallets e plantas.</p>',
                challenge: '<p class="mb-5 opacity-90">Necessidade de criar peças de mobiliário urbano de baixo custo e sustentáveis para ativação de espaços públicos.</p>',
                solution: '<p class="mb-5 opacity-90">Criação de um manual de montagem e design executivo de um banco utilizando apenas 3 pallets e uma caixa estrutural para a planta.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Projeto executivo e modelagem 3D completos com medidas</li>
                        <li class="pl-4 border-l-2 border-baccent">Desenvolvimento de manual passo-a-passo ilustrado</li>
                    </ul>`
            },
            en: {
                desc: '<p class="mb-5">Urban furniture project focused on sustainability and easy assembly using pallets and plants.</p>',
                challenge: '<p class="mb-5 opacity-90">Need for low-cost, sustainable urban furniture.</p>',
                solution: '<p class="mb-5 opacity-90">Created an assembly manual and executive design for a bench using just 3 pallets.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Complete 3D modeling and executive design</li>
                    </ul>`
            },
            es: {
                desc: '<p class="mb-5">Proyecto de mobiliario urbano centrado en la sostenibilidad y el fácil montaje utilizando palets y plantas.</p>',
                challenge: '<p class="mb-5 opacity-90">Necesidad de mobiliario urbano de bajo costo y sostenible.</p>',
                solution: '<p class="mb-5 opacity-90">Creación de un manual de montaje y diseño ejecutivo de un banco utilizando solo 3 palets.</p>',
                results: `
                    <ul class="space-y-2 opacity-90">
                        <li class="pl-4 border-l-2 border-baccent">Modelado 3D y diseño ejecutivo completo</li>
                    </ul>`
            }
        }
    };

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');

    const openModal = (projectId) => {
        if (!modal || !modalContent) return;
        const pData = projectData[projectId];
        if (!pData) return;

        const lang = localStorage.getItem('lang') || 'pt';
        const langStrings = window.translations[lang];
        const pLangData = pData[lang];

        const tagsHtml = pData.tags.map(t => `<span class="border border-baccent px-2 py-1 bg-bbg inline-block mr-2 mb-2 uppercase text-[10px] tracking-wider font-bold">${t}</span>`).join('');

        modalContent.innerHTML = `
            <div class="border-b-3 border-baccent pb-6 mb-8">
                <p class="font-mono text-baccent text-xs uppercase tracking-[0.3em] mb-4">${pData.role} · ${pData.year}</p>
                <h2 class="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-[0.95] mb-4">${pData.title}</h2>
                <div class="flex flex-wrap gap-2">${tagsHtml}</div>
            </div>
            
            <div class="space-y-8">
                <section>
                    <h3 class="text-baccent font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 bg-baccent"></span> ${langStrings.proj_challenge}
                    </h3>
                    <div class="text-lg opacity-90 leading-relaxed">${pLangData.challenge}</div>
                </section>
                
                <section>
                    <h3 class="text-baccent font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 bg-baccent"></span> ${langStrings.proj_solution}
                    </h3>
                    <div class="text-lg opacity-90 leading-relaxed">${pLangData.solution}</div>
                </section>
                
                <section>
                    <h3 class="text-baccent font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 bg-baccent"></span> ${langStrings.proj_results}
                    </h3>
                    <div class="text-lg opacity-90 leading-relaxed">${pLangData.results}</div>
                </section>
            </div>
        `;

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.project-btn');
        if (btn) {
            e.preventDefault();
            openModal(btn.dataset.project);
        }

        const isCloseBtn = e.target.closest('.modal-close');
        const isModalBg = modal && !modal.classList.contains('hidden') && (e.target.id === 'project-modal' || e.target.classList.contains('bg-opacity-95'));
        
        if (isCloseBtn || isModalBg) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}
