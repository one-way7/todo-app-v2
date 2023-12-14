import projects from './projects';

const dom = (() => {
  const projectsList = document.querySelector('.project__container');
  let projectModal;
  let projectFormEl;

  const showProjectModal = () => {
    projectFormEl.reset();
    projectModal.classList.remove('hide');
    projectModal.classList.remove('display');
  };

  const renderFormProjects = (modal, index) => {
    let addBtn = 'add';
    let addBtnClass = 'project__form-add-btn';
    let isHide = true;
    let inputValue = '';

    if (modal === 'edit') {
      addBtn = 'edit';
      addBtnClass = 'project__form-edit-btn';
      isHide = false;
      inputValue = projects[index].title;
    }

    const projectFormDiv = document.createElement('div');
    projectFormDiv.classList.add('project__modal');
    if (isHide) projectFormDiv.classList.add('hide');
    projectsList.appendChild(projectFormDiv);
    projectModal = projectFormDiv;

    const projectForm = document.createElement('form');
    projectForm.classList.add('project__form');
    projectForm.setAttribute('name', 'project__form');
    projectFormDiv.appendChild(projectForm);
    projectFormEl = projectForm;

    const formContent = document.createElement('div');
    formContent.classList.add('project__form-content');
    projectForm.appendChild(formContent);

    const formIconWrapper = document.createElement('div');
    formIconWrapper.classList.add('project__form-icon');
    formContent.appendChild(formIconWrapper);

    const formIcon = document.createElement('i');
    formIcon.classList.add('ri-terminal-line');
    formIconWrapper.appendChild(formIcon);

    const formInput = document.createElement('input');
    formInput.classList.add('project__form-input');
    formInput.setAttribute('type', 'text');
    formInput.setAttribute('name', 'title');
    formInput.setAttribute('placeholder', 'Enter Project Name');
    formInput.value = inputValue;
    formContent.appendChild(formInput);

    const formBtnsWrapper = document.createElement('div');
    formBtnsWrapper.classList.add('project__form-btns');
    formContent.appendChild(formBtnsWrapper);

    const formAddBtn = document.createElement('button');
    formAddBtn.classList.add(addBtnClass);
    formAddBtn.setAttribute('type', 'submit');
    formAddBtn.textContent = addBtn;
    formBtnsWrapper.appendChild(formAddBtn);

    const formCancelBtn = document.createElement('button');
    formCancelBtn.classList.add('project__form-cancel-btn');
    formCancelBtn.setAttribute('type', 'button');
    formCancelBtn.textContent = 'Cancel';
    formBtnsWrapper.appendChild(formCancelBtn);
  };

  const renderProjects = (projectIndex) => {
    // create projectDiv
    projectsList.textContent = '';

    for (let i = 0; i < projects.projectsList.length; i += 1) {
      const projectDiv = document.createElement('div');

      if (parseInt(projectIndex, 10) !== i) {
        projectDiv.classList.add('project__item');
        projectDiv.setAttribute('data-index', i);
        projectsList.appendChild(projectDiv);

        // create content container
        const projectContent = document.createElement('div');
        projectContent.classList.add('project__content');
        projectDiv.appendChild(projectContent);

        // create icon
        const projectIconWrapper = document.createElement('div');
        projectIconWrapper.classList.add('project__icon');
        projectContent.appendChild(projectIconWrapper);
        const projectIcon = document.createElement('i');
        projectIcon.classList.add('ri-terminal-line');
        projectIconWrapper.appendChild(projectIcon);

        // create title
        const projectTitle = document.createElement('p');
        projectTitle.textContent = projects.projectsList[i].title;
        projectTitle.classList.add('project__title');
        projectContent.appendChild(projectTitle);

        // create settings icon
        const projectIconsContainer = document.createElement('div');
        projectIconsContainer.classList.add('project__setting-icons');
        projectDiv.appendChild(projectIconsContainer);

        const editIconWrapper = document.createElement('div');
        editIconWrapper.classList.add('project__edit-icon');
        projectIconsContainer.appendChild(editIconWrapper);

        const editIcon = document.createElement('i');
        editIcon.classList.add('ri-edit-line');
        editIconWrapper.appendChild(editIcon);

        const deleteIconWrapper = document.createElement('div');
        deleteIconWrapper.classList.add('project__delete-icon');
        projectIconsContainer.appendChild(deleteIconWrapper);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('ri-close-line');
        deleteIconWrapper.appendChild(deleteIcon);
      } else {
        renderFormProjects('edit', projectIndex);
      }
    }

    // add new form line
    renderFormProjects('add');
  };

  return {
    renderProjects,
  };
})();

export default dom;
