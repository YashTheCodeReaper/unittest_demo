import { Data } from './../../types/data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Data[] = [];
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<Data[]>('../../../assets/sample.json');
  }
}
