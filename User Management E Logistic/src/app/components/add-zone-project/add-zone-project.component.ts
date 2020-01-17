import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import { ProjectsService } from "src/app/services/projects.service";
import { ZonesService } from "src/app/services/zones.service";

@Component({
  selector: "app-add-zone-project",
  templateUrl: "./add-zone-project.component.html",
  styleUrls: ["./add-zone-project.component.scss"]
})
export class AddZoneProjectComponent implements OnInit {
  ls = new SecureLS();
  zone;
  listZoneProject = [];
  projectName = "";
  listProject = [];
  showModalProject: Boolean = false;
  project;

  constructor(
    private config: ConfigService,
    private zoneServices: ZonesService,
    private projectServices: ProjectsService,
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

  submit() {
    if (!this.projectName) {
      this.config.infoMessage("REQUIRED", "Project cannot be empty!");
      return false;
    }
    let data = {
      project_id: this.project.id,
      zone_id: this.zone.id,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage(
        "SAVE",
        "Are you sure add " + this.projectName + " ?",
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.zoneServices.addZoneProject(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add user success!");
                this.project = null;
                this.projectName = "";
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

  setProject(data) {
    this.project = null;
    this.projectName = "";
    let flagExistsProject: Boolean = false;
    this.listZoneProject.forEach(element => {
      if (element.project_name == data.project_name) {
        flagExistsProject = true;
      }
    });
    if (flagExistsProject == true) {
      this.config.infoMessage("INFO", "Project has been added!");
      this.showModalProject = false;
      return false;
    }
    this.project = data;
    this.projectName = data.project_name;
    this.showModalProject = false;
  }
}
