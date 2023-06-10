import { Component, OnInit } from '@angular/core';
import {ColDef, GridApi, GridReadyEvent, RowValueChangedEvent} from "ag-grid-community";
import {ApiService, nameCodes} from "../../services/api.service";
import {AuthService} from "@auth0/auth0-angular";
import {MatDialog} from "@angular/material/dialog";
import {CalculateNameCodeDialogComponent} from "./calculate-name-code-dialog/calculate-name-code-dialog.component";

@Component({
  selector: 'app-missing-names',
  templateUrl: './missing-names.component.html',
  styleUrls: ['./missing-names.component.scss']
})
export class MissingNamesComponent implements OnInit {

  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    {field: 'name'},
    {field: 'code', width: 152},
    {field: 'hebrew'}
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

  allowDelete = false;
  clickedRowData: nameCodes;

  constructor(public auth: AuthService, private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.getRowData();
      } else {
        this.auth.loginWithRedirect({appState: { target: '/admin/code-list' }});
        // this.auth.loginWithRedirect({appState: { target: `/${this.locale}/admin/code-list` }});
      }
    })
  }

  getRowData() {
    this.api.getWaitingList()
        .subscribe(items => {
          this.gridData = items;
          this.pinnedBottomRowData = [{"name": "Total", "hebrew": items.length}]
        })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onRowClicked(event: RowValueChangedEvent) {
    this.clickedRowData = {
      name: event.data['name'],
      code: event.data['code'],
      hebrew: event.data['hebrew']
    };
    // this.clickedRowData = event.data
    // console.log(this.clickedRowData)
    this.allowDelete = true;
  }
  onRowValueChanged(event: RowValueChangedEvent) {
    const record: nameCodes = event.data;
    this.updateName(record)
  }

  updateName(updatedRowData: any) {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.api.updateNameCode(this.clickedRowData, updatedRowData).subscribe((result) => {
          this.refresh();
        })
      }
    })
  }

  addNameToNameCodes() {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.api.addNewNameCode(this.clickedRowData).subscribe(
            (result) => {
              this.deleteName();
            }
        )

      }
    })
  }
  deleteName() {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.api.deleteWaitingListRecord(this.clickedRowData).subscribe((result) => {
          this.refresh();
        })
      }
    })
  }

  calculateNameCode() {
    const dialogRef = this.dialog.open(CalculateNameCodeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    })
  }

  refresh() {
    this.gridApi.showLoadingOverlay();
    this.getRowData();
  }

}
