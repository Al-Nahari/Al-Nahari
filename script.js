// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Scroll to top functionality
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links only - الإصلاح النهائي
document.querySelectorAll('.navbar a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // تطبيق smooth scrolling فقط للروابط الداخلية
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة المنسدلة على الهواتف
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarNav = document.querySelector('.navbar-collapse');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }
            }
        }
        // الروابط الخارجية (مثل وسائل التواصل) ستفتح بشكل طبيعي
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate floating elements
gsap.to('.floating-element', {
    y: 30,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    stagger: 0.5
});

// Animate navbar on scroll
gsap.from('.navbar', {
    y: -100,
    duration: 0.8,
    ease: "power3.out"
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Fetch GitHub projects
async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('github-projects');
    
    try {
        const response = await fetch('https://api.github.com/users/Al-Nahari/repos?sort=updated&direction=desc');
        const repos = await response.json();
        
        // Filter out forked repositories and limit to 6
        const filteredRepos = repos
            .filter(repo => !repo.fork && repo.name !== 'Al-Nahari')
            .slice(0, 6);
        
        projectsContainer.innerHTML = '';
        
        if (filteredRepos.length === 0) {
            projectsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="lead">No public repositories found. Check back later for updates!</p>
                </div>
            `;
            return;
        }
        
        filteredRepos.forEach((repo, index) => {
            const projectHTML = `
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="${index * 200}">
                    <div class="project-card">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available'}</p>
                        <div class="mb-3">
                            ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
                            <span class="tech-tag">GitHub</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="${repo.html_url}" class="project-link" target="_blank">
                                <i class="fab fa-github me-2"></i>View Code
                            </a>
                            ${repo.homepage ? `<a href="${repo.homepage}" class="project-link" target="_blank"><i class="fas fa-external-link-alt me-2"></i>Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.innerHTML += projectHTML;
        });
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="lead">Unable to load projects at the moment. Please check my <a href="https://github.com/Al-Nahari" target="_blank">GitHub profile</a> directly.</p>
            </div>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProjects();
});
