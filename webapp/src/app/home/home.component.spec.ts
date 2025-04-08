import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { FeatureService } from '@services/feature/feature.service';
import { MenuService } from '@services/menu/menu.service';
import { MessagesService } from '@services/messages/message.service';
import { MainComponent } from './home.component';

describe('Home component', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let service: MenuService, mockMenuManagerService;
  const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
  let menu = {
    link: ['/'],
    label: 'Home',
    items: [
      {
        label: 'Buttons',
        roles: ['admin'],
        items: [
          {
            label: 'Button',
            roles: ['admin'],
            id: 'button',
            link: ['/buttons/edit-1'],
            params: {},
          },
        ],
      },
    ],
  };

  beforeEach(waitForAsync(async () => {
    let mockAuthManagerService = {
      isUserRolesHas: () => true,
      logout: () => true,
      getUserName: () => 'SimpleUser',
    };
    let mockMenuManagerService = {
      filterByRole: () => {
        return [
          {
            link: ['/'],
            label: 'Home',
            items: [
              {
                label: 'Buttons',
                roles: ['admin'],
                items: [
                  {
                    label: 'Button',
                    roles: ['admin'],
                    id: 'button',
                    link: ['/buttons/edit-1'],
                    params: {},
                  },
                ],
              },
            ],
          },
        ];
      },
      setMenuState: () => true,
      getMenuInitialState: () => true,
    };
    let mockHttpClient = {};
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        { provide: AuthManagerService, useValue: mockAuthManagerService },
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: FeatureService, useValue: {} },
        { provide: MenuService, useValue: mockMenuManagerService },
        { provide: MessagesService, useValue: {} },
        { provide: Router, useValue: mockRouter },
        HttpHandler,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
