import { DataService } from './services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { Data } from './types/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: Data[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): any {
    this.dataService.getData().subscribe((data: any) => {
      this.data = data;
    });
  }
}
