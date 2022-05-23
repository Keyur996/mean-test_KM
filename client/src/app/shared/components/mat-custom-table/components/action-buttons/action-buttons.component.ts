import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableConsts } from './constants/table.constant';
import { TableButtonAction } from './models/tableButtonAction.model';

@Component({
  selector: '[action-buttons]',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() value!: string;
  @Output() buttonAction: EventEmitter<TableButtonAction> =
    new EventEmitter<TableButtonAction>();

  onEditClick() {
    this.buttonAction.emit({
      name: TableConsts.actionButton.edit,
      value: this.value,
    });
  }
  onDeleteClick() {
    this.buttonAction.emit({
      name: TableConsts.actionButton.delete,
      value: this.value,
    });
  }
}
