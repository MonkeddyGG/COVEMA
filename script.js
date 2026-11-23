document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú Responsivo (Hamburguesa en móviles)
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Resaltar enlace activo según el scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 110;
            const sectionId = current.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    activeLink.classList.add('active');
                } else {
                    activeLink.classList.remove('active');
                }
            }
        });
    });

    // 4. Filtros de la Galería de Imágenes
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 5. Lightbox (Vista ampliada de imágenes de galería)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} — ${desc}`;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 6. Autocompletar categoría al hacer clic en "Cotizar equipo" desde las tarjetas
    const serviceLinks = document.querySelectorAll('.service-link');
    const categoriaSelect = document.getElementById('categoria');

    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            const equip = link.getAttribute('data-equip');
            if (equip && categoriaSelect) {
                categoriaSelect.value = equip;
            }
        });
    });

    // 7. Envío del Formulario de Cotización directamente al WhatsApp oficial de Covema
    const quoteForm = document.getElementById('quoteForm');
    const telefonoCovema = '5212761081587'; // Número oficial extraído del perfil

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const estado = document.getElementById('estado').value.trim();
            const categoria = document.getElementById('categoria').value;
            const detalles = document.getElementById('detalles').value.trim() || 'Sin comentarios adicionales';

            const mensaje = `Hola *Covema*, solicito una cotización desde su página web:%0A%0A` +
                `👤 *Nombre/Empresa:* ${encodeURIComponent(nombre)}%0A` +
                `📞 *Teléfono:* ${encodeURIComponent(telefono)}%0A` +
                `📍 *Ubicación:* ${encodeURIComponent(estado)}%0A` +
                `🚜 *Equipo/Servicio:* ${encodeURIComponent(categoria)}%0A` +
                `📝 *Detalles:* ${encodeURIComponent(detalles)}`;

            const whatsappURL = `https://wa.me/${telefonoCovema}?text=${mensaje}`;
            window.open(whatsappURL, '_blank');
        });
    }
});