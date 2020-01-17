import { Component, OnInit } from "@angular/core";
import { JobsService } from "src/app/services/jobs.service";
import { ConfigService } from "src/app/services/config.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-job",
  templateUrl: "./list-job.component.html",
  styleUrls: ["./list-job.component.scss"]
})
export class ListJobComponent implements OnInit {
  listJob = [];
  detailJob = null;
  showModalEditJob = false;
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private jobServices: JobsService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getJob();
  }

  getJob() {
    this.listJob = [];
    this.config.setFloading(true);
    this.jobServices.getJob().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listJob = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  activeDeactiveJob(data) {
    this.config
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Job " + data.job_desc
          : "Active Job " + data.job_desc,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.jobServices
            .activatedJob({
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
                  this.getJob();
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

  deleteJob(data) {
    this.config
      .promptMessage("Are you sure?", "Delete Job " + data.job_desc, "warning")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.jobServices
            .deleteJob({
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
                  this.getJob();
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

  modalEditJob(data) {
    this.detailJob = null;
    this.detailJob = data;
    this.showModalEditJob = true;
  }

  updateJob() {
    this.config.promptMessage("Are you sure?", "", "info").then(res => {
      if (res == true) {
        this.detailJob.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.config.setFloading(true);
        this.jobServices.updateJob(this.detailJob).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == false) {
              this.config.errorMessage(JSON.stringify(response));
              this.showModalEditJob = false;
            } else {
              this.config.successMessage("SAVE", "Success!");
              this.showModalEditJob = false;
              this.getJob();
            }
          },
          error => {
            this.config.errorMessage(JSON.stringify(error));
            this.config.setFloading(false);
            this.showModalEditJob = false;
          }
        );
      }
    });
  }

  showUsersJobs(data) {
    this.ls.remove("jobId");
    this.ls.set("jobId", data);
    this.route.navigate(["./landing/list-user-job"]);
  }
}
