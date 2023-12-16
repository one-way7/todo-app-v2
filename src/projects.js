import dom from './dom';

const projects = (() => {
  let projectsList = [];

  if (localStorage.getItem('projects') === null) {
    projectsList = [
      {
        title: 'Default Project',
        tasks: [],
      },
    ];
  } else {
    const projectFromStorage = JSON.parse(localStorage.getItem('projects'));
    projectsList = projectFromStorage;
  }

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
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  const editProject = (title, index, link) => {
    projectsList[index].title = title;
    dom.renderProjects();
    if (link === undefined) {
      dom.changeLink(index);
    } else {
      dom.changeLink(link);
    }
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  const removeProject = (index) => {
    projectsList.splice(index, 1);
    dom.renderProjects();
    dom.changeLink('inbox');
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  return {
    projectsList,
    createProject,
    editProject,
    removeProject,
  };
})();

export default projects;
