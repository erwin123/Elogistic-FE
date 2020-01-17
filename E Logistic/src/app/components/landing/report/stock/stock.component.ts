import { Component, OnInit } from "@angular/core";
import { LyTheme2, shadowBuilder, ThemeVariables } from "@alyle/ui";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { OrderService } from "src/app/services/order.service";
import { ProjectService } from "src/app/services/project.service";
import { ExcelService } from "src/app/services/excel.service";

const styles = (theme: ThemeVariables) => ({
  item: {
    padding: "10px",
    textAlign: "center",
    background: theme.background.secondary,
    boxShadow: shadowBuilder(1),
    borderRadius: "4px",
    height: "100%"
  }
});

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.css"]
})
export class StockComponent implements OnInit {
  readonly classes = this.theme.addStyleSheet(styles);
  project = "";
  sloc = "";
  displayedColumns: string[] = [
    "no",
    "material_code",
    "material_desc",
    /* "plant",
    "storageLocation", */
    "unrestricted",
    "base_unit_of_measure"
  ];
  lastUpdateStock;
  listProjects = [];
  listSloc = [];
  rows = [];
  columns = [
    { prop: "material_code", name: "Material Code" },
    { prop: "material_desc", name: "Material Name" },
    { prop: "unrestricted", name: "Stock" },
    { prop: "base_unit_of_measure", name: "Unit" }
  ];

  constructor(
    private theme: LyTheme2,
    private services: GlobalServiceService,
    private orderService: OrderService,
    private projectService: ProjectService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.getLastUpdateStock();
    this.getListProject();
  }

  getLastUpdateStock() {
    this.orderService.getLastUpdateStock().subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          return false;
        }
        this.lastUpdateStock = response.data[0].last_update_stock;
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }

  getListProject() {
    this.services.setFloading(true);
    this.projectService.getProject().subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
        } else {
          this.listProjects = response.data;
        }
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }

  onChangePlant(projectId) {
    this.listSloc = [];
    if (projectId) {
      this.getStorageLocationByPlant(projectId);
    }
  }

  getStorageLocationByPlant(projectId) {
    this.services.setFloading(true);
    this.projectService.getSlocByProjectId({ projectId: projectId }).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
        } else {
          this.listSloc = response.data;
        }
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }

  getStock() {
    if (!this.project) {
      this.services.infoMessage("Required", "Project cannot be empty!");
      return false;
    }

    if (!this.sloc) {
      this.services.infoMessage(
        "Required",
        "Storage Location cannot be empty!"
      );
      return false;
    }

    this.services.setFloading(true);
    this.rows = [];
    this.projectService
      .getStock({ projectId: this.project, sloc: this.sloc })
      .subscribe(
        (response: any) => {
          if (response.status == false) {
            this.services.openSnackBarErrorHttpReq(response);
          } else {
            this.rows = response.data;
          }
          this.services.setFloading(false);
        },
        error => {
          this.services.openSnackBarErrorHttpReq(error);
        }
      );
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(
      this.rows,
      "Report Stock - " + this.services.sqlServerDate(new Date())
    );
  }
}
