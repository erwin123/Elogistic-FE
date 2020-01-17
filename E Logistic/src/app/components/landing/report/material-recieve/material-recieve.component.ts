import { Component, OnInit } from "@angular/core";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { ProjectService } from "src/app/services/project.service";
import { Router } from "@angular/router";
import { ExcelService } from "src/app/services/excel.service";

@Component({
  selector: "app-material-recieve",
  templateUrl: "./material-recieve.component.html",
  styleUrls: ["./material-recieve.component.css"]
})
export class MaterialRecieveComponent implements OnInit {
  listProject = [];
  project = 0;
  filter = 0;
  startDatePeriode = new Date();
  endDatePeriode = new Date();
  maxDate = new Date();
  view: any[] = [500, 300];
  rows = [];
  columns = [
    { prop: "OrderNo", name: "OrderNo" },
    { prop: "Project", name: "Project" },
    { prop: "Zona", name: "Zona" },
    { prop: "Area", name: "Area" },
    { prop: "Requestor", name: "Requestor" },
    { prop: "Description", name: "Description" },
    { prop: "MaterialName", name: "MaterialName" },
    { prop: "Quantity", name: "Quantity" },
    { prop: "RecieveNote", name: "RecieveNote" },
    { prop: "DeliveryBy", name: "DeliveryBy" },
    { prop: "DeliveryDate", name: "DeliveryDate" },
    { prop: "RecieveDate", name: "RecieveDate" }
  ];

  // options
  colorScheme = "cool";

  multi: any[] = [];

  displayedColumns: string[] = [
    "OrderNo",
    "Project",
    "Zona",
    "Area",
    "Requestor",
    "Description",
    "MaterialName",
    "Quantity",
    "RecieveNote",
    "DeliveryBy",
    "DeliveryDate",
    "RecieveDate"
  ];

  listMaterialRecieve = [];

  constructor(
    private projectServices: ProjectService,
    private services: GlobalServiceService,
    private router: Router,
    private excelServices: ExcelService
  ) {}

  ngOnInit() {
    this.getProject();
  }

  onSubmit() {
    let flagAuthorize = false;
    this.services.getUserLogin().data.profileMenu.forEach(element => {
      if (element.route == "report/outgoing-material") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.services.getUserLogin().data.profileUser[0].username +
          ", You don't have permission access Report Outgoing Material!"
      );
      this.router.navigate(["../landing/home"]);
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
    this.listMaterialRecieve = [];
    this.multi = [];
    this.rows = [];
    this.services.setFloading(true);
    this.projectServices
      .getMaterialRecieve(data)
      .subscribe((resMaterialRecieve: any) => {
        this.listMaterialRecieve = resMaterialRecieve.data;
        this.rows = resMaterialRecieve.data;
        this.services.setFloading(false);
      });
  }

  getProject() {
    this.services.setFloading(true);
    this.listProject = [];
    if (this.services.getUserLogin().data.profilePlant.length > 0) {
      this.listProject = this.services.getUserLogin().data.profilePlant;
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

  exportToExcel() {
    this.excelServices.exportAsExcelFile(
      this.listMaterialRecieve,
      "Report Outgoing Material - " +
        this.services.sqlServerDate(this.startDatePeriode) +
        "_" +
        this.services.sqlServerDate(this.endDatePeriode)
    );
  }
}
