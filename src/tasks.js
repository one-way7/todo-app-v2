import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    important = false;

    done = false;

    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  }

  const createTask = (projectIndex, title, date = '', link = projectIndex) => {
    const newTask = new Task(title, date);

    projects.projectsList[projectIndex].tasks.push(newTask);

    dom.renderTasks(projectIndex);
  };

  return {
    createTask,
  };
})();

export default tasks;
