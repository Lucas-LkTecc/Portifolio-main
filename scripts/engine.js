document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidade de Filtro do Portfólio
    const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            //Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            //Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block'; //mostra todos os itens
                } else {
                    //Verificar se o item tem a categoria correspondente
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none'; // Esconde os itens que não correspondem
                    }
                }
            })
        });
    });

    // 2. Funcionalidade de Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); //Previne o comportamento padrão do link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                //Calcula o deslocamento para levar em conta o cabeçalho fixo
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientReact().top;
                const offsetPosition = elementPosition + window.pageYOffset-headerOffset - 20;  // -20px para um pequeno padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Faz a rolagem ser suave
                });
            }
        });
    });

    // 3. Funcionalidade do Menu Hambúrguer (Mobile)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a'); // Seleciona todos os links do menu

    // Fechar o menu ao clicar em um link de navegação (para scroll suave)
    hamburgerMenu.addEventListener('clicl', () => {
        hamburgerMenu.classList.toggle('active'); // Remove a classe 'active' do hambúrguer (fecha o X)
        navLinks.classList.toggle('active');// Remove a classe 'active' do menu (esconde o menu)
    })

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target) && navLinks.classList('active')){
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    })
});



