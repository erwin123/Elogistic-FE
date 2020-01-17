import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { ConfigService } from "src/app/services/config.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-project",
  templateUrl: "./list-project.component.html",
  styleUrls: ["./list-project.component.scss"]
})
export class ListProjectComponent implements OnInit {
  ls = new SecureLS();
  listProject = [];

  constructor(
    private config: ConfigService,
    private projectServices: ProjectsService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getProject();
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
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  showUser(data) {
    this.ls.remove("userProjectId");
    this.ls.set("userProjectId", data);
    this.route.navigate(["./landing/list-user-project"]);
  }
}
