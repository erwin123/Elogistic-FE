import { Component, OnInit } from "@angular/core";
import { AddArea } from "src/app/entity";
import { ConfigService } from "src/app/services/config.service";
import { AreasService } from "src/app/services/areas.service";
import * as SecureLS from "secure-ls";

@Component({
  selector: "app-add-area",
  templateUrl: "./add-area.component.html",
  styleUrls: ["./add-area.component.scss"]
})
export class AddAreaComponent implements OnInit {
  ls = new SecureLS();
  addArea: AddArea = new AddArea();

  constructor(
    private config: ConfigService,
    private areaServices: AreasService
  ) {}

  ngOnInit() {}

  submit() {
    this.config.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.config.setFloading(true);
        this.addArea.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.areaServices.addArea(this.addArea).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == true) {
              this.config.successMessage("SAVE SUCCESS", response.message);
              this.addArea = new AddArea();
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
