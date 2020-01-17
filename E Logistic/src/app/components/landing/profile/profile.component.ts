import { Component, OnInit } from "@angular/core";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { DetailUser } from "src/app/entity/global-entity";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  detailUser: DetailUser = new DetailUser();

  constructor(
    private userServices: UsersService,
    private services: GlobalServiceService
  ) {
    this.getUserDetail();
  }

  ngOnInit() {}

  getUserDetail() {
    let data = { username: this.loggedElogistik.data.profileUser[0].username };
    this.services.setFloading(true);
    this.detailUser = new DetailUser();
    this.userServices.detail(data).subscribe((response: any) => {
      this.detailUser = response.data[0];
      this.services.setFloading(false);
    });
  }

  updateUser() {
    this.services.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.detailUser.updated_by = this.loggedElogistik.data.profileUser[0].username;
        this.services.setFloading(true);
        this.userServices.update(this.detailUser).subscribe(
          (response: any) => {
            if (response.status == false) {
              this.services.openSnackBarErrorHttpReq(response);
              this.services.setFloading(false);
              return false;
            }
            this.services.successMessage("SUCCESS", "Update user success!");
            this.getUserDetail();
          },
          error => {
            this.services.openSnackBarErrorHttpReq(error);
            this.services.setFloading(false);
          }
        );
      }
    });
  }
}
