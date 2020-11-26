/* --------mobile MENU------------- */
const menuBtnRef = document.querySelector("[data-menu-button]");
const menuBlockRef = document.querySelector("[data-menu-block]");
const headerContainerRef = document.querySelector('[data-header-container]');
const windowHeight = window.innerHeight;
const bodyRef = document.querySelector("body");
      bodyRef.classList.add('mobile-menu-close');

const blockMenuOpenClose = () => {
  const { height: menuBlockHeight} = menuBlockRef.getBoundingClientRect();
  const { height: headerContainerHeight } = headerContainerRef.getBoundingClientRect();

  if (menuBlockHeight === windowHeight) {
    headerContainerRef.removeAttribute('style');
    menuBlockRef.removeAttribute('style');
  } else {
    menuBlockRef.style.height = `${windowHeight}px`;
    menuBlockRef.style.paddingTop = `60px`;
    headerContainerRef.style.height = `${headerContainerHeight}px`;
  }

  const expanded = menuBtnRef.getAttribute("aria-expanded") === "true" || false;
  menuBtnRef.setAttribute("aria-expanded", !expanded);

  bodyRef.classList.toggle("mobile-menu-open");
  bodyRef.classList.toggle("mobile-menu-close");

/* ----------------------------додаю бекдроп для блоку меню---------------------------- */
  const menuBlockParentRef = menuBlockRef.parentNode;
  if (menuBlockParentRef.classList.contains('container')) {
    const wrapperRef = document.createElement("div");
    wrapperRef.classList.add('wrapper');
    wrapperRef.appendChild(menuBlockRef);
    menuBlockParentRef.appendChild(wrapperRef);
    setTimeout(()=> wrapperRef.classList.add('animate'), 250);

    /* -----вішаю на обгортку умови закриття по кліку та натисканням ескейп---- */
    wrapperRef.addEventListener('click', onWrapperClick)  ;

    function onWrapperClick(event) {
      if (event.target === event.currentTarget) {
        toggleWrapper();
      };
    };

    function toggleWrapper() {
      bodyRef.classList.toggle("mobile-menu-open");
      bodyRef.classList.toggle("mobile-menu-close");
      headerContainerRef.removeAttribute('style');
      menuBlockRef.removeAttribute('style');
      menuBlockParentRef.appendChild(menuBlockRef);
      const wrapperRef = document.querySelector('.wrapper');
      wrapperRef.remove();
    };
  } else {
    /* ----видаляю бекдроп для блоку меню---- */
    const wrapperRef = document.querySelector('.wrapper');
    const menuBlockGrandPaRef = menuBlockParentRef.parentNode;
    menuBlockGrandPaRef.appendChild(menuBlockRef);
    wrapperRef.remove();
  }
  /* ------------------кінець коду по бекдропу меню------------------------------ */
}



const resizeWindow = () => {
   console.log('resize');
    if (window.innerWidth >= 1200 && bodyRef.classList.contains("mobile-menu-open")) {
    bodyRef.classList.toggle("mobile-menu-open");
    bodyRef.classList.toggle("mobile-menu-close");
    menuBlockRef.removeAttribute('style');
    headerContainerRef.removeAttribute('style');

    /* видаляю обгортку для меню блок, якщо вона є */
    const menuBlockParentRef = menuBlockRef.parentNode;
    if (menuBlockParentRef.classList.contains('wrapper')) {
      const menuBlockGrandPaRef = menuBlockParentRef.parentNode;
      menuBlockGrandPaRef.appendChild(menuBlockRef);
      menuBlockParentRef.remove();

    }
    /* ------------------кінець коду по обгортці меню------------ */
  }
}

menuBtnRef.addEventListener("click", blockMenuOpenClose);
window.addEventListener('resize', _.throttle(resizeWindow, 500));

/* ------вішаю на лінки в меню умову закриття меню на мобілці------- */
const menuLinkArray = document.querySelectorAll("[data-menu-block] .link");

const blockMenuCloseByLink = () => {
  if (window.innerWidth < 768 && bodyRef.classList.contains("mobile-menu-open")) {
    blockMenuOpenClose();
  }
}

const AddEvListToLink = (listOfLinks) => {
  listOfLinks.forEach(link => link.addEventListener("click", blockMenuCloseByLink));
}

AddEvListToLink(menuLinkArray);

/* =========================================== */


/* -----------плавний скролінг------------- */
const anchorsArray = document.querySelectorAll('a[href*="#"]')

const rewindTo = (event) => {
  event.preventDefault();
  const nameID = event.target.getAttribute('href');
  const nameIDRef = document.querySelector(nameID);
  nameIDRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
};

anchorsArray.forEach(anchor => {
  anchor.addEventListener('click', rewindTo);
})