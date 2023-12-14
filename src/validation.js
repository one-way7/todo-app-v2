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
      dom.renderProjects();
      dom.hideProjectModal();
    } else {
      dom.showElement(dom.formProjectTitleError);
    }
  };

  return {
    addProject,
  };
})();

export default validation;
