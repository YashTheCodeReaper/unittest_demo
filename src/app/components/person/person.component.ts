import { Component, OnInit, Input } from '@angular/core';
import { Data } from 'src/app/types/data';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  @Input() person!: Data;

  constructor() {}

  ngOnInit(): void {}
}
