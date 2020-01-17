import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { ZonesService } from "src/app/services/zones.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-zone-project",
  templateUrl: "./list-zone-project.component.html",
  styleUrls: ["./list-zone-project.component.scss"]
})
export class ListZoneProjectComponent implements OnInit {
  ls = new SecureLS();
  listZoneProject = [];
  zone;

  constructor(
    private config: ConfigService,
    private zoneServices: ZonesService,
    private route: Router
  ) {
    if (!this.ls.get("zoneId")) {
      this.route.navigate(["./landing/list-zone"]);
    }
    try {
      this.zone = this.ls.get("zoneId");
      this.getZoneProject();
    } catch (error) {
      this.route.navigate(["./landing/list-zone"]);
    }
  }

  ngOnInit() {}

  getZoneProject() {
    this.listZoneProject = [];
    this.config.setFloading(true);
    this.zoneServices.getZoneProject(this.zone.id).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listZoneProject = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveZoneProject(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Project " + data.project_name
          : "Active Project " + data.project_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.zoneServices
            .activatedZoneProject({
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
                  this.getZoneProject();
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

  deleteZoneProject(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        "Delete Project " + data.project_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.zoneServices
            .deleteZoneProject({
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
                  this.getZoneProject();
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

  showUserProjectZone(data) {
    this.ls.remove("userZone");
    this.ls.set("userZone", data);
    this.route.navigate(["./landing/list-user-project-zone"]);
  }
}
