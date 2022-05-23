import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableButtonAction } from './components/action-buttons/models/tableButtonAction.model';
import { TableColumn } from './components/action-buttons/models/tableColumn.model';

@Component({
  selector: 'app-mat-custom-table',
  templateUrl: './mat-custom-table.component.html',
  styleUrls: ['./mat-custom-table.component.scss'],
})
export class MatCustomTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() action: EventEmitter<TableButtonAction> =
    new EventEmitter<TableButtonAction>();
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() columns!: Array<TableColumn>;
  @Input() dataset!: Observable<Array<any>>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  value!: string;
  sub!: Subscription;
  pageSize: number = 10;
  currentPage: number = 0;
  count: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.sub = this.dataset.subscribe({
      next: (result: any) => {
        this.displayedColumns = [];
        // set table columns
        this.displayedColumns = this.displayedColumns.concat(
          this.columns.map((x) => x.columnDef)
        ); // pre-fix static

        // add action column
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource<any>(result.data);
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = result.count;
        });
        // set pagination
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getImageUrl(row: any, column: TableColumn) {
    return row[column.columnDef];
  }

  onTableAction(e: TableButtonAction): void {
    this.action.emit(e);
  }

  pageChanged(event: PageEvent) {
    let query: any = {};
    query['limit'] = this.pageSize = event.pageSize;
    query['page'] = event.pageIndex + 1;
    this.currentPage = event.pageIndex;
    this.onPageChanged.emit(query);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getValue(_valueObj: any, column: any) {
    return _.map(_valueObj || [], (_value) => _value[column.field]).join(', ');
  }
}
