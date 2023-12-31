import { differenceInDays, format, parseISO } from 'date-fns';

import projects from './projects';

const dom = (() => {
  const body = document.querySelector('body');
  const formProjectTitleError = document.querySelector('.project-form__error');
  const formTaskTitleError = document.querySelector('.task-form__error');
  const projectsList = document.querySelector('.project__container');
  const tasksList = document.querySelector('.tasks__container');
  const projectFormContainer = document.querySelector('.project__modal');
  const projectForm = document.querySelector('.project__form');
  const newTaskBtn = document.querySelector('.new-task__btn');
  const addTaskFormContainer = document.querySelector('.task-form__container');
  const addTaskForm = document.querySelector('.task-form');

  const renderProjects = (projectIndex) => {
    projectsList.textContent = '';

    for (let i = 0; i < projects.projectsList.length; i += 1) {
      if (projectIndex === i) {
        const editProjectFormDiv = document.createElement('div');
        editProjectFormDiv.classList.add('edit-project__modal');
        projectsList.appendChild(editProjectFormDiv);

        const editProjectForm = document.createElement('form');
        editProjectForm.classList.add('project__form');
        editProjectForm.setAttribute('name', 'project__edit-form');
        editProjectFormDiv.appendChild(editProjectForm);

        const formContent = document.createElement('div');
        formContent.classList.add('project__form-content');
        editProjectForm.appendChild(formContent);

        const formIconWrapper = document.createElement('div');
        formIconWrapper.classList.add('project__form-icon');
        formContent.appendChild(formIconWrapper);

        const formIcon = document.createElement('i');
        formIcon.classList.add('ri-terminal-line');
        formIconWrapper.appendChild(formIcon);

        const formInput = document.createElement('input');
        formInput.classList.add('project__form-input');
        formInput.setAttribute('type', 'text');
        formInput.setAttribute('name', 'title');
        formInput.setAttribute('placeholder', 'Enter Project Name');
        formInput.value = projects.projectsList[projectIndex].title;
        formContent.appendChild(formInput);

        const formBtnsWrapper = document.createElement('div');
        formBtnsWrapper.classList.add('project__form-btns');
        formContent.appendChild(formBtnsWrapper);

        const formAddBtn = document.createElement('button');
        formAddBtn.classList.add('project__form-edit-btn');
        formAddBtn.setAttribute('type', 'submit');
        formAddBtn.textContent = 'Edit';
        formBtnsWrapper.appendChild(formAddBtn);

        const formCancelBtn = document.createElement('button');
        formCancelBtn.classList.add('project__form-edit-cancel-btn');
        formCancelBtn.setAttribute('type', 'button');
        formCancelBtn.textContent = 'Cancel';
        formBtnsWrapper.appendChild(formCancelBtn);

        // error field
        formContent.appendChild(formProjectTitleError);

        continue;
      }

      const projectLink = document.createElement('a');

      projectLink.classList.add('project__item');
      projectLink.setAttribute('data-index', i);
      projectsList.appendChild(projectLink);

      // create content container
      const projectContent = document.createElement('div');
      projectContent.classList.add('project__content');
      projectLink.appendChild(projectContent);

      // create icon
      const projectIconWrapper = document.createElement('div');
      projectIconWrapper.classList.add('project__icon');
      projectContent.appendChild(projectIconWrapper);
      const projectIcon = document.createElement('i');
      projectIcon.classList.add('ri-terminal-line');
      projectIconWrapper.appendChild(projectIcon);

      // create title
      const projectTitle = document.createElement('p');
      projectTitle.textContent = projects.projectsList[i].title;
      projectTitle.classList.add('project__title');
      projectContent.appendChild(projectTitle);

      // create settings icon
      const projectIconsContainer = document.createElement('div');
      projectIconsContainer.classList.add('project__setting-icons');
      projectLink.appendChild(projectIconsContainer);

      const editIconWrapper = document.createElement('div');
      editIconWrapper.classList.add('project__edit-icon');
      projectIconsContainer.appendChild(editIconWrapper);

      const editIcon = document.createElement('i');
      editIcon.classList.add('ri-edit-line');
      editIconWrapper.appendChild(editIcon);

      const deleteIconWrapper = document.createElement('div');
      deleteIconWrapper.classList.add('project__delete-icon');
      projectIconsContainer.appendChild(deleteIconWrapper);

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('ri-close-line');
      deleteIconWrapper.appendChild(deleteIcon);
    }

    projectsList.appendChild(projectFormContainer);
  };

  const renderTasks = (projectIndex, taskIndex, link = projectIndex) => {
    let indexStart;
    let indexEnd;
    const currDate = format(new Date(), 'yyyy-MM-dd');

    tasksList.textContent = '';

    if (projects.projectsList.length >= 1) {
      if (typeof link === 'number') {
        indexStart = projectIndex;
        indexEnd = projectIndex + 1;
      } else {
        indexStart = 0;
        indexEnd = projects.projectsList.length;
      }

      for (let i = indexStart; i < indexEnd; i += 1) {
        for (let j = 0; j < projects.projectsList[i].tasks.length; j += 1) {
          if (
            link === 'today' &&
            projects.projectsList[i].tasks[j].date !== currDate
          ) {
            continue;
          } else if (
            link === 'week' &&
            !(
              differenceInDays(
                parseISO(projects.projectsList[i].tasks[j].date),
                parseISO(currDate),
              ) >= 0 &&
              differenceInDays(
                parseISO(projects.projectsList[i].tasks[j].date),
                parseISO(currDate),
              ) <= 7
            )
          ) {
            continue;
          } else if (
            link === 'important' &&
            projects.projectsList[i].tasks[j].important !== true
          ) {
            continue;
          } else if (
            link === 'completed' &&
            projects.projectsList[i].tasks[j].completed !== true
          ) {
            continue;
          } else if (projectIndex === i && taskIndex === j) {
            const taskFormContainer = document.createElement('div');
            taskFormContainer.classList.add('edit-task-form__container');
            tasksList.appendChild(taskFormContainer);

            const taskForm = document.createElement('form');
            taskForm.classList.add('task-form');
            taskForm.setAttribute('name', 'task__edit-form');
            taskForm.setAttribute('data-project-index', projectIndex);
            taskFormContainer.appendChild(taskForm);

            const taskFormContent = document.createElement('div');
            taskFormContent.classList.add('task-form__content');
            taskForm.appendChild(taskFormContent);

            const taskFormIcon = document.createElement('i');
            taskFormIcon.classList.add('ri-list-check-3');
            taskFormContent.appendChild(taskFormIcon);

            const taskFormTitleInput = document.createElement('input');
            taskFormTitleInput.classList.add('task-form__title-input');
            taskFormTitleInput.setAttribute('type', 'text');
            taskFormTitleInput.setAttribute('name', 'title');
            taskFormTitleInput.setAttribute('placeholder', 'Enter Task Name');
            taskFormTitleInput.value = projects.projectsList[i].tasks[j].title;
            taskFormContent.appendChild(taskFormTitleInput);

            const taskFormDateInput = document.createElement('input');
            taskFormDateInput.classList.add('task-form__date-input');
            taskFormDateInput.setAttribute('type', 'date');
            taskFormDateInput.setAttribute('name', 'date');
            taskFormDateInput.value = projects.projectsList[i].tasks[j].date;
            taskFormContent.appendChild(taskFormDateInput);

            const taskFormAddBtn = document.createElement('button');
            taskFormAddBtn.classList.add('task-form__edit-btn');
            taskFormAddBtn.setAttribute('type', 'submit');
            taskFormAddBtn.textContent = 'Edit';
            taskFormContent.appendChild(taskFormAddBtn);

            const taskFormCancelBtn = document.createElement('button');
            taskFormCancelBtn.classList.add('task-form__edit-cancel-btn');
            taskFormCancelBtn.setAttribute('type', 'button');
            taskFormCancelBtn.textContent = 'Cancel';
            taskFormContent.appendChild(taskFormCancelBtn);

            taskFormContent.appendChild(formTaskTitleError);

            continue;
          }

          const taskItem = document.createElement('div');
          taskItem.classList.add('new-task');
          taskItem.setAttribute('data-project-index', i);
          taskItem.setAttribute('data-task-index', j);
          tasksList.appendChild(taskItem);

          const taskLeftContentWrapper = document.createElement('div');
          taskLeftContentWrapper.classList.add('new-task__left');
          taskItem.appendChild(taskLeftContentWrapper);

          const taskDoneIconWrapper = document.createElement('div');
          const isCompleted = projects.projectsList[i].tasks[j].completed;
          taskDoneIconWrapper.classList.add('new-task__done-icon');
          if (isCompleted) taskDoneIconWrapper.classList.add('done');
          taskLeftContentWrapper.appendChild(taskDoneIconWrapper);

          const taskDoneIcon = document.createElement('i');
          taskDoneIcon.classList.add('ri-square-line');
          taskDoneIconWrapper.appendChild(taskDoneIcon);

          const taskTitle = document.createElement('p');
          taskTitle.classList.add('new-task__name');
          if (isCompleted) taskTitle.classList.add('done');
          taskTitle.textContent = projects.projectsList[i].tasks[j].title;
          taskLeftContentWrapper.appendChild(taskTitle);

          const taskRightContentWrapper = document.createElement('div');
          taskRightContentWrapper.classList.add('new-task__right');
          taskItem.appendChild(taskRightContentWrapper);

          const taskProjectNameWrapper = document.createElement('div');
          taskProjectNameWrapper.classList.add('new-task__project');
          taskRightContentWrapper.appendChild(taskProjectNameWrapper);

          const taskProjectIcon = document.createElement('i');
          taskProjectIcon.classList.add(
            'ri-terminal-line',
            'new-task__project-icon',
          );
          taskProjectNameWrapper.appendChild(taskProjectIcon);

          const taskProjectName = document.createElement('p');
          taskProjectName.classList.add('new-task__project-title');
          taskProjectName.textContent = projects.projectsList[i].title;
          taskProjectNameWrapper.appendChild(taskProjectName);

          if (projects.projectsList[i].tasks[j].date !== '') {
            const taskDate = document.createElement('div');
            taskDate.classList.add('new-task__date');
            taskDate.textContent = projects.projectsList[i].tasks[j].date;
            taskRightContentWrapper.appendChild(taskDate);
          }

          const taskImportantIconWrapper = document.createElement('div');
          taskImportantIconWrapper.classList.add('new-task__important-icon');
          taskRightContentWrapper.appendChild(taskImportantIconWrapper);

          const taskImportantIcon = document.createElement('i');
          const taskImportantIconClass = projects.projectsList[i].tasks[j]
            .important
            ? 'ri-star-fill'
            : 'ri-star-line';
          taskImportantIcon.classList.add(taskImportantIconClass);
          taskImportantIconWrapper.appendChild(taskImportantIcon);

          const taskEditIconWrapper = document.createElement('div');
          taskEditIconWrapper.classList.add('new-task__edit-icon');
          taskRightContentWrapper.appendChild(taskEditIconWrapper);

          const taskEditIcon = document.createElement('i');
          taskEditIcon.classList.add('ri-edit-line');
          taskEditIconWrapper.appendChild(taskEditIcon);

          const taskDeleteIconWrapper = document.createElement('div');
          taskDeleteIconWrapper.classList.add('new-task__delete-icon');
          taskRightContentWrapper.appendChild(taskDeleteIconWrapper);

          const taskDeleteIcon = document.createElement('i');
          taskDeleteIcon.classList.add('ri-close-line');
          taskDeleteIconWrapper.appendChild(taskDeleteIcon);
        }
      }

      if (
        tasksList.querySelectorAll('.new-task').length === 0 &&
        tasksList.querySelector('.edit-task-form__container') === null
      ) {
        const noTaskLine = document.createElement('div');
        noTaskLine.classList.add('no-task__line');
        tasksList.appendChild(noTaskLine);

        const noTaskIcon = document.createElement('i');
        noTaskIcon.classList.add('ri-chat-smile-2-line');
        noTaskLine.appendChild(noTaskIcon);

        const noTaskText = document.createElement('p');
        noTaskText.textContent = 'Yay! No Tasks!';
        noTaskLine.appendChild(noTaskText);
      }

      // renderTasksForm(projectIndex);
      tasksList.appendChild(addTaskFormContainer);
      tasksList.appendChild(newTaskBtn);
      // add task line
    } else {
      const noProjectLine = document.createElement('div');
      noProjectLine.classList.add('task__no-project');
      tasksList.appendChild(noProjectLine);

      const noProjectIcon = document.createElement('i');
      noProjectIcon.classList.add('ri-error-warning-line');
      noProjectLine.appendChild(noProjectIcon);

      const noProjectText = document.createTextNode(
        "You don't have any projects, create one.",
      );
      noProjectLine.appendChild(noProjectText);
    }
  };

  const showProjectModal = () => {
    projectForm.reset();
    projectFormContainer.classList.remove('hide');
    projectFormContainer.classList.add('display');
  };

  const hideProjectModal = () => {
    projectFormContainer.classList.remove('display');
    projectFormContainer.classList.add('hide');
  };

  const showEditProjectForm = (projectIndex) => {
    renderProjects(projectIndex);
  };

  const hideEditProjectForm = () => {
    renderProjects();
  };

  const showEditTaskForm = (projectIndex, taskIndex, link) => {
    renderTasks(projectIndex, taskIndex, link);
  };

  const hideEditTaskForm = (projectIndex, taskIndex, link) => {
    renderTasks(projectIndex, taskIndex, link);
  };

  const showAddTaskForm = () => {
    addTaskForm.reset();
    addTaskFormContainer.classList.remove('hide');
    addTaskFormContainer.classList.add('display');
  };

  const hideAddTaskForm = () => {
    addTaskFormContainer.classList.remove('display');
    addTaskFormContainer.classList.add('hide');
  };

  const showAddTaskButton = () => {
    newTaskBtn.classList.remove('hide');
    newTaskBtn.classList.add('display');
  };

  const hideAddTaskButton = () => {
    newTaskBtn.classList.remove('display');
    newTaskBtn.classList.add('hide');
  };

  const showElement = (elem) => {
    elem.classList.remove('hide');
    elem.classList.add('display');
  };

  const hideElement = (elem) => {
    elem.classList.add('hide');
    elem.classList.remove('display');
  };

  const selectLink = (projectIndex) => {
    const allLinks = document.querySelectorAll('.nav__link, .project__item');

    const inboxLink = document.querySelector('.inbox__link');
    const todayLink = document.querySelector('.today__link');
    const nextDaysLink = document.querySelector('.next__link');
    const importantLink = document.querySelector('.important__link');
    const completedLink = document.querySelector('.completed__link');
    const projectLinks = document.querySelectorAll('.project__item');

    allLinks.forEach((link) => {
      link.classList.remove('active');
    });

    if (typeof projectIndex === 'number') {
      projectLinks[projectIndex].classList.add('active');
    } else if (projectIndex === 'inbox') {
      inboxLink.classList.add('active');
    } else if (projectIndex === 'today') {
      todayLink.classList.add('active');
    } else if (projectIndex === 'week') {
      nextDaysLink.classList.add('active');
    } else if (projectIndex === 'important') {
      importantLink.classList.add('active');
    } else if (projectIndex === 'completed') {
      completedLink.classList.add('active');
    }
  };

  const renderHeader = (projectIndex) => {
    const headerTitle = document.querySelector('.main__header');

    if (typeof projectIndex === 'number') {
      headerTitle.textContent = projects.projectsList[projectIndex].title;
      document.title = `${projects.projectsList[projectIndex].title} - TODO`;
    } else {
      headerTitle.textContent =
        projectIndex[0].toUpperCase() + projectIndex.slice(1);
      document.title = projectIndex[0].toUpperCase() + projectIndex.slice(1);
    }
  };

  const changeLink = (projectIndex = 'inbox') => {
    selectLink(projectIndex);
    renderHeader(projectIndex);
    renderTasks(projectIndex);

    if (typeof projectIndex === 'number') {
      showAddTaskButton();
    } else {
      hideAddTaskButton();
      hideAddTaskForm();
    }
  };

  return {
    body,
    formProjectTitleError,
    showProjectModal,
    showEditProjectForm,
    hideEditProjectForm,
    hideProjectModal,
    renderProjects,
    showElement,
    hideElement,
    changeLink,
    renderTasks,
    showAddTaskForm,
    hideAddTaskForm,
    formTaskTitleError,
    showEditTaskForm,
    hideEditTaskForm,
    showAddTaskButton,
    hideAddTaskButton,
  };
})();

export default dom;
