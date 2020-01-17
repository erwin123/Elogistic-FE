import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { AreasService } from "src/app/services/areas.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-area-zone-project",
  templateUrl: "./list-area-zone-project.component.html",
  styleUrls: ["./list-area-zone-project.component.scss"]
})
export class ListAreaZoneProjectComponent implements OnInit {
  ls = new SecureLS();
  area;
  listProjectZone = [];

  constructor(
    private config: ConfigService,
    private areaServices: AreasService,
    private route: Router
  ) {
    if (!this.ls.get("areaId")) {
      this.route.navigate(["./landing/list-area-zone-project"]);
    }
    try {
      this.area = this.ls.get("areaId");
      this.getProjectZone();
    } catch (error) {
      this.route.navigate(["./landing/list-area-zone-project"]);
    }
  }

  ngOnInit() {}

  getProjectZone() {
    this.listProjectZone = [];
    this.config.setFloading(true);
    this.areaServices.getProjectZoneByArea(this.area.id).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listProjectZone = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveProjectZone(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Project " +
              data.project_name +
              ", Zone " +
              data.zone_name
          : "Active Project " + data.project_name + ", Zone " + data.zone_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.areaServices
            .activatedProjectZone({
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
                  this.getProjectZone();
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

  deleteProjectZone(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        "Delete Project " + data.project_name + ", Zone " + data.zone_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.areaServices
            .deleteProjectZone({
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
                  this.getProjectZone();
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

  showUser(data) {
    this.ls.remove("areaUserId");
    this.ls.set("areaUserId", data);
    this.route.navigate(["./landing/list-user-area"]);
  }
}
