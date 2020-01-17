import { Component, OnInit } from "@angular/core";
import { LyTheme2, ThemeVariables, ThemeRef } from "@alyle/ui";
import { STYLES as EXPANSION_STYLES } from "@alyle/ui/expansion";
import { OrderService } from "src/app/services/order.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { NgxConfirmBoxService } from "ngx-confirm-box";
import swal from "sweetalert";
import * as SecureLS from "secure-ls";
import { Router } from "@angular/router";
import { Notifications } from "src/app/entity/global-entity";
import { UsersService } from "src/app/services/users.service";

const STYLES = (theme: ThemeVariables, themeRef: ThemeRef) => {
  // The classes for `expansion` are not yet created, therefore,
  // we will create them to use them.
  const expansion = themeRef.toClassSelector(
    themeRef.addStyleSheet(EXPANSION_STYLES)
  );

  return {
    expansion: {
      [`${expansion.panel}`]: {
        "&::after": {
          transition: `border ${theme.animations.durations.entering}ms ${theme.animations.curves.standard}`,
          content: `''`,
          position: "absolute",
          top: 0,
          bottom: 0,
          before: 0,
          borderBefore: "2px solid transparent"
        }
      },
      [`${expansion.panelHeader}`]: {
        height: "54px"
      },
      [`${expansion.panelTitle}`]: {
        fontWeight: 500
      },

      // When it is expanded
      [`${expansion.expanded}`]: {
        [`${expansion.panelHeader}`]: {
          height: "64px"
        },
        [`&${expansion.panel}`]: {
          background: theme.background.secondary,
          "&::after": {
            borderBefore: `2px solid ${theme.primary.default}`
          }
        },
        [`${expansion.panelHeader} ${expansion.panelTitle}`]: {
          color: theme.primary.default
        }
      }
    }
  };
};

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"]
})
export class ReservationComponent implements OnInit {
  readonly classes = this._theme.addStyleSheet(STYLES);
  listOrderApproval = [];
  listDetailOrder = [];
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");

  constructor(
    private _theme: LyTheme2,
    private orderService: OrderService,
    private services: GlobalServiceService,
    private confirmBox: NgxConfirmBoxService,
    private route: Router,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "packing-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Packing Order!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    this.getListPackingOrder();
  }

  getListPackingOrder() {
    this.listOrderApproval = [];
    this.services.setFloading(true);
    let data = {
      plant_code: this.loggedElogistik.data.profilePlant[0].plant_code
    };
    this.orderService.getListPackingOrder(data).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listOrderApproval = response.data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  getDetailOrder(data) {
    this.listDetailOrder = [];
    this.services.setFloading(true);
    this.orderService.getDetailOrder(data.id).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listDetailOrder = response.data;
        if (data.order_status == "5") {
          this.listDetailOrder = this.listDetailOrder.filter(detail => {
            if (data.order_status == "5" && detail.stock == "3") {
              return true;
            }
          });
        }
        this.listDetailOrder[0].tr_delivery_id = data.tr_delivery_id;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  confirmPackingOrder() {
    this.confirmBox.show();
  }

  submitPackingOrder(showConfirm: boolean) {
    if (!showConfirm) {
      return false;
    }
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "packing-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Packing Order!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    let listPartialOverQty = [];
    listPartialOverQty = this.listDetailOrder.filter(dataOrder => {
      if (
        dataOrder.stock == "3" &&
        dataOrder.quantity_shipping_new + dataOrder.quantity_shipping >
          dataOrder.quantity
      ) {
        return true;
      }
    });
    let listPartialZeroQuantity = [];
    listPartialZeroQuantity = this.listDetailOrder.filter(dataOrder => {
      if (
        dataOrder.stock == "3" &&
        (dataOrder.quantity_shipping_new == 0 ||
          !dataOrder.quantity_shipping_new)
      ) {
        return true;
      }
    });
    if (listPartialOverQty.length > 0) {
      this.services.infoMessage("REQUIRED", "Quantity exceeds the limit!");
      return false;
    }
    if (listPartialZeroQuantity.length > 0) {
      this.services.infoMessage("REQUIRED", "Quantity cannot be 0!");
      return false;
    }
    // this.services.setFloading(true);
    this.listDetailOrder[0].updated_by = this.loggedElogistik.data.profileUser[0].username;
    this.orderService.packingProsess(this.listDetailOrder).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listOrderApproval = [];
        let listDetailOrderReject = [];
        let notification: Notifications = new Notifications();
        notification.click_action =
          notification.click_action + "/#/landing/tracking-order";
        listDetailOrderReject = this.listDetailOrder.filter(material => {
          if (material.stock == "1") {
            return true;
          }
        });
        if (
          listDetailOrderReject.length > 0 &&
          listDetailOrderReject.length != this.listDetailOrder.length
        ) {
          notification.body =
            "Your order has been packed, some material has been rejected by " +
            this.loggedElogistik.data.profileUser[0].full_name +
            "!";
          this.usersService
            .sendNotification("users/sendNotifToRequestor", {
              application_id: this.services.applicationId,
              username: this.listDetailOrder[0].created_by,
              notification: notification
            })
            .subscribe();
        } else if (
          listDetailOrderReject.length > 0 &&
          listDetailOrderReject.length == this.listDetailOrder.length
        ) {
          notification.body =
            "Your order has been rejected by " +
            this.loggedElogistik.data.profileUser[0].full_name +
            "!";
          this.usersService
            .sendNotification("users/sendNotifToRequestor", {
              application_id: this.services.applicationId,
              username: this.listDetailOrder[0].created_by,
              notification: notification
            })
            .subscribe();
        }
        this.getListPackingOrder();
        swal("PACKING", "Packing Success!", "success");
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }
}
