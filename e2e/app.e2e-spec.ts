import { SykenotePage } from './app.po';

describe('sykenote App', () => {
  let page: SykenotePage;

  beforeEach(() => {
    page = new SykenotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
