import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportRoutingModule } from "./report-routing.module";
import { OutgoingMaterialComponent } from "./outgoing-material/outgoing-material.component";
import { LyGridModule } from "@alyle/ui/grid";
import { LyButtonModule } from "@alyle/ui/button";
import { LySelectModule } from "@alyle/ui/select";
import { LyFieldModule } from "@alyle/ui/field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { EmptyStockComponent } from "./empty-stock/empty-stock.component";
import { OutstandingRecieveComponent } from "./outstanding-recieve/outstanding-recieve.component";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS
} from "ng-pick-datetime";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReusableTableComponent } from "./reusable-table/reusable-table.component";
import { StockComponent } from "./stock/stock.component";
import { OrderComponent } from "./order/order.component";
import { MaterialRecieveComponent } from './material-recieve/material-recieve.component';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  },
  datePickerInput: { year: "numeric", month: "numeric", day: "numeric" },
  timePickerInput: { hour: "numeric", minute: "numeric" },
  monthYearLabel: { year: "numeric", month: "short" },
  dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
  monthYearA11yLabel: { year: "numeric", month: "long" }
};

@NgModule({
  declarations: [
    OutgoingMaterialComponent,
    EmptyStockComponent,
    OutstandingRecieveComponent,
    ReusableTableComponent,
    StockComponent,
    OrderComponent,
    MaterialRecieveComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    LyGridModule,
    LyButtonModule,
    LyFieldModule,
    LySelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule
  ],
  providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS }]
})
export class ReportModule {}
