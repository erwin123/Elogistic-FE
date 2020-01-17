import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { GlobalServiceService } from "src/app/services/global-service.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  newPassword: String = "";
  confirmPassword: String = "";

  constructor(
    private userServices: UsersService,
    private services: GlobalServiceService
  ) {}

  ngOnInit() {}

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.services.infoMessage("INFO", "Password doesn't match!");
      return false;
    }
    let data = {
      id: this.loggedElogistik.data.profileUser[0].id,
      password: this.newPassword,
      updated_by: this.loggedElogistik.data.profileUser[0].username
    };
    this.services.setFloading(true);
    this.userServices.changePassword(data).subscribe(
      (response: any) => {
        this.services.setFloading(false);
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
        } else {
          this.services.successMessage("SUCCESS", "Change Password Success!");
        }
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }
}
