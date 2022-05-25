import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Data } from 'src/app/types/data';

import { DataService } from './data.service';

describe('DataService', () => {
  // variable to hold DataService
  let dataService: DataService;
  // variable to hold jasmine spy object of httpclient
  let httpClientSpy: any;
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

  // before each spec
  beforeEach(() => {
    // create a jasmine spy object of httpclient with only get method
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    // configure testbed which provides dataservice, with httpclient as the above spy
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    // get the injections accordingly
    dataService = TestBed.inject(DataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  // test whether the data service is created
  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  // test http fetching data
  it('should get data', (done: DoneFn) => {
    // whenever the methods access http client of get, it should return dummy data rather than actual data to reduce resource cost
    httpClientSpy.get.and.returnValue(of(dummyData));
    // call the getData method in the data service
    dataService.getData().subscribe({
      // upon successful fetching, use next, the subscription data's length should be equal to the dummy data length
      next: (data) => {
        expect(data.length).toBe(dummyData.length);
        done();
      },
      // throw error if any
      error: () => {
        done.fail;
      },
    });
    // the get method should be only called once.
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
