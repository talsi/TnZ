import { TnzPage } from './app.po';

describe('tnz App', function() {
  let page: TnzPage;

  beforeEach(() => {
    page = new TnzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
