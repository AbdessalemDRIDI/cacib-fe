import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessageModule } from 'primeng/message';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ValidatorComponent } from './validator.component';

describe('ValidatorComponent', () => {
  let component: ValidatorComponent;
  let fixture: ComponentFixture<ValidatorComponent>;
  function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MessageModule,
        TranslateModule.forChild({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        ValidatorComponent,
      ],
      providers: [TranslateStore, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
