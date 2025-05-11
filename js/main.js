// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todas las funcionalidades
    initLoader();
    updateCopyrightYear();
    initMobileMenu();
    initScrollEffects();
    initScrollSpy();
    loadServices();
    loadBeats();
    loadProjects();
    loadTestimonials();
    initContactForm();
    initModals();
    initTestimonialsSlider();
    initParticles();
});

// Función para manejar el loader
function initLoader() {
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");
      
        if (loader) {
            loader.classList.add("hidden");
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    });
}

// Actualiza el año en el copyright
function updateCopyrightYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

// Inicializa el menú para móviles
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Inicializa los efectos de scroll
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Animaciones al hacer scroll - Nota: Requiere la biblioteca Animate.css
    const animateElements = () => {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                // Añadir clase de animación solo si no está ya animado
                if (!element.classList.contains('animate__animated--visible')) {
                    const animation = element.classList.contains('animate__fadeInLeft') ? 'animate__fadeInLeft' :
                                    element.classList.contains('animate__fadeInRight') ? 'animate__fadeInRight' :
                                    'animate__fadeInUp';
                    
                    element.classList.add(animation, 'animate__animated--visible');
                }
            }
        });
    };

    window.addEventListener('load', animateElements);
    window.addEventListener('scroll', animateElements);
}

// Inicializa el scroll spy para la navegación
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
}

// Carga los servicios desde el JSON
async function loadServices() {
    try {
        const response = await fetch('data/services.json');
        const services = await response.json();
        const servicesContainer = document.getElementById('services-container');
        
        if (servicesContainer) {
            servicesContainer.innerHTML = services.map(service => `
                <div class="service-card">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `).join('');
            showNotification('Servicios cargados correctamente', 'success');
        }
    } catch (error) {
        showNotification('Error al cargar los servicios', 'error');
    }
}

// Carga los beats desde el JSON
async function loadBeats() {
    try {
        const response = await fetch('data/beats.json');
        const beats = await response.json();
        const beatsContainer = document.getElementById('beats-container');
        
        if (beatsContainer) {
            beatsContainer.innerHTML = beats.map(beat => `
                <div class="beat-card">
                    <div class="beat-video">
                        <iframe src="${beat.embedUrl}" title="${beat.title}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="beat-info">
                        <h3>${beat.title}</h3>
                        <p>${beat.genre}</p>
                        <a href="${beat.fullUrl}" class="btn project-btn" target="_blank" rel="noopener noreferrer">Ir al Beat</a>
                    </div>
                </div>
            `).join('');
            showNotification('Beats cargados correctamente', 'success');
        }
    } catch (error) {
        showNotification('Error al cargar los beats', 'error');
    }
}

// Carga los proyectos desde el JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json'); // Ruta corregida
        const projects = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        if (projectsContainer) {
            projectsContainer.innerHTML = projects.map(project => `
                <div class="project-card" data-id="${project.id}">
                    <img src="${project.image}" alt="${project.title} - ${project.artist}" class="project-img">
                    <div class="project-overlay">
                        <h3>${project.title}</h3>
                        <p>${project.artist}</p>
                        <a href="#" class="btn project-btn">Ver detalles</a>
                    </div>
                </div>
            `).join('');
            
            // Añadir los event listeners después de crear los elementos
            initProjectModal(projects);
        }
    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
    }
}

