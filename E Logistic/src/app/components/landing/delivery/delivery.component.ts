import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { formatDate } from "@angular/common";
import { LyTheme2, Platform } from "@alyle/ui";
import {
  ImgCropperConfig,
  ImgCropperEvent,
  LyResizingCroppingImages,
  ImgCropperErrorEvent
} from "@alyle/ui/resizing-cropping-images";
import * as SecureLS from "secure-ls";
import { OrderService } from "src/app/services/order.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { NgxConfirmBoxService } from "ngx-confirm-box";
import { Router } from "@angular/router";
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
  selector: "app-delivery",
  templateUrl: "./delivery.component.html",
  styleUrls: ["./delivery.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class DeliveryComponent implements OnInit, AfterViewInit {
  classes = this.theme.addStyleSheet(styles);
  deliveryDate: String = formatDate(new Date(), "dd MMMM yyyy HH:mm", "en-US");

  croppedImage?: string;
  croppedImageMaterial?: string;
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
  ls = new SecureLS();
  deliveryData = this.ls.get("deliveryId");
  locationDelivery = "";
  pick_up_by = "";
  no_good_issue = "";
  loggedElogistik = this.ls.get("loggedElogistik");
  pic = this.loggedElogistik.data.profileUser[0].username;

  constructor(
    private theme: LyTheme2,
    private orderService: OrderService,
    private services: GlobalServiceService,
    private confirmBox: NgxConfirmBoxService,
    private route: Router,
    private userServices: UsersService
  ) {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "delivery-order") {
        flagAuthorize = true;
      }
    });
  }

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "delivery-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Delivery!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    if (!this.deliveryData) {
      this.route.navigate(["./landing/delivery-order"]);
      return false;
    } else {
      this.getLocationDelivery();
    }
  }

  ngAfterViewInit() {
    // demo: Load image from URL and update position, scale, rotate
    // this is supported only for browsers
    if (Platform.isBrowser) {
      const config = {
        scale: 1,
        position: {
          x: 642.380608078103,
          y: 236.26357452128866
        }
      };
      this.cropper.setImageUrl("", () => {
        this.cropper.setScale(config.scale, true);
        this.cropper.updatePosition(config.position.x, config.position.y);
        // You can also rotate the image
        // this.cropper.rotate(90);
      });
    }
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
  }
  onCroppedMaterial(e: ImgCropperEvent) {
    this.croppedImageMaterial = e.dataURL;
  }
  onloaded(e: ImgCropperEvent) {}
  onerror(e: ImgCropperErrorEvent) {}
  getLocationDelivery() {
    this.services.setFloading(true);
    this.orderService.getLocationDeliveryOrder(this.deliveryData.id).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        let data = response.data;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.locationDelivery =
            this.locationDelivery + element.storage_location_desc;
          if (index != data.length - 1) {
            this.locationDelivery = this.locationDelivery + ", ";
          }
        }
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  confirmSubmitDelivery() {
    if (!this.pick_up_by) {
      this.services.warningMessage("REQUIRED", "Pick Up By cannot be empty!");
      return false;
    }
    if (!this.croppedImage) {
      this.services.warningMessage("REQUIRED", "Image cannot be empty!");
      return false;
    }
    if (!this.croppedImageMaterial) {
      this.services.warningMessage(
        "REQUIRED",
        "Image Material cannot be empty!"
      );
      return false;
    }
    if (!this.no_good_issue) {
      this.services.warningMessage("REQUIRED", "GI Number cannot be empty!");
      return false;
    }
    this.confirmBox.show();
  }

  submitDelivery(showConfirm: boolean) {
    if (!showConfirm) {
      return false;
    }
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "delivery-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Delivery!"
      );
      return false;
    }
    this.services.setFloading(true);
    let data = {
      id: this.deliveryData.id,
      updated_by: this.pic,
      base64_url: this.croppedImage,
      base64_url_material: this.croppedImageMaterial,
      pick_up_by: this.pick_up_by,
      no_good_issue: this.no_good_issue,
      order_no: this.deliveryData.order_no,
      tr_delivery_id: this.deliveryData.tr_delivery_id
    };
    this.ls.remove("deliveryId");
    this.orderService.deliveryProsess(data).subscribe(
      (response: any) => {
        this.services.setFloading(false);
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.services.successMessage("SUCCESS", response.message);
        this.deliveryData.click_action =
          window.location.origin + "/#/landing/tracking-order";
        this.userServices
          .sendNotification(
            "users/sendNotificationsDelivery",
            this.deliveryData
          )
          .subscribe();
        this.route.navigate(["./landing/delivery-order"]);
        this.ls.remove("deliveryId");
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }
}
