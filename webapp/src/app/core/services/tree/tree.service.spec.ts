import { DatePipe, DecimalPipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GridPipe } from '@app/shared/pipes/grid.pipe';
import { NumberPipe } from '@app/shared/pipes/number.pipe';
import { TreeGridService } from './tree.service';
describe('Tree Service Pipe', () => {
  let service: TreeGridService;
  let gridPipe: GridPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GridPipe,
        NumberPipe,
        DatePipe,
        DecimalPipe,
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });
    gridPipe = TestBed.get(GridPipe);
    service = new TreeGridService(gridPipe);
  });

  it('should Group the provided items ', () => {
    const items = [
      {
        code: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        age: '45',
        date: '12/02/1989',
        resident: true,
        country: {
          name: 'France',
          abbreviation: 'FR',
        },
        gender: 'Female',
      },
      {
        code: 2,
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        age: '56',
        date: '10/08/1979',
        resident: false,
        country: {
          name: 'Germany',
          abbreviation: 'DE',
        },
        gender: 'Male',
      },
    ];
    expect(service.createTreeNode(items, 'email', null)).toBeTruthy();
  });
});
