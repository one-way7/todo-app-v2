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
        dom.showProjectModal();
      } else if (e.target.classList.contains('project__form-cancel-btn')) {
        dom.hideProjectModal();
      } else if (e.target.classList.contains('project__form-add-btn')) {
        validation.addProject(e, projectIndex, link);
      } else if (
        e.target.classList.contains('project__edit-icon') ||
        e.target.parentNode.classList.contains('project__edit-icon')
      ) {
        projectIndex = parseInt(
          e.target.closest('.project__item').getAttribute('data-index'),
          10,
        );
        dom.showEditProjectForm(projectIndex);
      } else if (e.target.classList.contains('project__form-edit-btn')) {
        validation.editProject(e, projectIndex, link);
      } else if (e.target.classList.contains('project__form-edit-cancel-btn')) {
        dom.hideEditProjectForm();
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
        projectIndex = parseInt(
          e.target.closest('.project__item').getAttribute('data-index'),
          10,
        );

        dom.changeLink(projectIndex);
        link = undefined;
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
        dom.hideAddTaskForm();
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
      } else if (e.target.classList.contains('task-form__edit-cancel-btn')) {
        dom.hideEditTaskForm(projectIndex);
        dom.hideElement(dom.formTaskTitleError);
      } else if (e.target.classList.contains('task-form__edit-btn')) {
        validation.editTask(e, projectIndex, taskIndex, link);
      }
    });
  };

  return {
    clickHandler,
  };
})();

export default handlers;
