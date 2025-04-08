import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { of } from 'rxjs';
import { VirtualScrollComponent } from './virtual-scroll.component';

describe('VirtualScrollComponent', () => {
  let component: VirtualScrollComponent;
  let fixture: ComponentFixture<VirtualScrollComponent>;
  let mockValueObservable: any[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualScrollerModule, VirtualScrollComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    component.valueObservable = of(mockValueObservable);
    component.valueObservable.subscribe(async (value) => {
      console.log('value', value);
      component.valueObservable = await value;
      done();
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
