import { Component, OnInit, ViewChild } from "@angular/core";
import { LyTheme2 } from "@alyle/ui";
import {
  ImgCropperConfig,
  ImgCropperEvent,
  LyResizingCroppingImages,
  ImgCropperErrorEvent
} from "@alyle/ui/resizing-cropping-images";
import { Router } from "@angular/router";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { OrderService } from "src/app/services/order.service";
import { ParamRecieveOrder } from "src/app/entity/global-entity";
import { Notifications } from "src/app/entity/global-entity";
import { UsersService } from "src/app/services/users.service";

const styles = {
  actions: {
    display: "flex"
  },
  cropping: {
    maxWidth: "400px",
    height: "300px"
  },
  flex: {
    flex: 1
  },
  range: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "14px"
  }
};

@Component({
  selector: "app-recieve",
  templateUrl: "./recieve.component.html",
  styleUrls: ["./recieve.component.css"]
})
export class RecieveComponent implements OnInit {
  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;
  scale: number;
  @ViewChild(LyResizingCroppingImages, { static: false })
  cropper: LyResizingCroppingImages;
  myConfig: ImgCropperConfig = {
    autoCrop: true,
    width: 860, // Default `250`
    height: 480, // Default `200`
    fill: "#ff2997", // Default transparent if type = png else #000,
    type: "image/jpeg"
  };
  loggedElogistik = this.services.getLs("loggedElogistik");
  paramRecieveOrder: ParamRecieveOrder = new ParamRecieveOrder();
  notification: Notifications = new Notifications();
  recieveDetail = this.services.getLs("recieveId");

  constructor(
    private theme: LyTheme2,
    private route: Router,
    private services: GlobalServiceService,
    private orderServices: OrderService,
    private userServices: UsersService
  ) {
    if (!this.services.getLs("recieveId")) {
      this.route.navigate(["./landing/recieve-order"]);
    }
  }

  ngOnInit() {}

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
  }

  onloaded(e: ImgCropperEvent) {}

  onerror(e: ImgCropperErrorEvent) {}

  cancelRecieve() {
    this.services.removeLs("recieveId");
    this.route.navigate(["./landing/recieve-order"]);
  }

  onSubmit() {
    if (!this.croppedImage) {
      this.services.infoMessage("REQUIRED", "Photo cannot be empty!");
      return false;
    }
    this.services
      .promptMessage("Recieve Order", "Are you sure?", "info")
      .then(res => {
        if (res == true) {
          this.services.setFloading(true);
          this.paramRecieveOrder.recieve_image = this.croppedImage;
          this.paramRecieveOrder.created_by = this.services.getUserLogin().data.profileUser[0].username;
          this.paramRecieveOrder.detail_recieve = this.services.getLs(
            "recieveId"
          );
          let notification: Notifications = new Notifications();
          notification.click_action =
            notification.click_action + "/#/landing/report/material-recieve";
          notification.body = "Material has been recieve. ";
          this.recieveDetail.forEach(element => {
            notification.body =
              notification.body +
              " " +
              element.material_desc +
              " : " +
              element.recieve_note +
              ".";
          });
          this.services.removeLs("recieveId");
          this.orderServices.recieveOrder(this.paramRecieveOrder).subscribe(
            (response: any) => {
              this.services.setFloading(false);
              if (response.status == false) {
                this.services.openSnackBarErrorHttpReq(response);
                return false;
              }
              this.services.successMessage("RECIEVE", response.message);
              this.services.removeLs("recieveId");
              this.userServices
                .sendNotification("users/sendNotifToRequestor", {
                  application_id: this.services.applicationId,
                  username: this.recieveDetail[0].created_by,
                  notification: notification
                })
                .subscribe();
              this.route.navigate(["./landing/tracking-order"]);
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
