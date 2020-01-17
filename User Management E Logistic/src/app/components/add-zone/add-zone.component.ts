import { Component, OnInit } from "@angular/core";
import { AddZone } from "src/app/entity";
import { ConfigService } from "src/app/services/config.service";
import { ZonesService } from "src/app/services/zones.service";
import * as SecureLS from "secure-ls";

@Component({
  selector: "app-add-zone",
  templateUrl: "./add-zone.component.html",
  styleUrls: ["./add-zone.component.scss"]
})
export class AddZoneComponent implements OnInit {
  ls = new SecureLS();
  addZone: AddZone = new AddZone();

  constructor(
    private config: ConfigService,
    private zoneServices: ZonesService
  ) {}

  ngOnInit() {}

  submit() {
    this.config.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.config.setFloading(true);
        this.addZone.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.zoneServices.addZone(this.addZone).subscribe(
          (response: any) => {
            this.config.setFloading(false);
            if (response.status == true) {
              this.config.successMessage("SAVE SUCCESS", response.message);
              this.addZone = new AddZone();
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
