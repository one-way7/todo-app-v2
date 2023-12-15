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

  const createProject = (title, projectIndex, link) => {
    const newProject = new Project(title);
    projectsList.push(newProject);
    dom.renderProjects();

    if (link === undefined) {
      dom.changeLink(projectIndex);
    } else {
      dom.changeLink(link);
    }
  };

  const editProject = (title, index, link) => {
    projectsList[index].title = title;

    dom.renderProjects();
    if (link === undefined) {
      dom.changeLink(index);
    } else {
      dom.changeLink(link);
    }
  };

  const removeProject = (index) => {
    projectsList.splice(index, 1);
    dom.renderProjects();
    dom.changeLink('inbox');
  };

  return {
    projectsList,
    createProject,
    editProject,
    removeProject,
  };
})();

export default projects;
