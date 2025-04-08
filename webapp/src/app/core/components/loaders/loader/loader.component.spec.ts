import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let loderService: LoaderService;
  beforeEach(() => {
    loderService = new LoaderService();
    component = new LoaderComponent(loderService);
  });
  describe('ngOnInit', () => {
    it('should set the show variable to true', () => {
      expect(component.show).toBeFalsy();
      component.ngOnInit();
      loderService.show();
      expect(component.show).toBeTruthy();
    });
    it('should set the show variable to false', () => {
      expect(component.show).toBeFalsy();
      component.ngOnInit();
      loderService.hide();
      expect(component.show).toBeFalsy();
    });
  });
});
