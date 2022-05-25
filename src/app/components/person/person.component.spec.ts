import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Data } from 'src/app/types/data';

import { PersonComponent } from './person.component';

// describe a test suite for person component
describe('PersonComponent', () => {
  // variable to store the person component instance
  let personComponent: PersonComponent;
  // fixture of person component
  let fixture: ComponentFixture<PersonComponent>;
  // variable to access the native elements of the dom
  let personComponentDom: any;
  // sample input data
  let dummyPerson: Data = {
    id: 1,
    name: 'Varsha',
    designation: 'Associate Technical Lead',
  };

  // before each test case
  beforeEach(async () => {
    // configure the testing module
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
    // create the fixture
    fixture = TestBed.createComponent(PersonComponent);
    // create the instance of the component
    personComponent = fixture.componentInstance;
    // create the dom
    personComponentDom = fixture.nativeElement;
  });

  // check whether the person component is created
  it('should create person component', () => {
    expect(personComponent).toBeTruthy();
  });

  // check the render results
  it('should render the person data into template of the component', () => {
    // assign the @Input() person property to the dummyPerson value
    personComponent.person = dummyPerson;
    // update the changes
    fixture.detectChanges();
    // select the p tag
    const nameEl = personComponentDom.querySelector('p');
    // check the contents
    expect(nameEl?.textContent).toEqual(dummyPerson.name.toUpperCase());
  });
});
