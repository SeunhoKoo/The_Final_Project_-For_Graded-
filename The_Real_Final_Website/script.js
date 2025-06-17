// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const modal = document.getElementById('attractionModal');
    const closeModal = document.querySelector('.close');
    const contactForm = document.getElementById('contactForm');

    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Initialize slider
    function initSlider() {
        showSlide(0);
        
        // Auto slide every 4 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 4000);
    }

    function showSlide(index) {
        // Remove active class from all slides, dots, and slide info
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Remove active class from all slide info
        const slideInfos = document.querySelectorAll('.slide-info-overlay .slide-info');
        slideInfos.forEach(info => info.classList.remove('active'));
        
        // Add active class to current slide, dot, and slide info
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Add active class to corresponding slide info
        const currentSlideInfo = document.querySelector(`.slide-info-overlay .slide-info[data-slide="${index}"]`);
        if (currentSlideInfo) {
            currentSlideInfo.classList.add('active');
        }
        
        currentSlide = index;
    }

    // Slider navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Slide click to scroll to attractions
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            const attraction = slide.getAttribute('data-attraction');
            scrollToAttractionCard(attraction);
        });
    });

    // Initialize slider
    initSlider();

    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Attraction card modal functionality
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    attractionCards.forEach(card => {
        card.addEventListener('click', function() {
            const attraction = this.getAttribute('data-attraction');
            showAttractionModal(attraction);
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact form handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.attraction-card, .culture-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll to specific attraction card
function scrollToAttractionCard(attraction) {
    const card = document.querySelector(`[data-attraction="${attraction}"]`);
    if (card) {
        const offsetTop = card.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Highlight the card briefly
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 20px 40px rgba(44, 90, 160, 0.3)';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 1000);
    }
}

// Show attraction modal with detailed information including map
function showAttractionModal(attraction) {
    const modal = document.getElementById('attractionModal');
    const modalBody = document.getElementById('modalBody');
    
    const attractionData = {
        haeundae: {
            title: 'Haeundae Beach',
            images: [
                'https://www.haeundae.go.kr/user_res/images/culture/heaundae_view/View_B_01.jpg',
                'https://i.namu.wiki/i/hkDOgJHC40yiIFKQDRz7YjHpzWrL9vCTT7mve4TF6Lj-GpGsBpvT8WlXbwOT_To1Ndl1zKrVLQ-SiwaGNFOgQA.webp',
                'https://img.khan.co.kr/news/2024/09/02/news-p.v1.20240902.f4d3f58dc6974b95ba9b85dc2d406fec_P1.jpg'
            ],
            description: 'Haeundae Beach is South Korea\'s most famous beach destination, stretching 1.5 kilometers along Busan\'s coastline. Known for its fine white sand and crystal-clear waters, it attracts millions of visitors annually.',
            highlights: [
                'Annual Sand Festival in summer',
                'Luxury hotels and resorts nearby',
                'Water sports and beach activities',
                'Vibrant nightlife and restaurants',
                'Easy access via subway'
            ],
            tips: 'Best visited during summer months (June-August). Arrive early to secure a good spot on the beach.',
            coordinates: { lat: 35.1588, lng: 129.1603 }
        },
        gamcheon: {
            title: 'Gamcheon Culture Village',
            images: [
                'https://bbkk.kr/d/t/4/489_ap.jpg',
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191229142305192_oen',
                'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202412/07/bbe2968e-4471-4df8-8367-1ef2ae5b8765.jpg'
            ],
            description: 'Often called the "Machu Picchu of Busan," this colorful hillside village is a maze of steep streets, twisting alleys, and brightly painted houses. Originally a refugee settlement, it has been transformed into a cultural hub.',
            highlights: [
                'Stunning street art and murals',
                'Panoramic views of Busan',
                'Art galleries and craft shops',
                'Traditional Korean architecture',
                'Photo opportunities at every corner'
            ],
            tips: 'Wear comfortable walking shoes as there are many stairs. Visit during weekdays to avoid crowds.',
            coordinates: { lat: 35.0979, lng: 129.0114 }
        },
        jagalchi: {
            title: 'Jagalchi Fish Market',
            images: [
                'https://minio.nculture.org/amsweb-opt/multimedia_assets/151/85846/93969/c/%EC%9E%90%EA%B0%88%EC%B9%98%EC%8B%9C%EC%9E%A5-%282%29_rev-thumb.jpg',
                'https://www.kf.or.kr/old/koreana/resource/image/sub/2019_winter/twt_wntr_36.jpg',
                'https://cdn.smarttoday.co.kr/news/photo/202206/23450_15932_912.png'
            ],
            description: 'Korea\'s largest seafood market, Jagalchi has been the heart of Busan\'s fishing industry for decades. Experience the bustling atmosphere and taste the freshest seafood in the country.',
            highlights: [
                'Fresh seafood directly from boats',
                'Traditional market atmosphere',
                'Restaurants serving catch of the day',
                'Cultural experience with local vendors',
                'Early morning tuna auctions'
            ],
            tips: 'Visit early morning (6-8 AM) for the best selection. Try the raw fish (hoe) at the market restaurants.',
            coordinates: { lat: 35.0966, lng: 129.0306 }
        },
        tower: {
            title: 'Busan Tower',
            images: [
                'https://i.namu.wiki/i/AUpk8QHygUJremQinbr7w6YT4BochQWlBBJ-UwY-WWjZ4_5l6-jjIkT7GT-Xd_EtMjzVdpus3HBemhyNlbEH4w.webp',
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20200206095454435_wufrotr',
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20200206095453466_wufrotr'
            ],
            description: 'Standing 120 meters tall in Yongdusan Park, Busan Tower is the city\'s iconic landmark offering 360-degree panoramic views of the harbor, mountains, and urban landscape.',
            highlights: [
                'Panoramic city and harbor views',
                'Observation deck and restaurant',
                'Beautiful at sunset and night',
                'Located in historic Yongdusan Park',
                'Symbol of Busan since 1973'
            ],
            tips: 'Visit during sunset for the most spectacular views. The tower is beautifully illuminated at night.',
            coordinates: { lat: 35.1014, lng: 129.0319 }
        },
        temple: {
            title: 'Haedong Yonggungsa Temple',
            images: [
                'https://bbkk.kr/d/t/1/165_ap.jpg',
                'https://lh3.googleusercontent.com/proxy/1-kVZZg8bUmb3VIPwH4jjQTM0_ZgqsQTlBH3li91JgFAqY5nvrTb5EchfizNSdo5q7WE7ZUeVGujY7G3',
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222190831105_oen'
            ],
            description: 'A rare seaside Buddhist temple built on coastal cliffs, offering a unique spiritual experience with the sound of waves. Founded in 1376, it\'s one of the few temples in Korea built by the ocean.',
            highlights: [
                'Stunning ocean cliff location',
                'Traditional Buddhist architecture',
                'Sunrise prayers and ceremonies',
                '108-step stone stairway',
                'Peaceful meditation spots'
            ],
            tips: 'Visit early morning for sunrise prayers. The temple is especially beautiful during spring cherry blossom season.',
            coordinates: { lat: 35.1884, lng: 129.2233 }
        },
        gwangalli: {
            title: 'Gwangalli Beach',
            images: [
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen',
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20240805144355395_oen',
                'https://busan.grandculture.net/ImageView.aspx?fi=GC042P09237&t=middle&ext=jpg&iwm=1'
            ],
            description: 'Famous for its stunning night views of the illuminated Gwangan Bridge, Gwangalli Beach offers a more relaxed atmosphere than Haeundae with numerous beachfront cafes and restaurants.',
            highlights: [
                'Spectacular Gwangan Bridge views',
                'Beachfront cafes and restaurants',
                'Water sports and activities',
                'Annual fireworks festival',
                'Romantic evening atmosphere'
            ],
            tips: 'Best visited in the evening for bridge views. Many cafes offer perfect spots to watch the sunset.',
            coordinates: { lat: 35.1532, lng: 129.1186 }
        }
    };

    const data = attractionData[attraction];
    if (data) {
        modalBody.innerHTML = `
            <div class="modal-attraction">
                <div class="modal-header">
                    <h2>${data.title}</h2>
                </div>
                
                <div class="modal-gallery">
                    <div class="gallery-main">
                        <img src="${data.images[0]}" alt="${data.title}" class="main-image">
                    </div>
                    <div class="gallery-thumbs">
                        ${data.images.map((img, index) => `
                            <img src="${img}" alt="${data.title} ${index + 1}" class="thumb-image ${index === 0 ? 'active' : ''}" data-index="${index}">
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-description">
                    <p>${data.description}</p>
                </div>
                
                <div class="modal-highlights">
                    <h3>Highlights</h3>
                    <ul>
                        ${data.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-tips">
                    <h3>Visitor Tips</h3>
                    <p>${data.tips}</p>
                </div>
                
                <div class="modal-map">
                    <h3>Location</h3>
                    <div id="map-${attraction}" class="map-container"></div>
                </div>
            </div>
        `;
        
        // Add gallery functionality
        const mainImage = modalBody.querySelector('.main-image');
        const thumbImages = modalBody.querySelectorAll('.thumb-image');
        
        thumbImages.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = thumb.getAttribute('data-index');
                mainImage.src = data.images[index];
                
                thumbImages.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
        
        // Initialize map
        setTimeout(() => {
            initMap(attraction, data.coordinates);
        }, 100);
        
        modal.style.display = 'block';
    }
}

// Initialize Google Map
function initMap(attraction, coordinates) {
    const mapContainer = document.getElementById(`map-${attraction}`);
    if (!mapContainer) return;
    
    // Simple map placeholder (you would need Google Maps API for real implementation)
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <div class="map-pin">📍</div>
            <div class="map-info">
                <p><strong>Coordinates:</strong></p>
                <p>Latitude: ${coordinates.lat}</p>
                <p>Longitude: ${coordinates.lng}</p>
                <button onclick="openInGoogleMaps(${coordinates.lat}, ${coordinates.lng})" class="map-button">
                    Open in Google Maps
                </button>
            </div>
        </div>
    `;
}

// Open location in Google Maps
function openInGoogleMaps(lat, lng) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}

// Handle contact form submission
function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = '#4CAF50';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '#2c5aa0';
            submitButton.disabled = false;
            form.reset();
        }, 2000);
    }, 1500);
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroSlider = document.querySelector('.hero-slider');
    
    if (hero && heroSlider) {
        const rate = scrolled * -0.3;
        heroSlider.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to attraction cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.attraction-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff6b6b, #2c5aa0);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Add modal styles dynamically
const modalStyles = `
    .modal-attraction {
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .modal-header h2 {
        color: #2c5aa0;
        font-size: 2rem;
        margin: 0;
    }
    
    .modal-gallery {
        margin-bottom: 2rem;
    }
    
    .gallery-main {
        margin-bottom: 1rem;
    }
    
    .main-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .gallery-thumbs {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }
    
    .thumb-image {
        width: 80px;
        height: 60px;
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        border: 2px solid transparent;
    }
    
    .thumb-image.active,
    .thumb-image:hover {
        opacity: 1;
        border-color: #2c5aa0;
    }
    
    .modal-description p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #666;
        margin-bottom: 2rem;
    }
    
    .modal-highlights h3,
    .modal-tips h3,
    .modal-map h3 {
        color: #2c5aa0;
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
    
    .modal-highlights ul {
        list-style: none;
        padding: 0;
    }
    
    .modal-highlights li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .modal-highlights li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #4CAF50;
        font-weight: bold;
    }
    
    .modal-tips {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 2rem 0;
    }
    
    .modal-tips p {
        margin: 0;
        font-style: italic;
        color: #555;
    }
    
    .modal-map {
        margin-top: 2rem;
    }
    
    .map-container {
        height: 200px;
        background: #f0f0f0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    
    .map-placeholder {
        text-align: center;
        padding: 2rem;
    }
    
    .map-pin {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .map-info p {
        margin: 0.5rem 0;
        color: #666;
    }
    
    .map-button {
        background: #2c5aa0;
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
        transition: background 0.3s ease;
    }
    
    .map-button:hover {
        background: #1e3d72;
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('busanSiteUsers')) || [];
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('busanSiteCurrentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    register(userData) {
        // Check if email already exists
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('Email already exists.');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // In real app, this should be hashed
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('busanSiteUsers', JSON.stringify(this.users));
        
        return newUser;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        this.currentUser = user;
        localStorage.setItem('busanSiteCurrentUser', JSON.stringify(user));
        this.updateUI();
        
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('busanSiteCurrentUser');
        this.updateUI();
    }

    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userInfo = document.getElementById('userInfo');
        const welcomeText = document.getElementById('welcomeText');

        if (this.currentUser) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            welcomeText.textContent = `Welcome, ${this.currentUser.name}!`;
        } else {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth system
const authSystem = new AuthSystem();

// Set custom validation messages in English
document.addEventListener('DOMContentLoaded', function() {
    // Login form validation messages
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (loginEmail) {
        loginEmail.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter your email address.');
            } else if (this.validity.typeMismatch) {
                this.setCustomValidity('Please enter a valid email address.');
            }
        });
        
        loginEmail.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
    
    if (loginPassword) {
        loginPassword.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter your password.');
            }
        });
        
        loginPassword.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
    
    // Signup form validation messages
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (signupName) {
        signupName.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter your name.');
            }
        });
        
        signupName.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
    
    if (signupEmail) {
        signupEmail.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter your email address.');
            } else if (this.validity.typeMismatch) {
                this.setCustomValidity('Please enter a valid email address.');
            }
        });
        
        signupEmail.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
    
    if (signupPassword) {
        signupPassword.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please enter a password.');
            } else if (this.validity.tooShort) {
                this.setCustomValidity('Password must be at least 6 characters long.');
            }
        });
        
        signupPassword.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
    
    if (confirmPassword) {
        confirmPassword.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Please confirm your password.');
            } else if (this.validity.tooShort) {
                this.setCustomValidity('Password must be at least 6 characters long.');
            }
        });
        
        confirmPassword.addEventListener('input', function() {
            this.setCustomValidity('');
            // Check if passwords match
            const password = document.getElementById('signupPassword').value;
            if (this.value !== password && this.value !== '') {
                this.setCustomValidity('Passwords do not match.');
            }
        });
    }
});

// Modal functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    clearForm('loginForm');
}

function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    clearForm('signupForm');
}

function switchToSignup() {
    closeLoginModal();
    openSignupModal();
}

function switchToLogin() {
    closeSignupModal();
    openLoginModal();
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        authSystem.login(email, password);
        closeLoginModal();
        showNotification('Login successful!', 'success');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }

    // Validate password length
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return;
    }

    try {
        authSystem.register({ name, email, password });
        closeSignupModal();
        showNotification('Registration successful! Please login.', 'success');
        openLoginModal();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Handle logout
function logout() {
    authSystem.logout();
    showNotification('Logged out successfully.', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#4CAF50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        case 'warning':
            notification.style.background = '#ff9800';
            break;
        default:
            notification.style.background = '#2196F3';
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Add notification styles to head
const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationStyles;
document.head.appendChild(notificationStyleSheet);

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    
    if (event.target === signupModal) {
        closeSignupModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
        closeSignupModal();
    }
}); 