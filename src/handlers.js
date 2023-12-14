import dom from './dom';

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
      }
    });
  };

  return {
    clickHandler,
  };
})();

export default handlers;
