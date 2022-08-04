import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: 'submit' | 'utton' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = '#3134eb';
  @Input() color = 'white';
  @Input() fontSizeRem = 1.3;
  @Input() widthRem = 12;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
