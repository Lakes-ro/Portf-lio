document.addEventListener('DOMContentLoaded', () => {
    // Array com as profissões
    const profissoes = ["Desenvolvedor Web Front-end", "Contador", "Músico"];
    const profissaoElement = document.getElementById('profissoes');
    let profissaoIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < profissoes[profissaoIndex].length) {
            profissaoElement.textContent += profissoes[profissaoIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000); // Espera 2 segundos antes de apagar
        }
    }

    function erase() {
        if (charIndex > 0) {
            profissaoElement.textContent = profissoes[profissaoIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            profissaoIndex = (profissaoIndex + 1) % profissoes.length;
            setTimeout(type, 500); // Espera 0.5 segundo antes de digitar a próxima
        }
    }

    type(); // Inicia a animação

    // Smooth Scroll
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validação de Formulário
    const form = document.getElementById('formulario-contato');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        if (nome && email && mensagem) {
            alert('Mensagem enviada! (Este é apenas um exemplo de validação)');
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});