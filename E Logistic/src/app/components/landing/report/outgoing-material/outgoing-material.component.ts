import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ProjectService } from "src/app/services/project.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { ExcelService } from "src/app/services/excel.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-outgoing-material",
  templateUrl: "./outgoing-material.component.html",
  styleUrls: ["./outgoing-material.component.css"]
})
export class OutgoingMaterialComponent implements OnInit {
  listProject = [];
  project = 0;
  filter = 0;
  startDatePeriode = new Date();
  endDatePeriode = new Date();
  maxDate = new Date();
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  view: any[] = [500, 300];
  rows = [];
  columns = [
    { prop: "project_name", name: "Project Name" },
    { prop: "material_name", name: "Material Name" },
    { prop: "order_amount", name: "Order Amount" },
    { prop: "order_quantity", name: "Order Quantity" }
  ];

  // options
  colorScheme = "cool";

  multi: any[] = [];

  displayedColumns: string[] = [
    "no",
    "project_name",
    "material_name",
    "order_amount",
    "order_quantity"
  ];

  listOutgoingMaterial = [];

  constructor(
    private projectServices: ProjectService,
    private services: GlobalServiceService,
    private excelServices: ExcelService,
    private route: Router
  ) {}

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "report/outgoing-material") {
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

  onSubmit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "report/outgoing-material") {
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
    if (!this.project) {
      this.services.infoMessage("REQUIRED", "Project cannot be empty!");
      return false;
    }
    if (!this.filter) {
      this.services.infoMessage("REQUIRED", "Filter cannot be empty!");
      return false;
    }
    let data = {
      plant_code: this.project,
      start_date: this.services.sqlServerDate(this.startDatePeriode),
      end_date: this.services.sqlServerDate(this.endDatePeriode),
      filter: this.filter
    };
    this.listOutgoingMaterial = [];
    this.multi = [];
    this.rows = [];
    this.services.setFloading(true);
    this.projectServices
      .getTop10Material(data)
      .subscribe((resTop5Material: any) => {
        this.multi = resTop5Material.data;
        this.projectServices
          .getOutgoingMaterial(data)
          .subscribe((resOutgoingMaterial: any) => {
            this.listOutgoingMaterial = resOutgoingMaterial.data;
            this.rows = resOutgoingMaterial.data;
            this.services.setFloading(false);
          });
      });
  }

  exportToExcel() {
    this.excelServices.exportAsExcelFile(
      this.listOutgoingMaterial,
      "Report Outgoing Material - " +
        this.services.sqlServerDate(this.startDatePeriode) +
        "_" +
        this.services.sqlServerDate(this.endDatePeriode)
    );
  }
}
