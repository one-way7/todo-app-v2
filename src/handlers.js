import dom from './dom';
import validation from './validation';
import projects from './projects';
import tasks from './tasks';

const handlers = (() => {
  let projectIndex = 0;
  let taskIndex = 0;
  let link = 'inbox';

  const clickHandler = () => {
    dom.body.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('add-project__icon') ||
        e.target.parentNode.classList.contains('add-project__icon')
      ) {
        dom.hideElement(dom.formProjectTitleError);
        dom.hideEditProjectForm();
        dom.showProjectModal();
      } else if (e.target.classList.contains('project__form-cancel-btn')) {
        if (
          e.target.previousSibling.classList.contains('project__form-add-btn')
        ) {
          dom.hideProjectModal();
        } else {
          dom.hideEditProjectForm();
        }
      } else if (e.target.classList.contains('project__form-add-btn')) {
        validation.addProject(e);
      } else if (
        e.target.classList.contains('project__edit-icon') ||
        e.target.parentNode.classList.contains('project__edit-icon')
      ) {
        projectIndex = parseInt(
          e.target.closest('.project__item').getAttribute('data-index'),
          10,
        );
        dom.hideElement(dom.formProjectTitleError);
        dom.hideProjectModal();
        dom.showEditProjectForm(projectIndex);
      } else if (e.target.classList.contains('project__form-edit-btn')) {
        validation.editProject(e, projectIndex, link);
      } else if (
        e.target.classList.contains('project__delete-icon') ||
        e.target.parentNode.classList.contains('project__delete-icon')
      ) {
        projectIndex = parseInt(
          e.target.closest('.project__item').getAttribute('data-index'),
          10,
        );
        projects.removeProject(projectIndex);
      } else if (e.target.closest('.project__item')) {
        link = undefined;
        projectIndex = parseInt(
          e.target.closest('.project__item').getAttribute('data-index'),
          10,
        );
        dom.changeLink(projectIndex);
      } else if (
        e.target.closest('.nav__link')?.classList.contains('inbox__link')
      ) {
        link = 'inbox';
        dom.changeLink('inbox');
      } else if (
        e.target.closest('.nav__link')?.classList.contains('today__link')
      ) {
        link = 'today';
        dom.changeLink('today');
      } else if (
        e.target.closest('.nav__link')?.classList.contains('next__link')
      ) {
        link = 'week';
        dom.changeLink('week');
      } else if (
        e.target.closest('.nav__link')?.classList.contains('important__link')
      ) {
        link = 'important';
        dom.changeLink('important');
      } else if (
        e.target.closest('.nav__link')?.classList.contains('completed__link')
      ) {
        link = 'completed';
        dom.changeLink('completed');
      } else if (e.target.closest('.new-task__btn')) {
        dom.showAddTaskForm(projectIndex);
      } else if (e.target.classList.contains('task-form__cancel-btn')) {
        dom.closeAddTaskForm(projectIndex);
      } else if (e.target.classList.contains('task-form__add-btn')) {
        validation.addTask(e, projectIndex);
      } else if (
        e.target.classList.contains('new-task__delete-icon') ||
        e.target.parentNode.classList.contains('new-task__delete-icon')
      ) {
        taskIndex = parseInt(
          e.target.closest('.new-task').getAttribute('data-task-index'),
          10,
        );

        tasks.removeTask(projectIndex, taskIndex, link);
      } else if (
        e.target.classList.contains('new-task__edit-icon') ||
        e.target.parentNode.classList.contains('new-task__edit-icon')
      ) {
        taskIndex = parseInt(
          e.target.closest('.new-task').getAttribute('data-task-index'),
          10,
        );
        dom.showEditTaskForm(projectIndex, taskIndex);
      }
    });
  };

  return {
    clickHandler,
  };
})();

export default handlers;
