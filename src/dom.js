import projects from './projects';

const dom = (() => {
  const projectsList = document.querySelector('.project__container');

  const renderProjects = () => {
    // create projectDiv
    projectsList.textContent = '';

    for (let i = 0; i < projects.projectsList.length; i += 1) {
      const projectDiv = document.createElement('div');
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
      editIconWrapper.classList.add('project__delete-icon');
      projectIconsContainer.appendChild(deleteIconWrapper);

      const deleteIcon = document.createElement('i');
      editIcon.classList.add('ri-close-line');
      editIconWrapper.appendChild(deleteIcon);
    }
  };

  return {
    renderProjects,
  };
})();

export default dom;
