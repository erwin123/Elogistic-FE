import { Component, OnInit } from "@angular/core";
import { AddUser } from "src/app/entity";
import { ConfigService } from "src/app/services/config.service";
import { UsersService } from "src/app/services/users.service";
import * as SecureLS from "secure-ls";
import validator from "validator";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  addUser: AddUser = new AddUser();
  ls = new SecureLS();

  constructor(
    private config: ConfigService,
    private userServices: UsersService
  ) {
    this.addUser.password = this.generateRandomPassword();
  }

  ngOnInit() {}

  submit() {
    if (!validator.isAlpha(this.addUser.username)) {
      this.config.warningMessage("Invalid", "Invalid username!");
      return false;
    }

    if (!validator.isEmail(this.addUser.email)) {
      this.config.warningMessage("Invalid", "Invalid email!");
      return false;
    }

    if (!validator.isMobilePhone(this.addUser.no_handphone, "id-ID")) {
      this.config.warningMessage("Invalid", "Invalid Phone Number!");
      return false;
    }
    this.config.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.config.setFloading(true);
        this.addUser.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.userServices.addUser(this.addUser).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == true) {
              this.config.successMessage("SAVE SUCCESS", response.message);
              this.addUser = new AddUser();
              this.addUser.password = this.generateRandomPassword();
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

  generateRandomPassword() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
