import { Component, OnInit } from "@angular/core";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { ResetPasswordService } from "src/app/services/reset-password.service";
import { ResetPasswordParam } from "src/app/entity/global-entity";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  data: ResetPasswordParam = new ResetPasswordParam();

  constructor(
    private services: GlobalServiceService,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit() {}

  resetPassword() {
    this.services
      .promptMessage("RESET!", "Are you sure?", "info")
      .then(data => {
        if (data == true) {
          this.services.setFloading(true);
          this.resetPasswordService.resetPassword(this.data).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.errorMessage(response.message);
              } else {
                this.services.successMessage("SUCCESS", response.message);
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
