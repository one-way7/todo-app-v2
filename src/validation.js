import dom from './dom';
import projects from './projects';
import tasks from './tasks';

const validation = (() => {
  const addProject = (e, projectIndex, link) => {
    const projectTitle = document.forms['project__form']['title'].value;

    e.preventDefault();

    if (projectTitle !== '') {
      dom.hideProjectModal();
      projects.createProject(projectTitle, projectIndex, link);
      dom.hideElement(dom.formProjectTitleError);
    } else if (projectTitle === '') {
      dom.showElement(dom.formProjectTitleError);
    }
  };

  const editProject = (e, projectIndex, link) => {
    const projectTitle = document.forms['project__edit-form']['title'].value;

    e.preventDefault();

    if (projectTitle !== '') {
      projects.editProject(projectTitle, projectIndex, link);
      dom.hideElement(dom.formProjectTitleError);
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
      dom.hideAddTaskForm();
      tasks.createTask(projectIndex, taskTitle, taskDate);
    } else {
      dom.showElement(dom.formTaskTitleError);
    }
  };

  const editTask = (e, projectIndex, taskIndex, link) => {
    e.preventDefault();
    const taskTitle = document.forms['task__edit-form']['title'].value;
    const taskDate = document.forms['task__edit-form']['date'].value;

    if (taskTitle !== '') {
      dom.hideElement(dom.formTaskTitleError);
      tasks.editTask(taskTitle, taskDate, projectIndex, taskIndex, link);
    } else {
      dom.showElement(dom.formTaskTitleError);
    }
  };

  return {
    addProject,
    editProject,
    addTask,
    editTask,
  };
})();

export default validation;