// Inicializa el modal de proyectos
function initProjectModal(projects) {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const projectDetails = document.querySelector('.project-details');
    
    if (!projectCards.length || !projectModal || !projectDetails) {
        console.error('Elementos del modal de proyectos no encontrados');
        return;
    }
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = parseInt(card.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                projectDetails.innerHTML = `
                    <h2>${project.title}</h2>
                    <p><strong>Artista:</strong> ${project.artist}</p>
                    <p><strong>Año:</strong> ${project.year}</p>
                    <img src="${project.image}" alt="${project.title}">
                    <p>${project.description}</p>
                    <h3>Tracks:</h3>
                    <ul>
                        ${project.tracks.map(track => `<li>${track}</li>`).join('')}
                    </ul>
                    ${project.link !== "#" ? 
                        `<a href="${project.link}" class="btn" target="_blank" rel="noopener noreferrer">Escuchar en Spotify</a>` : 
                        '<p class="coming-soon">Próximamente disponible</p>'}
                `;
                
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Carga los testimonios desde el JSON
async function loadTestimonials() {
    try {
        // Corregido el nombre del archivo
        const response = await fetch('data/testimonial.json');
        const testimonials = await response.json();
        const testimonialSlider = document.getElementById('testimonial-slider');
        const testimonialDots = document.getElementById('testimonial-dots');
        
        if (testimonialSlider && testimonialDots) {
            // Crear slides
            testimonialSlider.innerHTML = testimonials.map((testimonial, index) => `
                <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
                    <div class="testimonial-content">
                        <div class="quote-icon">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <p class="testimonial-text">${testimonial.text}</p>
                        <div class="testimonial-author">
                            <img src="${testimonial.image}" alt="${testimonial.author}" class="author-img">
                            <div class="author-info">
                                <h4>${testimonial.author}</h4>
                                <p>${testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Crear dots
            testimonialDots.innerHTML = testimonials.map((_, index) => `
                <span class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
            `).join('');
        }
    } catch (error) {
        console.error('Error al cargar los testimonios:', error);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? "#4caf50" : "#f44336"
    }).showToast();
}

// Inicializa el formulario de contacto
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // Mostrar notificación de envío
                showNotification('Enviando mensaje...', 'info');
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Configurar los parámetros según tu plantilla de EmailJS
                const templateParams = {
                    from_name: name,
                    to_name: 'Esqui',
                    reply_to: email,
                    subject: subject,
                    message: email + '\n\n' + message
                };
                
                await emailjs.send(
                    'service_iruml8s', 
                    'template_vjaheue', 
                    templateParams
                );
                
                showNotification('¡Mensaje enviado con éxito!', 'success');
                form.reset();
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                showNotification('Error al enviar el mensaje', 'error');
            }
        });
    }
}

// Inicializa el slider de testimonios
function initTestimonialsSlider() {
    setTimeout(() => {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (!testimonialSlides.length) {
            console.error('No se encontraron slides de testimonios');
            return;
        }
        
        let currentIndex = 0;
        let autoplayInterval;

        function showTestimonial(index) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialSlides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentIndex = index;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = testimonialSlides.length - 1;
                showTestimonial(newIndex);
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialSlides.length) newIndex = 0;
                showTestimonial(newIndex);
                resetAutoplay();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetAutoplay();
            });
        });

        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialSlides.length) newIndex = 0;
                showTestimonial(newIndex);
            }, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        if (testimonialSlides.length > 1) {
            startAutoplay();
        }
    }, 500);
}

// Actualizar las funciones de carga
async function loadServices() {
    try {
        const response = await fetch('data/services.json');
        const services = await response.json();
        const servicesContainer = document.getElementById('services-container');
        
        if (servicesContainer) {
            servicesContainer.innerHTML = services.map(service => `
                <div class="service-card">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

async function loadBeats() {
    try {
        const response = await fetch('data/beats.json');
        const beats = await response.json();
        const beatsContainer = document.getElementById('beats-container');
        
        if (beatsContainer) {
            beatsContainer.innerHTML = beats.map(beat => `
                <div class="beat-card">
                    <div class="beat-video">
                        <iframe src="${beat.embedUrl}" title="${beat.title}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="beat-info">
                        <h3>${beat.title}</h3>
                        <p>${beat.genre}</p>
                        <a href="${beat.fullUrl}" class="btn project-btn" target="_blank" rel="noopener noreferrer">Ir al Beat</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error al cargar los beats:', error);
    }
}

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        if (projectsContainer) {
            projectsContainer.innerHTML = projects.map(project => `
                <div class="project-card" data-id="${project.id}">
                    <img src="${project.image}" alt="${project.title} - ${project.artist}" class="project-img">
                    <div class="project-overlay">
                        <h3>${project.title}</h3>
                        <p>${project.artist}</p>
                        <a href="#" class="btn project-btn">Ver detalles</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        showNotification('Error al cargar los proyectos', 'error');
    }
}

async function loadTestimonials() {
    try {
        const response = await fetch('data/testimonial.json');
        const testimonials = await response.json();
        const testimonialSlider = document.getElementById('testimonial-slider');
        const testimonialDots = document.getElementById('testimonial-dots');
        
        if (testimonialSlider && testimonialDots) {
            // Crear slides
            testimonialSlider.innerHTML = testimonials.map((testimonial, index) => `
                <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
                    <div class="testimonial-content">
                        <div class="quote-icon">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <p class="testimonial-text">${testimonial.text}</p>
                        <div class="testimonial-author">
                            <img src="${testimonial.image}" alt="${testimonial.author}" class="author-img">
                            <div class="author-info">
                                <h4>${testimonial.author}</h4>
                                <p>${testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Crear dots
            testimonialDots.innerHTML = testimonials.map((_, index) => `
                <span class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
            `).join('');
        }
    } catch (error) {
        showNotification('Error al cargar los testimonios', 'error');
    }
}

// Actualizar el formulario de contacto
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // Mostrar notificación de envío
                showNotification('Enviando mensaje...', 'info');
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Configurar los parámetros según tu plantilla de EmailJS
                const templateParams = {
                    from_name: name,
                    to_name: 'Esqui',
                    reply_to: email,
                    subject: subject,
                    message: email + '\n\n' + message
                };
                
                await emailjs.send(
                    'service_iruml8s', 
                    'template_vjaheue', 
                    templateParams
                );
                
                showNotification('¡Mensaje enviado con éxito!', 'success');
                form.reset();
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                showNotification('Error al enviar el mensaje', 'error');
            }
        });
    }
}

// Inicializa los modales
function initModals() {
    // Modal de proyectos
    const projectModal = document.getElementById('project-modal');
    
    // Modal del dossier
    const dossierBtn = document.getElementById('view-dossier');
    const dossierModal = document.getElementById('dossier-modal');
    
    // Botones para cerrar los modales
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Abrir modal del dossier
    if (dossierBtn && dossierModal) {
        dossierBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dossierModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Cerrar modales con los botones de cierre
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Cerrar modales al hacer clic fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Cerrar modales con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

function initDossierSlider() {
    const slides = document.querySelectorAll('.dossier-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slide-dots');
    let currentSlide = 0;

    // Crear dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slide-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slide-dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        goToSlide(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        goToSlide(newIndex);
    });
}

// Llamar a la función cuando se abra el modal del dossier
document.getElementById('view-dossier').addEventListener('click', () => {
    document.getElementById('dossier-modal').classList.add('active');
    initDossierSlider();
});

function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Añadir a las inicializaciones
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    updateCopyrightYear();
    initMobileMenu();
    initScrollEffects();
    initScrollSpy();
    loadServices();
    loadBeats();
    loadProjects();
    loadTestimonials();
    initContactForm();
    initModals();
    initTestimonialsSlider();
    initSectionAnimations();
});

// Función para inicializar las partículas
function initParticles() {
    const container = document.getElementById('particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición inicial aleatoria en el eje X
        const x = Math.random() * window.innerWidth;
        particle.style.left = `${x}px`;
        particle.style.top = '-10px';
        
        // Tamaño aleatorio más pequeño para efecto más suave
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Duración de caída más lenta (entre 8 y 12 segundos)
        const duration = Math.random() * 4 + 8;
        particle.style.animation = `fall ${duration}s linear forwards`;
        
        container.appendChild(particle);
        
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
    
    // Crear partículas con menos frecuencia (cada 200ms)
    setInterval(createParticle, 200);
}


function initMusicWaves() {
    const container = document.createElement('div');
    container.id = 'music-waves';
    document.body.appendChild(container);

    for (let i = 0; i < 5; i++) {
        const wave = document.createElement('div');
        wave.className = 'music-wave';
        container.appendChild(wave);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initMusicWaves();
    initDossierSlider();
});


function initMusicPlayer() {
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeControl = document.getElementById('volumeControl');
    const muteBtn = document.getElementById('muteBtn');

    // Inicializar volumen al 25%
    audio.volume = 0.2;
    volumeControl.value = 20;

    // Reproducir automáticamente
    audio.play().catch(error => {
        console.log('Reproducción automática bloqueada por el navegador');
    });

    // Toggle para expandir/colapsar
    musicPlayer.addEventListener('click', (e) => {
        if (e.target.closest('.music-controls')) return;
        musicPlayer.classList.toggle('collapsed');
    });

    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    volumeControl.addEventListener('input', (e) => {
        e.stopPropagation();
        const volume = e.target.value / 100;
        audio.volume = volume;
        updateVolumeIcon(volume);
    });

    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.muted = !audio.muted;
        updateVolumeIcon(audio.muted ? 0 : audio.volume);
    });

    function updateVolumeIcon(volume) {
        const icon = muteBtn.querySelector('i');
        icon.className = volume === 0 ? 'fas fa-volume-mute' :
                        volume < 0.5 ? 'fas fa-volume-down' :
                        'fas fa-volume-up';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
});