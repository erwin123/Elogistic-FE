import { Component, OnInit, OnDestroy } from "@angular/core";
import { LyTheme2, ThemeVariables, ThemeRef } from "@alyle/ui";
import { STYLES as EXPANSION_STYLES } from "@alyle/ui/expansion";
import { OrderService } from "src/app/services/order.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { NgxConfirmBoxService } from "ngx-confirm-box";
import swal from "sweetalert";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Notifications } from "src/app/entity/global-entity";
// import { SignaturePad } from "angular2-signaturepad/signature-pad";

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
  selector: "app-approval-order",
  templateUrl: "./approval-order.component.html",
  styleUrls: ["./approval-order.component.css"]
})
export class ApprovalOrderComponent implements OnInit, OnDestroy {
  readonly classes = this._theme.addStyleSheet(STYLES);
  listOrderApproval = [];
  listDetailOrder = [];
  headerOrder;
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  private destroyed$ = new Subject<void>();

  // @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;

  /* signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    canvasWidth: 250,
    canvasHeight: 250,
    penColor: "#213071"
  }; */

  constructor(
    private _theme: LyTheme2,
    private orderService: OrderService,
    private services: GlobalServiceService,
    private confirmBox: NgxConfirmBoxService,
    private userServices: UsersService,
    private route: Router
  ) {}

  /* ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set("minWidth", 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  } */

  /*  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  } */

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "approval-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Approve!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    this.listOrderApproval = [];
    this.getListOrderApproval();
  }

  getListOrderApproval() {
    this.listOrderApproval = [];
    this.services.setFloading(true);
    let data = {
      plant_code: this.loggedElogistik.data.profileZone[0].plant_code,
      zone_id: this.loggedElogistik.data.profileZone[0].zone_id
    };
    this.orderService.getListOrderApproval(data).subscribe(
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
    this.headerOrder = null;
    this.services.setFloading(true);
    this.orderService.getDetailOrder(data.id).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listDetailOrder = response.data;
        this.headerOrder = data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  confirmSubmit() {
    this.confirmBox.show();
  }

  submitApproval(showConfirm: boolean) {
    if (!showConfirm) {
      return false;
    }
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "approval-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Approve!"
      );
      return false;
    }
    this.services.setFloading(true);
    this.listDetailOrder[0].updated_by = this.loggedElogistik.data.profileUser[0].username;
    this.orderService.prosessApproval(this.listDetailOrder).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listOrderApproval = [];
        swal("APPROVAL", "Approval Success!", "success");
        this.headerOrder.click_action =
          window.location.origin + "/#/landing/packing-order";
        let listDetailOrderReject = [];
        let notification: Notifications = new Notifications();
        notification.click_action =
          notification.click_action + "/#/landing/tracking-order";
        listDetailOrderReject = this.listDetailOrder.filter(material => {
          if (material.status == "1") {
            return true;
          }
        });
        if (listDetailOrderReject.length == 0) {
          notification.body = "Your order has been approved.";
          this.userServices
            .sendNotification(
              "users/sendNotificationsApprove",
              this.headerOrder
            )
            .subscribe();
          this.userServices
            .sendNotification("users/sendNotifToRequestor", {
              application_id: this.services.applicationId,
              username: this.listDetailOrder[0].created_by,
              notification: notification
            })
            .subscribe();
        } else if (
          listDetailOrderReject.length > 0 &&
          listDetailOrderReject.length != this.listDetailOrder.length
        ) {
          notification.body =
            "Your order has been approved, some material has been rejected by " +
            this.loggedElogistik.data.profileUser[0].full_name +
            "!";
          this.userServices
            .sendNotification(
              "users/sendNotificationsApprove",
              this.headerOrder
            )
            .subscribe();
          this.userServices
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
          this.userServices
            .sendNotification("users/sendNotifToRequestor", {
              application_id: this.services.applicationId,
              username: this.listDetailOrder[0].created_by,
              notification: notification
            })
            .subscribe();
        }
        this.getListOrderApproval();
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
