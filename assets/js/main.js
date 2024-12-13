/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */

if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-sidebar')
  })
}


/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */

if(navClose){
  navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-sidebar')
  })
}


/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContent = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    tabContent.forEach((tabContents) => {
      tabContents.classList.remove('skills__active');
    });

    target.classList.add('skills__active');

    tabs.forEach((tab) => {
      tab.classList.remove('skills__active');
    });

    tab.classList.add('skills__active');
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
    target: '.work__card',
  },
  animation: {
    duration: 300,
  },
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
  linkWork.forEach((link) => link.classList.remove('active-work'));
  this.classList.add('active-work');
}

linkWork.forEach((link) => link.addEventListener('click', activeWork));

/*===== Work Popup =====*/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('work__button')) {
    togglePortfolioPopup();
    portfolioItemDetails(event.target.parentElement);
  }
});

document
  .querySelector('.portfolio__popup-close')
  .addEventListener('click', togglePortfolioPopup);

function togglePortfolioPopup() {
  document.querySelector('.portfolio__popup').classList.toggle('open');
}

function portfolioItemDetails(portfolioItem) {
  document.querySelector('.pp__thumbnail img').src =
    portfolioItem.querySelector('.work__img').src;

  document.querySelector('.portfolio__popup-subtitle span').innerHTML =
    portfolioItem.querySelector('.work__title').innerHTML;

  document.querySelector('.portfolio__popup-body').innerHTML =
    portfolioItem.querySelector('.portfolio__item-details').innerHTML;
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
  modalBtns = document.querySelectorAll('.services__button'),
  modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
  modalViews[modalClick].classList.toggle('active-modal');
};

modalBtns.forEach((modelBtn, index) => {
  modelBtn.addEventListener('click', () => modal(index));
});

modalCloses.forEach((modalClose, index) => {
  modalClose.addEventListener('click', () => modal(index));
});

// Fecha o modal quando clicar fora dele
window.addEventListener('click', (event) => {
  modalViews.forEach((modalView) => {
      if (event.target === modalView) {
          modalView.classList.remove('active-modal');
      }
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper('.testimonials__container', {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },


  autoplay: {
      delay: 5000, // Temporizador de 5 segundos
     disableOnInteraction: false, // Continua o autoplay mesmo após interação do usuário
  },

  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 48,
    },
  },
});



/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section");

function navHighlighter() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50; // Ajuste de offset
        let sectionId = current.getAttribute("id");

        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (link) link.classList.add('active-link');
        } else {
            if (link) link.classList.remove('active-link');
        }
    });
}

window.addEventListener("scroll", navHighlighter);


/*=============== SHOW SCROLL UP ===============*/


// Função para exibir o modal de notificação
function showCopyModal() {
  const copyModal = document.getElementById('copyModal');
  copyModal.classList.add('show');

  // Remove a notificação após 3 segundos
  setTimeout(() => {
      copyModal.classList.remove('show');
  }, 3000);
}

// Evento para simular a ação de copiar link
document.querySelector('.btn__share').addEventListener('click', () => {
  // Simula a cópia do link
  navigator.clipboard.writeText(window.location.href)
      .then(() => {
          showCopyModal(); // Exibe o modal de notificação
      })
      .catch(err => {
          console.error('Erro ao copiar o link: ', err);
      });
});

// Restaurar a posição de rolagem e seção ao recarregar a página
window.addEventListener('load', () => {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem('scrollPosition');
  }

  // Ajuste para redirecionar à seção correta ao carregar a página
  const path = window.location.pathname.substring(1); // Remove a barra inicial "/"
  if (path) {
      const targetElement = document.getElementById(path);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      }
  }
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      // Rolagem suave até o elemento
      window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
      });

      // Atualiza a URL sem o "#" e sem recarregar a página
      history.pushState(null, null, `/${targetId}`);
  });
});

// Função chamada quando o campo recebe foco
function updateLabel(input) {
  const container = input.closest('.input__container');
  const label = container.querySelector('label');
  const span = container.querySelector('span');

  // Recupera o texto dinâmico do argumento `data-default` do span
  const newText = span.getAttribute('data-default');
  
  // Atualiza o texto do label e do span dinamicamente ao focar
  label.textContent = newText;
  span.textContent = newText;

  container.classList.add('focus'); // Adiciona a classe "focus" ao container

  // Remove a classe de erro (vermelha) e LED quando o campo recebe foco
  input.classList.remove('error');
}

// Função chamada quando o campo perde foco
function resetLabel(input) {
  const container = input.closest('.input__container');
  const label = container.querySelector('label');
  const span = container.querySelector('span');

  // Redefine o texto para o padrão se o campo estiver vazio
  if (!input.value.trim()) {
    const defaultText = label.getAttribute('data-default');
    label.textContent = defaultText;
    span.textContent = defaultText;

    container.classList.remove('focus'); // Remove a classe "focus" se vazio

    // Se o campo está vazio, adiciona a classe de erro e LED (bordas vermelhas)
    input.classList.add('error');
  } else {
    // Remove a classe de erro e LED quando o campo for preenchido
    input.classList.remove('error');
  }
}

