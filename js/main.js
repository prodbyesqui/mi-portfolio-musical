// Espera a que toda la página (incluyendo imágenes, hojas de estilo, etc.) esté completamente cargada
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    if (loader) {
      // Añade la clase que inicia la transición de salida
      loader.classList.add("hidden");
  
      // Espera que la transición termine y elimina el loader del DOM
      setTimeout(() => {
        loader.remove();
      }, 500); // Debe coincidir con el tiempo de transición en .hidden (500ms)
    }
});

// Actualiza el año en el copyright
document.getElementById("year").textContent = new Date().getFullYear();

// Navegación móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cierra el menú cuando se hace clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Cambio de estilo de la barra de navegación al hacer scroll
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

// Marcar enlace activo según la sección visible
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

// Modal de proyectos
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const projectDetails = document.querySelector('.project-details');
const closeProjectModal = projectModal.querySelector('.close-modal');

// Datos de proyectos (esto podría venir de una API o base de datos en un sitio real)
const projectsData = [
    {
        id: 1,
        title: "Mixtape 'Narcisista'",
        artist: "Yazwick",
        description: "Producción completa para la mixtape 'Narcisista' de Yazwick. Incluye la producción de beats, grabación de voces, mezcla y masterización. Un proyecto que fusiona trap con elementos melódicos de R&B para crear un sonido único y personal.",
        image: "assets/images/narcisista.jpg",
        link: "https://open.spotify.com/intl-es/album/7fHdrIvi85SxWnI4iLP6JA?si=jyNjcOu5TNGGxGAWs2hadA",
        year: "2023",
        tracks: ["Intro", "Narcisista", "No Te Creo", "Perdona (feat. Juicy BAE)", "Otro Nivel"]
    },
    {
        id: 2,
        title: "Collab Sessions Vol. 1",
        artist: "Varios Artistas",
        description: "Serie de sesiones colaborativas con artistas emergentes de la escena urbana española. Este volumen incluye colaboraciones con 5 artistas diferentes, cada uno aportando su estilo único a beats producidos específicamente para ellos.",
        image: "assets/images/project2.jpg",
        link: "#",
        year: "2024",
        tracks: ["Flow Nocturno - Blueboy", "Amanecer - Juicy BAE", "Sin Miedo - KVLB", "En Mi Zona - YNG Drip", "Destino - Lil Rose"]
    },
    {
        id: 3,
        title: "Música para Marcas",
        artist: "Producciones Comerciales",
        description: "Trabajos realizados para marcas y agencias de publicidad que buscaban un sonido urbano contemporáneo para sus campañas. Estas producciones han sido utilizadas en plataformas digitales y televisión.",
        image: "assets/images/project3.jpg",
        link: "#",
        year: "2023-2024",
        tracks: ["Campaña Primavera - SportBrand", "Lanzamiento App - TechCo", "Spot Verano - Refrescos XYZ", "Redes Sociales - Moda Urbana"]
    },
    {
        id: 4,
        title: "Próximos Lanzamientos",
        artist: "En Desarrollo",
        description: "Proyectos actualmente en producción que serán lanzados próximamente. Incluye colaboraciones con artistas establecidos y nuevos talentos, así como experimentación con nuevos sonidos y técnicas de producción.",
        image: "assets/images/project4.jpg",
        link: "#",
        year: "2024-2025",
        tracks: ["EP Colaborativo (Otoño 2024)", "Pack de Beats Vol.2 (Verano 2024)", "Album producción completa (Invierno 2024-2025)"]
    }
];

// Abrir modal de proyecto
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        const project = projectsData.find(p => p.id === parseInt(projectId));
        
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

// Cerrar modal de proyecto
closeProjectModal.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Modal de dossier
const viewDossierBtn = document.getElementById('view-dossier');
const dossierModal = document.getElementById('dossier-modal');
const closeDossierModal = dossierModal.querySelector('.close-modal');

// Abrir modal de dossier
viewDossierBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dossierModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Cerrar modal de dossier
closeDossierModal.addEventListener('click', () => {
    dossierModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar modales al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === dossierModal) {
        dossierModal.classList.remove('active');
        document.body.style.overflow = 'auto';
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

// Ejecutar animaciones al cargar y al hacer scroll
window.addEventListener('load', animateElements);
window.addEventListener('scroll', animateElements);
// Mejorar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Añadir validación de entrada
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            // Validación al perder el foco
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
        
        // Validar un campo específico
        function validateInput(input) {
            const errorClass = 'input-error';
            const parent = input.parentElement;
            const errorElement = parent.querySelector('.error-message') || document.createElement('div');
            
            if (!errorElement.classList.contains('error-message')) {
                errorElement.classList.add('error-message');
                parent.appendChild(errorElement);
            }
            
            // Reset error
            input.classList.remove(errorClass);
            errorElement.textContent = '';
            
            // Validar según el tipo
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add(errorClass);
                errorElement.textContent = 'Este campo es obligatorio';
                return false;
            }
            
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add(errorClass);
                    errorElement.textContent = 'Por favor, introduce un email válido';
                    return false;
                }
            }
            
            return true;
        }
        
        // Validar todo el formulario
        function validateForm() {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            return isValid;
        }
        
        // Manejar envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return false;
            }
            
            // Efecto de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Simulación de envío (en producción, esto sería una llamada fetch/ajax a tu servidor)
            setTimeout(() => {
                console.log('Form submitted:', formDataObj);
                
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>¡Mensaje enviado con éxito!</h3>
                    <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                `;
                
                // Reemplazar el formulario con el mensaje
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Animar scroll hasta el mensaje
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Añadir botón para reiniciar el formulario (opcional)
                const resetBtn = document.createElement('button');
                resetBtn.className = 'btn';
                resetBtn.textContent = 'Enviar otro mensaje';
                successMessage.appendChild(resetBtn);
                
                resetBtn.addEventListener('click', function() {
                    location.reload(); // Simple pero efectivo
                });
            }, 2000); // Simulación de 2 segundos
        });
    }
    
    // Añadir estilos CSS para errores y éxito
    const style = document.createElement('style');
    style.textContent = `
        .input-error {
            border-color: #e74c3c !important;
            background-color: rgba(231, 76, 60, 0.1) !important;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            transition: all 0.3s ease;
        }
        
        .success-message {
            padding: 3rem 2rem;
            text-align: center;
            color: #2ecc71;
            animation: fadeIn 0.5s ease;
        }
        
        .success-message i {
            font-size: 4rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .success-message h3 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #2ecc71;
        }
        
        .success-message p {
            margin-bottom: 1.5rem;
            color: var(--text-color);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// Funcionalidad para el carrusel de testimonios
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;

    // Función para mostrar un testimonio específico
    function showTestimonial(index) {
        // Ocultar todos los testimonios
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Desactivar todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el testimonio seleccionado
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
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialSlides.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Autoplay (opcional)
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialSlides.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 5000); // Cambiar cada 5 segundos
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Iniciar autoplay
    startAutoplay();
    
    // Detener autoplay al interactuar con el carrusel
    document.querySelector('.testimonials-container').addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.testimonials-container').addEventListener('mouseleave', startAutoplay);
});