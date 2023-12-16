import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    important = false;

    completed = false;

    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  }

  const createTask = (projectIndex, title, date = '') => {
    const newTask = new Task(title, date);

    projects.projectsList[projectIndex].tasks.push(newTask);

    dom.renderTasks(projectIndex);
  };

  const removeTask = (projectIndex, taskIndex, link = projectIndex) => {
    projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
    dom.renderTasks(link);
  };

  const editTask = (title, date, projectIndex, taskIndex, link) => {
    projects.projectsList[projectIndex].tasks[taskIndex].title = title;
    projects.projectsList[projectIndex].tasks[taskIndex].date = date;

    dom.renderTasks(link);
  };

  const toggleImportantStatus = (
    projectIndex,
    taskIndex,
    link = projectIndex,
  ) => {
    projects.projectsList[projectIndex].tasks[taskIndex].important =
      !projects.projectsList[projectIndex].tasks[taskIndex].important;

    dom.renderTasks(link);
  };

  const togglecompletedStatus = (
    projectIndex,
    taskIndex,
    link = projectIndex,
  ) => {
    projects.projectsList[projectIndex].tasks[taskIndex].completed =
      !projects.projectsList[projectIndex].tasks[taskIndex].completed;

    dom.renderTasks(link);
  };

  return {
    createTask,
    removeTask,
    editTask,
    toggleImportantStatus,
    togglecompletedStatus,
  };
})();

export default tasks;
