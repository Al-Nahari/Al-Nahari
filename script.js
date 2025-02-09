        async function fetchGitHubProjects() {
            try {
                const response = await fetch('https://api.github.com/users/Al-Nahari/repos');
                const projects = await response.json();
                
                const projectsContainer = document.getElementById('github-projects');
                projectsContainer.innerHTML = '';

                projects.forEach(project => {
                    if (!project.fork) {
                        const projectCard = `
                            <div class="col-md-4 reveal">
                                <div class="project-card">
                                    <h3>${project.name}</h3>
                                    <p class="text-muted">${project.description || 'لا يوجد وصف'}</p>
                                    <div class="project-tech">
                                        ${project.topics.map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
                                    </div>
                                    <a href="${project.html_url}" target="_blank" class="project-link">
                                        <i class="fab fa-github me-2"></i>عرض الكود
                                    </a>
                                </div>
                            </div>
                        `;
                        projectsContainer.innerHTML += projectCard;
                    }
                });

                // تفعيل تأثيرات الظهور
                reveal();

            } catch (error) {
                projectsContainer.innerHTML = `
                    <div class="col-12 text-center text-danger">
                        <p>حدث خطأ في جلب المشاريع، يرجى المحاولة لاحقًا</p>
                    </div>
                `;
            }
        }

        // تأثيرات الظهور
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        // زر الانتقال للأعلى
        const scrollTop = document.querySelector('.scroll-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
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

        // تحميل المشاريع عند بدء التشغيل
        document.addEventListener('DOMContentLoaded', () => {
            fetchGitHubProjects();
            window.addEventListener('scroll', reveal);
        });

        // تأثيرات الصورة الشخصية
        const profileImg = document.querySelector('.profile-img');
        profileImg.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            profileImg.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
        });

        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'rotate(0) scale(1)';
        });