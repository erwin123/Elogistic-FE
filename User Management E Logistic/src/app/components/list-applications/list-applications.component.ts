import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-applications",
  templateUrl: "./list-applications.component.html",
  styleUrls: ["./list-applications.component.scss"]
})
export class ListApplicationsComponent implements OnInit {
  listApplications = [];
  showModalEditApplication: Boolean = false;
  detailApplication = null;
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private applicationServices: ApplicationsService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.listApplications = [];
    this.config.setFloading(true);
    this.applicationServices.getApplications().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listApplications = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveApplication(data) {}

  deleteApplication(data) {}

  modalEditApplication(data) {
    this.detailApplication = null;
    this.detailApplication = data;
    this.showModalEditApplication = true;
  }

  showApplicationMenu(data) {
    this.ls.remove("applicationId");
    this.ls.set("applicationId", data);
    this.route.navigate(["./landing/list-application-menu"]);
  }

  updateApplication() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailApplication.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.applicationServices
          .updateApplication(this.detailApplication)
          .subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                this.showModalEditApplication = false;
              } else {
                this.config.successMessage("SAVE", "Success!");
                this.showModalEditApplication = false;
                this.getApplications();
              }
            },
            error => {
              this.config.errorMessage(JSON.stringify(error));
              this.config.setFloading(false);
              this.showModalEditApplication = false;
            }
          );
      }
    });
  }
}
