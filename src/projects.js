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
  };

  return {
    projectsList,
    createProject,
  };
})();

export default projects;
