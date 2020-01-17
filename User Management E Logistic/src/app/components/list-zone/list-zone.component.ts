import { Component, OnInit } from "@angular/core";
import { ZonesService } from "src/app/services/zones.service";
import { ConfigService } from "src/app/services/config.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-zone",
  templateUrl: "./list-zone.component.html",
  styleUrls: ["./list-zone.component.scss"]
})
export class ListZoneComponent implements OnInit {
  ls = new SecureLS();
  listZones = [];
  showModalEditZone: Boolean = false;
  detailZone = null;

  constructor(
    private zoneServices: ZonesService,
    private config: ConfigService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getZone();
  }

  getZone() {
    this.listZones = [];
    this.config.setFloading(true);
    this.zoneServices.getZones().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listZones = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveZone(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Zone " + data.zone_name
          : "Active Zone " + data.zone_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.zoneServices
            .activatedZone({
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
                  this.getZone();
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

  deleteZone(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        "Delete Zone " + data.zone_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.zoneServices
            .deleteZone({
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
                  this.getZone();
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

  modalEditZone(data) {
    this.detailZone = null;
    this.detailZone = data;
    this.showModalEditZone = true;
  }

  updateZone() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailZone.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.zoneServices.updateZone(this.detailZone).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalEditZone = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalEditZone = false;
              this.getZone();
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalEditZone = false;
          }
        );
      }
    });
  }

  showZoneProject(data) {
    this.ls.remove("zoneId");
    this.ls.set("zoneId", data);
    this.route.navigate(["./landing/list-zone-project"]);
  }
}
