document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 20) {
        nav.classList.add('bg-surface/95', 'shadow-sm');
    } else {
        nav.classList.remove('bg-surface/95', 'shadow-sm');
    }
});

document.querySelectorAll('.mobile-menu-panel a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = link.closest('details');
        if (menu) menu.open = false;
    });
});

document.querySelectorAll('.primary-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => btn.classList.add('scale-95'));
    btn.addEventListener('mouseup', () => btn.classList.remove('scale-95'));
    btn.addEventListener('mouseleave', () => btn.classList.remove('scale-95'));
});

const projectGrid = document.querySelector('.project-grid');
if (projectGrid) {
    const projectCards = [...projectGrid.querySelectorAll(':scope > a[data-category]')];
    const filterButtons = [...document.querySelectorAll('.filter-button')];
    const count = document.querySelector('#project-count');

    const applyProjectFilter = (filter) => {
        let visible = 0;
        projectCards.forEach(card => {
            const categories = card.dataset.category.split(/\s+/);
            const show = filter === 'all' || categories.includes(filter);
            card.hidden = !show;
            if (show) visible += 1;
        });
        filterButtons.forEach(button => {
            const active = button.dataset.filter === filter;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        if (count) count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    };

    const requestedFilter = new URLSearchParams(window.location.search).get('filter');
    const validFilter = filterButtons.some(button => button.dataset.filter === requestedFilter) ? requestedFilter : 'all';
    applyProjectFilter(validFilter);
    filterButtons.forEach(button => button.addEventListener('click', () => {
        applyProjectFilter(button.dataset.filter);
        const url = new URL(window.location.href);
        if (button.dataset.filter === 'all') url.searchParams.delete('filter');
        else url.searchParams.set('filter', button.dataset.filter);
        window.history.replaceState({}, '', url);
    }));
}
