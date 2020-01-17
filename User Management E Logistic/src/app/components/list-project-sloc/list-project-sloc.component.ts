import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-list-project-sloc",
  templateUrl: "./list-project-sloc.component.html",
  styleUrls: ["./list-project-sloc.component.scss"]
})
export class ListProjectSlocComponent implements OnInit {
  listStorageLocation = [];
  constructor(
    private config: ConfigService,
    private userServices: UsersService
  ) {}

  ngOnInit() {
    this.getStorageLocation();
  }

  getStorageLocation() {
    this.listStorageLocation = [];
    this.config.setFloading(true);
    this.userServices.getUserSloc().subscribe(
      (response: any) => {
        this.config.setFloading(false);
        if (response.status == false) {
          this.config.errorMessage(JSON.stringify(response));
        } else {
          this.listStorageLocation = response.data;
        }
      },
      error => {
        this.config.errorMessage(JSON.stringify(error));
        this.config.setFloading(false);
      }
    );
  }

  showUser() {}
}
