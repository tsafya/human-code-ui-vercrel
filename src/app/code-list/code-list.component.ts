import { Component, OnInit } from '@angular/core';
import {ColDef, GridApi, GridReadyEvent, RowValueChangedEvent} from "ag-grid-community";
import {ApiService, nameCodes, names} from "../services/api.service";
import {concatMap} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss']
})
export class CodeListComponent implements OnInit {
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    {field: 'name', filter: true},
    {field: 'code', width: 152},
    {field: 'hebrew', filter: true}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true,
    floatingFilter: true
  };

  public gridData: nameCodes[];
  public editType: 'fullRow' = 'fullRow';
  public pinnedBottomRowData: any[] = [{'name': 'Total: 23'}]

  constructor(public auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.getRowData();
      } else {
        this.auth.loginWithRedirect({appState: { target: '/admin/code-list' }});
      }
    })
    // if(this.auth.isAuthenticated$) {
    //   console.log(this.auth.isAuthenticated$)

    // }
  }

  getRowData() {
    this.api.getNameCodeList()
        .subscribe(items => {
          this.gridData = items;
          this.pinnedBottomRowData = [{"name": "Total", "hebrew": items.length}]
        })
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onRowClicked() {
  }
  onCellValueChanged(event: RowValueChangedEvent) {
    console.log(event)
  }
  onRowValueChanged(event: RowValueChangedEvent) {
    console.log(event)
  }

}
