import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-control',
  templateUrl: './label-control.component.html',
  styleUrls: ['./label-control.component.scss'],
  standalone:false
})
export class LabelControlComponent implements OnInit {
  @Input() public label: string = "";
  @Input() public value: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
