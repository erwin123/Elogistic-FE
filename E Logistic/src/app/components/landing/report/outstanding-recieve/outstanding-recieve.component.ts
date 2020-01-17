import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ProjectService } from "src/app/services/project.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { Router } from "@angular/router";
import { ExcelService } from "src/app/services/excel.service";

@Component({
  selector: "app-outstanding-recieve",
  templateUrl: "./outstanding-recieve.component.html",
  styleUrls: ["./outstanding-recieve.component.css"]
})
export class OutstandingRecieveComponent implements OnInit {
  listProject = [];
  project = 0;
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  rows = [];
  columns = [
    { prop: "project_name", name: "Project Name" },
    { prop: "order_no", name: "No. Order" },
    { prop: "request_by", name: "Request By" },
    { prop: "order_date", name: "Order Date" },
    { prop: "delivery_date", name: "Delivery Date" },
    { prop: "overdue", name: "Overdue" }
  ];

  constructor(
    private projectServices: ProjectService,
    private services: GlobalServiceService,
    private route: Router,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "report/outstanding-recieve") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission access Report Outstanding Recieve!"
      );
      this.route.navigate(["../landing/home"]);
      return false;
    }
    this.getProject();
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

  onSubmit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "report/outstanding-recieve") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission access Report Outgoing Material!"
      );
      this.route.navigate(["../landing/home"]);
      return false;
    }
    this.rows = [];
    this.services.setFloading(true);
    let data = { plant_code: this.project };
    this.projectServices
      .getOutstandingRecieve(data)
      .subscribe((response: any) => {
        this.rows = response.data;
        this.services.setFloading(false);
      });
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(
      this.rows,
      "Report Outstanding Recieve - " + this.services.sqlServerDate(new Date())
    );
  }
}
