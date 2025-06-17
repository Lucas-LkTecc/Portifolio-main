document.addEventListener('DOMContentLoaded', () => { 

    //  --- Efeito de Digitação para o H1 na Seção Home ---
    const homeH1 = document.querySelector('#home h1');

    if (homeH1) { // Garante que o elemento <h1> foi encontrado
        const part1 = "Desenvolvedor";
        const part2 = "Full Stack";
        const typingSpeed = 100; // Velocidade de digitação em milissegundos por caractere
        const breakDelay = 500; // Atraso em milissegundos antes de digitar a segunda parte (após o <br>)

        homeH1.innerHTML = ''; // Limpa o conteúdo inicial do <h1> para começar a digitar

        let charIdenx = 0; // Índice para controlar qual caractere está sendo digitado

        // Função para digitar a primeira parte do texto
        function typePart1() {
            if (charIdenx < part1.length) {
                homeH1.textContent += part1.charAt(charIdenx); // Adiciona um caractere por vez
                charIdenx++;
                setTimeout(typePart1, typingSpeed); // Chama a si mesma com um atraso
            } else {
                // Quando a primeira parte terminar, reseta o índice e adiciona o <br>
                charIdenx = 0;
                setTimeout(() => {
                    homeH1.innerHTML += '<br>';  // Adiciona a quebra de linha
                    typePart2(); // Inicia a digitação da segunda parte
                }, breakDelay);
            }
        }

        // Função para digitar a segunda parte do texto
        function typePart2() {
            if (charIdenx < part2.length) {
                homeH1.innerHTML += part2.charAt(charIdenx);
                charIdenx++;
                setTimeout(typePart2, typingSpeed);
            }
        }

        typePart1();
    }

    // 2. Funcionalidade de Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); //Previne o comportamento padrão do link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                //Calcula o deslocamento para levar em conta o cabeçalho fixo
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
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
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active'); // Remove a classe 'active' do hambúrguer (fecha o X)
        navLinks.classList.toggle('active');// Remove a classe 'active' do menu (esconde o menu)
    })

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target) && navLinks.classList.contains('active')){
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Carrossel de Projetos ---
    const carouselWrapper = document.querySelector('.portfolio-carousel-wrapper');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const projectCards = document.querySelectorAll('.project-card');

    if (!carouselWrapper || projectCards.length === 0) {
        console.warn("Elemento do carrossel ou cartões de projeto não encontrados.")
        return;
    }

    let currentIndex = 0;
    const totalCards = projectCards.length;

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = 0;
        } else if (index >= totalCards) {
            currentIndex = totalCards - 1;
        } else {
            currentIndex = index;
        }

        const scrollPosition = projectCards[currentIndex].offsetLeft - 
        (carouselWrapper.offsetWidth / 2) + 
        (projectCards[currentIndex].offsetWidth / 2);

        carouselWrapper.scroll({
            left: projectCards[currentIndex].offsetLeft,
            behavior: 'smooth'
        });

        /*
        prevButton.disabled = (currentIndex === 0);
        nextButton.disabled = (currentIndex === totalCards - 1);
        */
    }

    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    goToSlide(0);

    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });


    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');


    const messageContainer = document.createElement('div');
    messageContainer.style.marginTop = '1rem';
    messageContainer.style.padding = '0.8rem';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.fontSize = '0.9rem';
    messageContainer.style.display = 'none';

    contactForm.insertBefore(messageContainer, submitButton); // insere antes do botão

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

        const form = event.target;
        const formData = new FormData(form);

        // Opcional: Desabilitar o botão para evitar múltiplos cliques
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        messageContainer.style.display = 'none';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'appication/json' // Importante para o Formspree retornar JSON
                }
            });

            if(response.ok) {
                messageContainer.textContent = 'Sua mensagem foi enviada com sucesso!';
                messageContainer.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                messageContainer.style.color = '#4caf50';
                form.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    messageContainer.textContent = data['errors'].map(error => error["message"]).join(", ");
                } else {
                    messageContainer.textContent = 'Ops! algo deu errado ao enviar sua menssagem.';
                }
                messageContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                messageContainer.style.color = '#F44336';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            messageContainer.textContent = 'Erro de conexão. Por favor, tente novamente mais tarde.';
            messageContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Fundo vermelho claro
            messageContainer.style.color = '#F44336'; // Texto vermelho
        } finally {
            submitButton.disabled = false; // Reabilita o botão
            submitButton.textContent = 'Enviar Mensagem';
            messageContainer.style.display = 'block'; // Mostra a mensagem
        }
    })

});


