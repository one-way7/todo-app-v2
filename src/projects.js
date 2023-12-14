import dom from './dom';

const projects = (() => {
  const projectsList = [
    {
      title: 'Default',
      tasks: [],
    },
  ];

  class Project {
    tasks = [];

    constructor(title) {
      this.title = title;
    }
  }

  const createProject = (title) => {
    const newProject = new Project(title);
    projectsList.push(newProject);
    dom.renderProjects();
  };

  const editProject = (title, index) => {
    projectsList[index].title = title;
    dom.renderProjects();
  };

  const removeProject = (index) => {
    projectsList.splice(index, 1);
    dom.renderProjects();
  };

  return {
    projectsList,
    createProject,
    editProject,
    removeProject,
  };
})();

export default projects;
