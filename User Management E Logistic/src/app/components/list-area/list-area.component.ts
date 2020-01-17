import { Component, OnInit } from "@angular/core";
import { AreasService } from "src/app/services/areas.service";
import { ConfigService } from "src/app/services/config.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-area",
  templateUrl: "./list-area.component.html",
  styleUrls: ["./list-area.component.scss"]
})
export class ListAreaComponent implements OnInit {
  ls = new SecureLS();
  listAreas = [];
  showModalEditArea: Boolean = false;
  detailArea = null;

  constructor(
    private areaServices: AreasService,
    private config: ConfigService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getArea();
  }

  getArea() {
    this.listAreas = [];
    this.config.setFloading(true);
    this.areaServices.getAreas().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listAreas = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveArea(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Area " + data.area_name
          : "Active Area " + data.area_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.areaServices
            .activatedArea({
              id: data.id,
              is_active: data.is_active == 1 ? 0 : 1,
              updated_by: this.ls.get("loggedUM").profileUser[0].username
            })
            .subscribe(
              (response: any) => {
                this.config.setFloading(false);
                if (response.status == false) {
                  this.config.errorMessage(JSON.stringify(response));
                } else {
                  this.config.successMessage("SAVE", "Success!");
                  this.getArea();
                }
              },
              error => {
                this.config.errorMessage(JSON.stringify(error));
                this.config.setFloading(false);
              }
            );
        }
      });
  }

  deleteArea(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        "Delete Area " + data.area_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.areaServices
            .deleteArea({
              id: data.id,
              updated_by: this.ls.get("loggedUM").profileUser[0].username
            })
            .subscribe(
              (response: any) => {
                this.config.setFloading(false);
                if (response.status == false) {
                  this.config.errorMessage(JSON.stringify(response));
                } else {
                  this.config.successMessage("SAVE", "Success!");
                  this.getArea();
                }
              },
              error => {
                this.config.errorMessage(JSON.stringify(error));
                this.config.setFloading(false);
              }
            );
        }
      });
  }

  modalEditArea(data) {
    this.detailArea = null;
    this.detailArea = data;
    this.showModalEditArea = true;
  }

  showZoneProjectArea(data) {
    this.ls.remove("areaId");
    this.ls.set("areaId", data);
    this.route.navigate(["./landing/list-area-zone-project"]);
  }

  updateArea() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailArea.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.areaServices.updateArea(this.detailArea).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalEditArea = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalEditArea = false;
              this.getArea();
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalEditArea = false;
          }
        );
      }
    });
  }
}
