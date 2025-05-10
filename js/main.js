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

    // Animaciones al hacer scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                const animation = element.classList.contains('animate__fadeInLeft') ? 'animate__fadeInLeft' :
                                element.classList.contains('animate__fadeInRight') ? 'animate__fadeInRight' :
                                'animate__fadeInUp';
                
                element.classList.add(animation);
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
        }
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
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
                        <iframe src="${beat.embedUrl}" title="${beat.title}" allowfullscreen></iframe>
                    </div>
                    <div class="beat-info">
                        <h3>${beat.title}</h3>
                        <p>${beat.genre}</p>
                        <br>
                        <a href="${beat.fullUrl}" class="btn project-btn" target="_blank">Ir al Beat</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error al cargar los beats:', error);
    }
}

// Carga los proyectos desde el JSON
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
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
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
                    <a href="${project.link}" class="btn" target="_blank">Escuchar en Spotify</a>
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
        const response = await fetch('data/testimonials.json');
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

// Inicializa el slider de testimonios
function initTestimonialsSlider() {
    setTimeout(() => {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentIndex = 0;
        let autoplayInterval;

        // Función para mostrar un testimonio específico
        function showTestimonial(index) {
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonialSlides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        // Event listeners para los botones de navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = testimonialSlides.length - 1;
                }
                showTestimonial(newIndex);
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialSlides.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
                resetAutoplay();
            });
        }
        
        // Event listeners para los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetAutoplay();
            });
        });

        // Autoplay del slider
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialSlides.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            }, 5000); // Cambia cada 5 segundos
        }

        // Resetea el autoplay
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Inicia el autoplay
        if (testimonialSlides.length > 1) {
            startAutoplay();
        }
    }, 500); // Pequeño retraso para asegurar que los testimonios ya se han cargado
}

// Inicializa el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            
            try {
                // Aquí normalmente enviarías los datos a un servidor
                // Por ahora, solo simularemos una respuesta exitosa
                console.log('Datos del formulario:', formObject);
                
                // Simular envío exitoso
                alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
                contactForm.reset();
                
                // En un caso real, aquí harías una petición fetch a tu endpoint
                // const response = await fetch('tu-endpoint', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formObject),
                // });
                // const data = await response.json();
                // ... manejo de la respuesta
                
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
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