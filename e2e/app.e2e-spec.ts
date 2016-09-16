import { TnZPage } from './app.po';

describe('tn-z App', function() {
  let page: TnZPage;

  beforeEach(() => {
    page = new TnZPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
