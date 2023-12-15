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

  return {
    createTask,
    removeTask,
  };
})();

export default tasks;
