import CopyPreviewLinkBtn from './extensions/components/CopyPreviewLinkBtn';

export default {
  bootstrap(app) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'CopyPreviewLinkBtn',
      Component: CopyPreviewLinkBtn,
    });
  },
};
