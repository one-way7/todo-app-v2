import dom from './dom';
import validation from './validation';
import projects from './projects';

const handlers = (() => {
  let projectIndex = 0;

  const clickHandler = () => {
    dom.body.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('add-project__icon') ||
        e.target.parentNode.classList.contains('add-project__icon')
      ) {
        dom.hideElement(dom.formProjectTitleError);
        dom.hideEditProjectForm();
        dom.showProjectModal();
      } else if (e.target.classList.contains('project__form-cancel-btn')) {
        if (
          e.target.previousSibling.classList.contains('project__form-add-btn')
        ) {
          dom.hideProjectModal();
        } else {
          dom.hideEditProjectForm();
        }
      } else if (e.target.classList.contains('project__form-add-btn')) {
        validation.addProject(e);
      } else if (
        e.target.classList.contains('project__edit-icon') ||
        e.target.parentNode.classList.contains('project__edit-icon')
      ) {
        projectIndex = e.target
          .closest('.project__item')
          .getAttribute('data-index');
        dom.hideElement(dom.formProjectTitleError);
        dom.hideProjectModal();
        dom.showEditProjectForm(projectIndex);
      } else if (e.target.classList.contains('project__form-edit-btn')) {
        validation.editProject(e, projectIndex);
      } else if (
        e.target.classList.contains('project__delete-icon') ||
        e.target.parentNode.classList.contains('project__delete-icon')
      ) {
        projectIndex = e.target
          .closest('.project__item')
          .getAttribute('data-index');
        projects.removeProject(projectIndex);
      }
    });
  };

  return {
    clickHandler,
  };
})();

export default handlers;
