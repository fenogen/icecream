/* --------MODAL window open/close------------- */
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    backdrop: document.querySelector("[data-backdrop]"),
  };

  if (refs.openModalBtn) {
      refs.openModalBtn.addEventListener("click", toggleModal);
      refs.closeModalBtn.addEventListener("click", toggleModal);
      refs.backdrop.addEventListener('click', onBackdropClick);
  };

  function onBackdropClick(event) {
      if (event.target === event.currentTarget) {
        toggleModal();
      };
  };

  function toggleModal() {
    !refs.backdrop.classList.contains("is-open")
      ? window.addEventListener('keydown', onPressEscape)
      : window.removeEventListener('keydown', onPressEscape);
    refs.backdrop.classList.toggle("is-open");
  };

  function onPressEscape(event) {
    if (event.code === 'Escape') {
      toggleModal();
    };
  };

/* add focus on modal */
  const modalRef = document.querySelector('[data-modal]');

  refs.openModalBtn.addEventListener('click', modalFocus);

  function modalFocus() {
    modalRef.focus();
    modalRef.style.outline = 'none';
  }

/* CHECKBOX-icon in modal add attribute CHECKED */
  const checkboxIconRef = document.querySelector('[data-checkbox-icon]');
  const checkboxInputRef = document.querySelector('[data-checkbox-input]');
  const checkboxLabelRef = document.querySelector('[data-checkbox-label]');


  checkboxLabelRef.addEventListener('click', byClickChecked);
  checkboxIconRef.addEventListener('focus', addEventListenerAddChecked());

  function addEventListenerAddChecked() {
    window.addEventListener('keydown', onPressEnterAdd);
  };

  function onPressEnterAdd(event) {
      if ( event.target.classList.contains('checkbox-icon') && event.code === 'Enter') {
        checkboxInputRef.setAttribute('checked', '');
        checkboxIconRef.classList.add('checked');
        window.removeEventListener('keydown', onPressEnterAdd);
        window.addEventListener('keydown', onPressEnterRemove);
      }
  };

  function onPressEnterRemove(event) {
    if (event.target.classList.contains('checkbox-icon') && event.code === 'Enter') {
      checkboxInputRef.removeAttribute('checked');
      checkboxIconRef.classList.remove('checked');
      window.removeEventListener('keydown', onPressEnterRemove);
      addEventListenerAddChecked();
    }
  };

  function byClickChecked(event) {
    if (event.target.classList.contains('form__text-checkbox') ||
        event.target.classList.contains('checkbox-icon')) {
          if (checkboxInputRef.hasAttribute('checked')) {
          checkboxInputRef.removeAttribute('checked');
          checkboxIconRef.classList.remove('checked');
          addEventListenerAddChecked();
          } else {
          checkboxInputRef.setAttribute('checked', '');
          checkboxIconRef.classList.add('checked');
          window.addEventListener('keydown', onPressEnterRemove);
          };
    };
  };

/* ========================================= */

/* --------FORM in modal window------------- */
  const formModalRef = document.querySelector('[data-form-modal]');

  const takeFormData = event => {
    event.preventDefault();//забороняє браузеру відправляти форму при натисканні кнопки
    // console.dir(event.target.elements); //так можна отримати доступ до елементів форми
    const formRef = event.target;// тут міститься посилання на форму
    /* -------------- */
    const formInputArray = formRef.querySelectorAll('input');
    let checked = true;
      formInputArray.forEach(input => {
        if (!input.hasAttribute('checked')) {
          input.style.borderColor = '#d41443';
          if (input.getAttribute('type')==='checkbox') {
            const checkboxIconRef = formRef.querySelector('.checkbox-icon');
            checkboxIconRef.classList.add('border-not-checked');
          };
        checked = false;
      }
    });

    if (!checked) {
      console.log('not all inputs checked');
      return;
    };

    /* -------------- */
    const formData = new FormData(formRef);//створюємо новий об'єкт
    const submittedData = {};//об'єкт для збору даних з форми, який надішлеться на бекенд

    formData.forEach((value, key) => {//цей об'єкт просто має ф-цію форіч і дані інпутів у вигляді value та key = name інпута
      submittedData[key] = value;//записуємо дані в об'єкт
    });

    console.dir(submittedData); //показує в консолі обєкт з даними
    toggleModal();// закриває форму
    formInputArray.forEach(input => {
      input.value = '';
      input.removeAttribute('checked');
    });
    /* --------видаляю все з чекбокса----------- */
    checkboxIconRef.classList.remove('border-not-checked');
    checkboxInputRef.removeAttribute('checked');
    checkboxIconRef.classList.remove('checked');
    window.removeEventListener('keydown', onPressEnterRemove);
    addEventListenerAddChecked();
    /* --------кінець видаляю все з чекбокса----------- */
  };

  if(formModalRef){
    formModalRef.addEventListener('submit', takeFormData);
  };
/* --------------------- */
/* ---------перевірка заповнення INPUT в модалці------------ */
const modalInputArray = document.querySelectorAll('[data-form-modal] input');

const checkedInput = (event) => {
  let pattern;

  if (event.target.name === "name") {
    pattern = /^[a-zA-ZА-Яа-яЁё\s]+$/;
  }
  if (event.target.name === "tel") {
    pattern = /^[0-9]{9,12}(\s*)?$/;
  }
  if (event.target.name === "email") {
    pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/;
  }

  if (!pattern.test(event.target.value)) {
    event.target.style.outlineColor = '#d41443';
    event.target.removeAttribute('checked');
    } else {
    event.target.style.outlineColor = 'inherit';
    event.target.style.borderColor = 'rgba(33, 33, 33, 0.2)';
    event.target.setAttribute('checked', '');
    }

};

modalInputArray.forEach(input => input.addEventListener('input', _.debounce(checkedInput, 500)));