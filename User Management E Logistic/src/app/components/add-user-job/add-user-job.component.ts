import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import { UsersService } from "src/app/services/users.service";
import { JobsService } from "src/app/services/jobs.service";

@Component({
  selector: "app-add-user-job",
  templateUrl: "./add-user-job.component.html",
  styleUrls: ["./add-user-job.component.scss"]
})
export class AddUserJobComponent implements OnInit {
  ls = new SecureLS();
  jobName = "";
  jobCode = "";
  username = "";
  listUser = [];
  listUserJob = [];
  jobId: Number;
  showModalUser: Boolean = false;
  job;
  user;

  constructor(
    private route: Router,
    private config: ConfigService,
    private userServices: UsersService,
    private jobServices: JobsService
  ) {
    if (!this.ls.get("jobId")) {
      this.route.navigate(["./landing/list-job"]);
    }
    try {
      this.jobName = this.ls.get("jobId").job_desc;
      this.jobCode = this.ls.get("jobId").job_code;
      this.jobId = this.ls.get("jobId").id;
      this.job = this.ls.get("jobId");
      this.getUserJob();
    } catch (error) {
      this.route.navigate(["./landing/list-job"]);
    }
  }

  ngOnInit() {}

  getUser() {
    this.listUser = [];
    this.config.setFloading(true);
    this.userServices.getUser().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listUser = response.data;
          this.showModalUser = true;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  setUser(data) {
    this.user = null;
    this.username = "";
    let flagExistsUser: Boolean = false;
    this.listUserJob.forEach(element => {
      if (element.username == data.username) {
        flagExistsUser = true;
      }
    });
    if (flagExistsUser == true) {
      this.config.infoMessage("INFO", "User has been added!");
      this.showModalUser = false;
      return false;
    }
    this.user = data;
    this.username = data.username;
    this.showModalUser = false;
  }

  getUserJob() {
    this.listUserJob = [];
    this.config.setFloading(true);
    this.jobServices.getUsersJob(this.jobId).subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listUserJob = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  submit() {
    if (!this.username) {
      this.config.infoMessage("REQUIRED", "User cannot be empty!");
      return false;
    }
    let data = {
      user_id: this.user.id,
      job_id: this.jobId,
      created_by: this.ls.get("loggedUM").profileUser[0].username
    };
    this.config
      .promptMessage("SAVE", "Are you sure add " + this.username + " ?", "info")
      .then(res => {
        if (res == true) {
          this.config.setFloading(true);
          this.jobServices.addUserJob(data).subscribe(
            (response: any) => {
              this.config.setFloading(false);
              if (response.status == false) {
                this.config.errorMessage(JSON.stringify(response));
                return false;
              } else {
                this.config.successMessage("SAVE", "Add user success!");
                this.user = null;
                this.username = "";
                this.getUserJob();
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
