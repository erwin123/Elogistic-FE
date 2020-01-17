import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-reusable-table",
  templateUrl: "./reusable-table.component.html",
  styleUrls: ["./reusable-table.component.css"]
})
export class ReusableTableComponent implements OnInit {
  @Input("columns") columns = [];
  @Input("rows") rows = [];
  @Input("temp") temp = [];
  @Input("filterBy") filterBy: String;
  @Input("filterLabel") filterLabel: String;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor() {}

  ngOnInit() {}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    let temp;
    if (this.filterBy == "material_name") {
      temp = this.temp.filter(function(d) {
        return d.material_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
    } else if (this.filterBy == "order_no") {
      temp = this.temp.filter(function(d) {
        return d.order_no.toLowerCase().indexOf(val) !== -1 || !val;
      });
    } else if (this.filterBy == "material_desc") {
      temp = this.temp.filter(function(d) {
        return d.material_desc.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    this.rows = temp;
    this.table.offset = 0;
  }
}
