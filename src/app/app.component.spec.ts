import { PersonComponent } from './components/person/person.component';
import { DataService } from './services/data/data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Data } from './types/data';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// describe the test suite for app component
describe('AppComponent', () => {
  // variable to hold app component instance
  let appComponent: AppComponent;
  // variable to hold app component fixture
  let appFixture: ComponentFixture<AppComponent>;
  // variable to hold app component dom
  let appComponentDom: any;
  // variable to hold spy of Data service
  let mockDataService: any;
  // to test with dummy data
  let dummyData: Data[] = [
    {
      id: 1,
      name: 'Suraj',
      designation: 'Technical Lead',
    },
    {
      id: 2,
      name: 'Varsha',
      designation: 'Associate Technical Lead',
    },
    {
      id: 3,
      name: 'Sirajuddin',
      designation: 'Associate Technical Lead',
    },
  ];

  // before each test cases
  beforeEach(() => {
    // create a spy object with method getData
    mockDataService = jasmine.createSpyObj(['getData']);
    // return the dummyData value instead of actual http get data
    mockDataService.getData.and.returnValue(of(dummyData));

    // configure the testing module
    TestBed.configureTestingModule({
      declarations: [AppComponent, PersonComponent],
      providers: [
        {
          provide: DataService,
          useValue: mockDataService,
        },
      ],
    }).compileComponents();

    // create fixture of app component
    appFixture = TestBed.createComponent(AppComponent);
    // create instance of app component
    appComponent = appFixture.componentInstance;
    // assign app component debug element
    appComponentDom = appFixture.debugElement;
  });

  // check whether the app component is created
  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  // check whether the getData method is called 1 time exactly
  it('should call the getData method from data service one time on ngOnInit', () => {
    appFixture.detectChanges();
    expect(mockDataService.getData).toHaveBeenCalledTimes(1);
  });

  // check whether the data field in app component is equal as dummyData
  it('should assign the data field of app component to the dummy data', () => {
    appFixture.detectChanges();
    expect(appComponent.data).toEqual(dummyData);
  });

  // check whether the child component is rendered only as many times as dummyData's length
  it('should render same number of components as in data property', () => {
    appFixture.detectChanges();
    const personComponentEls = appComponentDom.queryAll(
      By.directive(PersonComponent)
    );
    expect(personComponentEls.length).toBe(dummyData.length);
  });
});
