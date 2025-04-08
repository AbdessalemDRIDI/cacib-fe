import { LoaderService } from './loader.service';

describe('Loader Service', () => {
  let loaderService: LoaderService;
  beforeEach(() => {
    loaderService = new LoaderService();
  });
  it('should show the loader', () => {
    loaderService.show();
    loaderService.loaderState.subscribe((state) => {
      expect(state).toBeTruthy();
    });
  });
  it('should hide the loader', () => {
    loaderService.hide();
    loaderService.loaderState.subscribe((state) => {
      expect(state).toBeFalsy();
    });
  });
});
