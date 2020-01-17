import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { Job, Project, Zone, Area } from "src/app/entity";
import { UsersService } from "src/app/services/users.service";
import { JobsService } from "src/app/services/jobs.service";

@Component({
  selector: "app-detail-user",
  templateUrl: "./detail-user.component.html",
  styleUrls: ["./detail-user.component.scss"]
})
export class DetailUserComponent implements OnInit {
  constructor(
    private services: ConfigService,
    private usersService: UsersService,
    private jobsService: JobsService
  ) {}

  userLogin = this.services.getUserLogin();
  userDetail = this.services.getLs("userDetail", "./landing/list-user");
  listJob: Array<Job> = new Array<Job>();
  listProject: Array<Project> = new Array<Project>();
  listZone: Array<Zone> = new Array<Zone>();
  listArea: Array<Area> = new Array<Area>();

  ngOnInit() {
    this.getDetailUser();
  }

  getDetailUser() {
    this.listJob = [];
    this.listProject = [];
    this.listZone = [];
    this.listArea = [];
    this.services.setFloading(true);
    this.usersService.getUserDetail(this.userDetail.id).subscribe(
      (response: any) => {
        this.listJob = response.data.jobs;
        this.listProject = response.data.projects;
        this.listZone = response.data.zones;
        this.listArea = response.data.areas;
        this.services.setFloading(false);
      },
      error => {
        this.services.errorMessage(JSON.stringify(error));
      }
    );
  }

  activeDeactiveJob(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Job " + data.job_desc
          : "Active Job " + data.job_desc,
        "info"
      )
      .then(res => {
        if (res == true) {
          data.is_active = data.is_active == 1 ? 0 : 1;
          data.updated_by = this.userLogin.profileUser[0].username;
          this.services.setFloading(true);
          this.jobsService.activatedUserJob(data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(JSON.stringify(response));
              } else {
                this.services.successMessage("SAVE", "Success!");
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
              this.services.setFloading(false);
            }
          );
        }
      });
  }

  deleteJob(data) {
    this.services
      .promptMessage("Are you sure?", "Delete Job " + data.job_desc, "warning")
      .then(res => {
        if (res == true) {
          this.services.setFloading(true);
          data.updated_by = this.userLogin.profileUser[0].username;
          this.jobsService.deleteUserJob(data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(JSON.stringify(response));
              } else {
                this.services.successMessage("SAVE", "Success!");
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
              this.services.setFloading(false);
            }
          );
        }
      });
  }

  activeDeactiveProject(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Project " + data.project_name
          : "Active Project " + data.project_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          data.is_active = data.is_active == 1 ? 0 : 1;
          data.updated_by = this.userLogin.profileUser[0].username;
          this.services.setFloading(true);
          this.usersService.activatedUserProject(data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(JSON.stringify(response));
              } else {
                this.services.successMessage("SAVE", "Success!");
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
              this.services.setFloading(false);
            }
          );
        }
      });
  }

  deleteProject(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        "Delete Project " + data.project_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          data.updated_by = this.userLogin.profileUser[0].username;
          this.services.setFloading(true);
          this.usersService.deleteUserProject(data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(JSON.stringify(response));
              } else {
                this.services.successMessage("SAVE", "Success!");
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
              this.services.setFloading(false);
            }
          );
        }
      });
  }

  activeDeactiveZone(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Project " +
              data.project_name +
              " Zone " +
              data.zone_name
          : "Active Project " + data.project_name + " Zone " + data.zone_name,
        "info"
      )
      .then(res => {
        if (res == true) {
          data.is_active = data.is_active == 1 ? 0 : 1;
          data.updated_by = this.userLogin.profileUser[0].username;
          this.services.setFloading(true);
          this.usersService.activatedUserProjectZone(data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(JSON.stringify(response));
              } else {
                this.services.successMessage("SAVE", "Success!");
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
              this.services.setFloading(false);
            }
          );
        }
      });
  }

  deleteZone(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        "Delete Project " + data.project_name + " Zone " + data.zone_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          data.updated_by = this.userLogin.profileUser[0].username;
          this.services.setFloading(true);
          this.usersService.deleteUserProjectZone(data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(JSON.stringify(response));
              } else {
                this.services.successMessage("SAVE", "Success!");
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
              this.services.setFloading(false);
            }
          );
        }
      });
  }

  activeDeactiveArea(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Active Project " +
              data.project_name +
              " Zone " +
              data.zone_name +
              " Area " +
              data.area_name
          : "ActiveProject " +
              data.project_name +
              " Zone " +
              data.zone_name +
              " Area " +
              data.area_name,

        "info"
      )
      .then(res => {
        if (res == true) {
          this.services.setFloading(true);
          data.updated_by = this.userLogin.profileUser[0].username;
          data.is_active = data.is_active == 1 ? 0 : 1;
          this.usersService.activeDeactiveUserInPrjZoneArea(data).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.services.errorMessage(response.message);
                this.services.setFloading(false);
              } else {
                this.services.successMessage("SUCCESS", response.message);
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
            }
          );
        }
      });
  }

  deleteArea(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        "Delete Project " +
          data.project_name +
          " Zone " +
          data.zone_name +
          " Area " +
          data.area_name,
        "warning"
      )
      .then(res => {
        if (res == true) {
          this.services.setFloading(true);
          data.updated_by = this.userLogin.profileUser[0].username;
          this.usersService.deleteUserInPrjZoneArea(data).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.services.errorMessage(response.message);
                this.services.setFloading(false);
              } else {
                data.updated_by = null;
                this.services.successMessage("SUCCESS", response.message);
                this.getDetailUser();
              }
            },
            error => {
              this.services.errorMessage(JSON.stringify(error));
            }
          );
        }
      });
  }
}
