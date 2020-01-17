import { Component, OnInit } from "@angular/core";
import { LyTheme2 } from "@alyle/ui";
import { NgxConfirmBoxService } from "ngx-confirm-box";
import { OrderService } from "src/app/services/order.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";

@Component({
  selector: "app-delivery-order",
  templateUrl: "./delivery-order.component.html",
  styleUrls: ["./delivery-order.component.css"]
})
export class DeliveryOrderComponent implements OnInit {
  listDeliveryOrder = [];
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");

  constructor(
    private _theme: LyTheme2,
    private confirmBox: NgxConfirmBoxService,
    private orderServices: OrderService,
    private services: GlobalServiceService,
    private route: Router
  ) {}

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
    this.getListDeliveryOrder();
  }

  confirmDeliveryOrder(dataOrder) {
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
          ", You don't have permission to Prosess Delivery!"
      );
      return false;
    }
    this.ls.remove("deliveryId");
    this.ls.set("deliveryId", dataOrder);
    this.confirmBox.show();
  }

  deliveryOrder(showConfirm: boolean) {
    if (!showConfirm) {
      this.ls.remove("deliveryId");
      return false;
    }
    this.route.navigate(["./landing/delivery"]);
  }

  getListDeliveryOrder() {
    this.listDeliveryOrder = [];
    this.services.setFloading(true);
    let data = {
      plant_code: this.loggedElogistik.data.profilePlant[0].plant_code
    };
    this.orderServices.getListDeliveryOrder(data).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listDeliveryOrder = response.data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }
}
