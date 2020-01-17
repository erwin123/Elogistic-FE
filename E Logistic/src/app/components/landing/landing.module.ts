import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LyButtonModule } from "@alyle/ui/button";
import { LyDrawerModule } from "@alyle/ui/drawer";
import { LyToolbarModule } from "@alyle/ui/toolbar";
import { LyListModule } from "@alyle/ui/list";
import { LyIconModule } from "@alyle/ui/icon";
import { LyRadioModule } from "@alyle/ui/radio";
import { ResponsiveModule } from "@alyle/ui/responsive";
import { LyMenuModule } from "@alyle/ui/menu";
import { LyGridModule } from "@alyle/ui/grid";

import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { HomeComponent } from "./home/home.component";
import { LyFieldModule } from "@alyle/ui/field";
import { LySelectModule } from "@alyle/ui/select";
import { UploadMaterialComponent } from "./upload-material/upload-material.component";
import { ReportComparisonComponent } from "./report-comparison/report-comparison.component";
import { ReportLeadTimeComponent } from "./report-lead-time/report-lead-time.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { LyExpansionIconModule } from "@alyle/ui";
import { LyExpansionModule } from "@alyle/ui/expansion";
import { InputFnpbComponent } from "./input-fnpb/input-fnpb.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApprovalOrderComponent } from "./approval-order/approval-order.component";
import { LyCardModule } from "@alyle/ui/card";
import { NgxConfirmBoxModule, NgxConfirmBoxService } from "ngx-confirm-box";
import { LyBadgeModule } from "@alyle/ui/badge";
import { DeliveryOrderComponent } from "./delivery-order/delivery-order.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { LyResizingCroppingImageModule } from "@alyle/ui/resizing-cropping-images";
import { LySliderModule } from "@alyle/ui/slider";
import { TrackingComponent } from "./tracking/tracking.component";
import { VerticalTimelineModule } from "angular-vertical-timeline";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { RecieveComponent } from "./recieve/recieve.component";
import { RecieveOrderComponent } from "./recieve-order/recieve-order.component";
import { LyTabsModule } from "@alyle/ui/tabs";

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    UploadMaterialComponent,
    ReportComparisonComponent,
    ReportLeadTimeComponent,
    ReservationComponent,
    InputFnpbComponent,
    ApprovalOrderComponent,
    DeliveryOrderComponent,
    DeliveryComponent,
    TrackingComponent,
    ProfileComponent,
    ChangePasswordComponent,
    RecieveComponent,
    RecieveOrderComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LyDrawerModule,
    LyToolbarModule,
    LyListModule,
    LyIconModule,
    ResponsiveModule,
    LyRadioModule,
    LyMenuModule,
    LyButtonModule,
    LyGridModule,
    LyFieldModule,
    LySelectModule,
    LyExpansionIconModule,
    LyExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    LyCardModule,
    NgxConfirmBoxModule,
    LyBadgeModule,
    LyResizingCroppingImageModule,
    LySliderModule,
    VerticalTimelineModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LyTabsModule
  ],
  providers: [NgxConfirmBoxService]
})
export class LandingModule {}
