import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OutgoingMaterialComponent } from "./outgoing-material/outgoing-material.component";
import { EmptyStockComponent } from "./empty-stock/empty-stock.component";
import { OutstandingRecieveComponent } from "./outstanding-recieve/outstanding-recieve.component";
import { StockComponent } from "./stock/stock.component";
import { OrderComponent } from "./order/order.component";
import { MaterialRecieveComponent } from "./material-recieve/material-recieve.component";

const routes: Routes = [
  { path: "", component: OutgoingMaterialComponent },
  { path: "outgoing-material", component: OutgoingMaterialComponent },
  { path: "empty-stock", component: EmptyStockComponent },
  { path: "outstanding-recieve", component: OutstandingRecieveComponent },
  { path: "stock", component: StockComponent },
  { path: "order", component: OrderComponent },
  { path: "material-recieve", component: MaterialRecieveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
