import dom from './dom';
import validation from './validation';

const handlers = (() => {
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
        validation.addProject(e);
      }
    });
  };

  return {
    clickHandler,
  };
})();

export default handlers;
