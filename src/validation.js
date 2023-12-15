import dom from './dom';
import projects from './projects';
import tasks from './tasks';

const validation = (() => {
  const addProject = (e) => {
    const projectTitle = document.forms['project__form']['title'].value;

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
    const projectTitle = document.forms['project__edit-form']['title'].value;

    e.preventDefault();

    if (projectTitle !== '') {
      dom.hideElement(dom.formProjectTitleError);
      projects.editProject(projectTitle, projectIndex);
      dom.renderProjects();
    } else if (projectTitle === '') {
      dom.showElement(dom.formProjectTitleError);
    }
  };

  const addTask = (e, projectIndex) => {
    const taskTitle = document.forms['task__form']['title'].value;
    const taskDate = document.forms['task__form']['date'].value;

    e.preventDefault();

    if (taskTitle !== '') {
      dom.hideElement(dom.formTaskTitleError);
      tasks.createTask(projectIndex, taskTitle, taskDate);
    } else {
      dom.showElement(dom.formTaskTitleError);
    }
  };

  return {
    addProject,
    editProject,
    addTask,
  };
})();

export default validation;
