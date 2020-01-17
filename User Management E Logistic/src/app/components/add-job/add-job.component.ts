import { Component, OnInit } from "@angular/core";
import { AddJob } from "src/app/entity";
import * as SecureLS from "secure-ls";
import validator from "validator";
import { ConfigService } from "src/app/services/config.service";
import { JobsService } from "src/app/services/jobs.service";

@Component({
  selector: "app-add-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"]
})
export class AddJobComponent implements OnInit {
  addJob: AddJob = new AddJob();
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private jobServices: JobsService
  ) {}

  ngOnInit() {}

  submit() {
    /* if (!validator.isAlpha(this.addJob.job_code)) {
      this.config.warningMessage(
        "Invalid",
        "Invalid Job Code, use character only without space!"
      );
      return false;
    } */
    this.config.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.config.setFloading(true);
        this.addJob.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.jobServices.addJob(this.addJob).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == true) {
              this.config.successMessage("SAVE SUCCESS", response.message);
              this.addJob = new AddJob();
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
