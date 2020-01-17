import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { AreasService } from "src/app/services/areas.service";
import { Router } from "@angular/router";
import { ProjectsService } from "src/app/services/projects.service";
import { ZonesService } from "src/app/services/zones.service";

@Component({
  selector: "app-add-area-zone-project",
  templateUrl: "./add-area-zone-project.component.html",
  styleUrls: ["./add-area-zone-project.component.scss"]
})
export class AddAreaZoneProjectComponent implements OnInit {
  ls = new SecureLS();
  area;
  listProjectZone = [];
  projectName = "";
  zoneName = "";
  listProject = [];
  listZone = [];
  showModalProject: Boolean = false;
  showModalZone: Boolean = false;
  project = null;
  zone = null;

  constructor(
    private config: ConfigService,
    private areaServices: AreasService,
    private route: Router,
    private projectServices: ProjectsService,
    private zoneServices: ZonesService
  ) {
    if (!this.ls.get("areaId")) {
      this.route.navigate(["./landing/list-area"]);
    }
    try {
      this.area = this.ls.get("areaId");
      this.getProjectZone();
    } catch (error) {
      this.route.navigate(["./landing/list-area"]);
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

  getProject() {
    this.listProject = [];
    this.config.setFloading(true);
    this.projectServices.getProject().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listProject = response.data;
          this.showModalProject = true;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  getZoneByProject() {
    if (!this.project) {
      this.config.infoMessage("REQUIRED!", "Select the project first.");
      return false;
    }
    this.listZone = [];
    this.config.setFloading(true);
    this.zoneServices.getZoneByProjectId(this.project.id).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listZone = response.data;
          this.showModalZone = true;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  submit() {
    if (!this.projectName) {
      this.config.infoMessage("REQUIRED", "Project cannot be empty!");
      return false;
    }

    if (!this.zoneName) {
      this.config.infoMessage("REQUIRED", "Zone cannot be empty!");
      return false;
    }
    let data = {
      project_id: this.project.id,
      zone_id: this.zone.id,
      area_id: this.area.id,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage(
        "SAVE",
        "Are you sure add project " +
          this.projectName +
          ", zone " +
          this.zoneName +
          " ?",
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.areaServices.addProjectZoneArea(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add role success!");
                this.project = null;
                this.projectName = "";
                this.zone = null;
                this.zoneName = "";
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

  setProject(data) {
    this.project = null;
    this.projectName = "";
    this.zone = null;
    this.zoneName = "";
    this.projectName = data.project_name;
    this.project = data;
    this.showModalProject = false;
  }

  setZone(data) {
    this.zone = null;
    this.zoneName = "";
    let flagExists = false;
    this.listProjectZone.forEach(element => {
      if (element.project_id == this.project.id && element.zone_id == data.id) {
        flagExists = true;
      }
    });
    if (flagExists) {
      this.config.infoMessage(
        "INFO",
        "Project " +
          this.projectName +
          ", Zone " +
          data.zone_name +
          " has been added"
      );
      this.showModalZone = false;
      return false;
    }
    this.zone = data;
    this.zoneName = data.zone_name;
    this.showModalZone = false;
  }
}
