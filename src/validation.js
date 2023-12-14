import dom from './dom';
import projects from './projects';

const validation = (() => {
  const addProject = (e) => {
    const projectTitle = document.forms['project__form'].querySelector(
      'input[name="title"]',
    ).value;

    e.preventDefault();

    if (projectTitle !== '') {
      projects.createProject(projectTitle);
      dom.hideElement(dom.formProjectTitleError);
      dom.hideProjectModal();
    } else if (projectTitle === '') {
      dom.showElement(dom.formProjectTitleError);
    }
  };

  const editProject = (e, projectIndex) => {
    const projectTitle = document.forms['project__edit-form'].querySelector(
      'input[name="title"]',
    ).value;

    e.preventDefault();

    if (projectTitle !== '') {
      projects.editProject(projectTitle, projectIndex);
      dom.renderProjects();
    } else if (projectTitle === '') {
      dom.showElement(dom.formProjectTitleError);
    }
  };

  return {
    addProject,
    editProject,
  };
})();

export default validation;
