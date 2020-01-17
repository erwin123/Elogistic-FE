import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing.component";
import { HomeComponent } from "./home/home.component";
import { UploadMaterialComponent } from "./upload-material/upload-material.component";
import { AuthGuard } from "src/app/auth.guard";
import { ReportComparisonComponent } from "./report-comparison/report-comparison.component";
import { ReportLeadTimeComponent } from "./report-lead-time/report-lead-time.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { InputFnpbComponent } from "./input-fnpb/input-fnpb.component";
import { ApprovalOrderComponent } from "./approval-order/approval-order.component";
import { DeliveryOrderComponent } from "./delivery-order/delivery-order.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { TrackingComponent } from "./tracking/tracking.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { RecieveComponent } from "./recieve/recieve.component";
import { RecieveOrderComponent } from "./recieve-order/recieve-order.component";

const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "input-fnpb", component: InputFnpbComponent },
      { path: "approval-order", component: ApprovalOrderComponent },
      { path: "upload-material", component: UploadMaterialComponent },
      { path: "report-comparison", component: ReportComparisonComponent },
      { path: "report-lead-time", component: ReportLeadTimeComponent },
      { path: "packing-order", component: ReservationComponent },
      { path: "delivery-order", component: DeliveryOrderComponent },
      { path: "delivery", component: DeliveryComponent },
      { path: "tracking-order", component: TrackingComponent },
      { path: "recieve-order", component: RecieveOrderComponent },
      { path: "recieve", component: RecieveComponent },
      { path: "profile", component: ProfileComponent },
      { path: "change-password", component: ChangePasswordComponent },
      { path: "report", loadChildren: "./report/report.module#ReportModule" }
    ]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}
