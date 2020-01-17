import { Component, OnInit } from "@angular/core";
import { AddRole } from "src/app/entity";
import * as SecureLS from "secure-ls";
import { ConfigService } from "src/app/services/config.service";
import { RolesService } from "src/app/services/roles.service";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.scss"]
})
export class AddRoleComponent implements OnInit {
  addRole: AddRole = new AddRole();
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private roleServices: RolesService
  ) {}

  ngOnInit() {}

  submit() {
    this.config.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.config.setFloading(true);
        this.addRole.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.roleServices.addRole(this.addRole).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == true) {
              this.config.successMessage("SAVE SUCCESS", response.message);
              this.addRole = new AddRole();
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
