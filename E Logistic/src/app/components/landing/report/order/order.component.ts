import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ProjectService } from "src/app/services/project.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { Router } from "@angular/router";
import { ExcelService } from "src/app/services/excel.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  startDatePeriode = new Date();
  endDatePeriode = new Date();
  maxDate = new Date();
  listProject = [];
  project = 0;
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  rows = [];
  columns = [
    { prop: "projectName", name: "Project Name" },
    { prop: "orderNo", name: "No. Order" },
    { prop: "requestBy", name: "Requestor" },
    { prop: "statusName", name: "Order Status" },
    { prop: "materialAmount", name: "Material Amount" },
    { prop: "orderDate", name: "Order Date" },
    { prop: "approvalDate", name: "Approval Date" },
    { prop: "prosesTime", name: "Prosess Time" },
    { prop: "approvalBy", name: "Approval By" },
    { prop: "packingDate", name: "Packing Date" },
    { prop: "prosesTime2", name: "Prosess Time" },
    { prop: "packingBy", name: "Packing By" },
    { prop: "deliveryDate", name: "Delivery Date" },
    { prop: "prosesTime3", name: "Prosess Time" },
    { prop: "deliveryBy", name: "Delivery By" },
    { prop: "recieveDate", name: "Recieve Time" },
    { prop: "prosesTime4", name: "Prosess Time" },
    { prop: "recieveBy", name: "Recieve By" },
    { prop: "rejectDate", name: "Reject Date" },
    { prop: "prosesTime5", name: "Prosess Time" },
    { prop: "rejectBy", name: "Reject By" },
    { prop: "rejectLogisticDate", name: "Reject Logistic Date" },
    { prop: "prosesTime6", name: "Prosess Time" },
    { prop: "rejectLogisticBy", name: "Reject Logistic By" }
  ];
  listOrder = [];
  chartOption = {
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    roundEdges: false,
    gradient: true
  };
  colorScheme = "cool";
  view: any[] = [500, 300];
  multi: any[] = [];

  constructor(
    private projectServices: ProjectService,
    private services: GlobalServiceService,
    private excelServices: ExcelService,
    private route: Router
  ) {}

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "report/order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission access Report Order!"
      );
      this.route.navigate(["../landing/home"]);
      return false;
    }
    this.getProject();
  }

  onSubmit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "report/order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission access Report Order!"
      );
      this.route.navigate(["../landing/home"]);
      return false;
    }
    if (!this.project) {
      this.services.infoMessage("REQUIRED", "Project cannot be empty!");
      return false;
    }
    let data = {
      plant_code: this.project,
      start_date: this.services.sqlServerDate(this.startDatePeriode),
      end_date: this.services.sqlServerDate(this.endDatePeriode)
    };
    this.listOrder = [];
    this.rows = [];
    this.services.setFloading(true);
    this.projectServices.getReportOrder(data).subscribe((response: any) => {
      this.listOrder = response.data;
      this.rows = response.data;
      this.projectServices
        .getVBarReportOrder(data)
        .subscribe((responseChart: any) => {
          this.multi = responseChart.data;
          this.services.setFloading(false);
        });
    });
  }

  onChangeStartDate() {
    if (
      this.startDatePeriode.getMonth() == new Date().getMonth() &&
      this.startDatePeriode.getFullYear() == new Date().getFullYear()
    ) {
      this.endDatePeriode = new Date();
    } else {
      this.endDatePeriode = new Date(
        this.startDatePeriode.getFullYear(),
        this.startDatePeriode.getMonth() + 1,
        0
      );
    }
  }

  getProject() {
    this.services.setFloading(true);
    this.listProject = [];
    if (this.loggedElogistik.data.profilePlant.length > 0) {
      this.listProject = this.loggedElogistik.data.profilePlant;
      this.project = this.listProject[0].plant_code;
      this.services.setFloading(false);
    } else {
      this.projectServices.getProject().subscribe((response: any) => {
        this.listProject = response.data;
        this.services.setFloading(false);
      });
    }
  }

  exportToExcel() {
    this.excelServices.exportAsExcelFile(
      this.listOrder,
      "Report Order - " +
        this.services.sqlServerDate(this.startDatePeriode) +
        "_" +
        this.services.sqlServerDate(this.endDatePeriode)
    );
  }
}
