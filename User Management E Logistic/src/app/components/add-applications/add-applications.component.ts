import { Component, OnInit } from "@angular/core";
import { AddApplication } from "src/app/entity";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";
import * as SecureLS from "secure-ls";

@Component({
  selector: "app-add-applications",
  templateUrl: "./add-applications.component.html",
  styleUrls: ["./add-applications.component.scss"]
})
export class AddApplicationsComponent implements OnInit {
  ls = new SecureLS();
  addApplication: AddApplication = new AddApplication();

  constructor(
    private config: ConfigService,
    private applicationServices: ApplicationsService
  ) {}

  ngOnInit() {}

  submit() {
    this.config.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.config.setFloading(true);
        this.addApplication.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.applicationServices.addApplication(this.addApplication).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == true) {
              this.config.successMessage("SAVE SUCCESS", response.message);
              this.addApplication = new AddApplication();
            } else {
              this.config.errorMessage(JSON.stringify(response));
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
}
