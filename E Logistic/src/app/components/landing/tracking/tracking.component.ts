import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { ThemeVariables, ThemeRef, LyTheme2 } from "@alyle/ui";
import { STYLES as EXPANSION_STYLES } from "@alyle/ui/expansion";
import * as SecureLS from "secure-ls";
import { NgxConfirmBoxService } from "ngx-confirm-box";
import { Router } from "@angular/router";
import swal from "sweetalert";
import { PdfService } from "src/app/services/pdf.service";
import { MediaMatcher } from "@angular/cdk/layout";

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
  selector: "app-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.css"]
})
export class TrackingComponent implements OnInit, OnDestroy {
  readonly classes = this._theme.addStyleSheet(STYLES);
  startDatePeriode = new Date();
  endDatePeriode = new Date();
  maxDate = new Date();
  listHistoryOrder = [];
  listDetailOrder = [];
  dataTrackingOrder = null;
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  flagRecieveOrder = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private _theme: LyTheme2,
    private orderServices: OrderService,
    private services: GlobalServiceService,
    private confirmBox: NgxConfirmBoxService,
    private route: Router,
    private pdfService: PdfService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.loggedElogistik.data.profileRole.forEach(element => {
      if (element.role_code.trim() == "SPV_EL") {
        this.flagRecieveOrder = true;
      }
    });
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "tracking-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Tracking Order!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    this.getHistoryOrder();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getHistoryOrder() {
    this.listHistoryOrder = [];
    this.services.setFloading(true);
    this.orderServices
      .getHistoryOrder({
        created_by: this.loggedElogistik.data.profileUser[0].username,
        start_date: this.services.sqlServerDate(this.startDatePeriode),
        end_date: this.services.sqlServerDate(this.endDatePeriode)
      })
      .subscribe(
        (response: any) => {
          if (response.status == false) {
            this.services.openSnackBarErrorHttpReq(response);
            this.services.setFloading(false);
            return false;
          }
          this.services.setFloading(false);
          this.listHistoryOrder = response.data;
        },
        error => {
          this.services.openSnackBarErrorHttpReq(error);
          this.services.setFloading(false);
        }
      );
  }

  getDetailOrder(data) {
    this.listDetailOrder = [];
    this.dataTrackingOrder = null;
    this.services.setFloading(true);
    this.orderServices.getDetailOrder(data.id).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.listDetailOrder = response.data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  trackOrder(projectId) {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "tracking-order") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Tracking Order!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    this.dataTrackingOrder = null;
    this.services.setFloading(true);
    this.orderServices.trackOrder(projectId).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        this.dataTrackingOrder = response.data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  confirmRecieveOrder(projectId) {
    this.ls.remove("recieveId");
    this.ls.set("recieveId", projectId);
    this.confirmBox.show();
  }

  recieveOrder(showConfirm: boolean) {
    this.loggedElogistik.data.profileRole.forEach(element => {
      if (element.role_code.trim() == "SPV_EL") {
        this.flagRecieveOrder = true;
      }
    });
    if (!this.recieveOrder) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ",You don't have permission to recieve order!"
      );
      return false;
    }
    if (!showConfirm) {
      this.ls.remove("recieveId");
      return false;
    }
    this.route.navigate(["./landing/recieve"]);
  }

  onChangeStartDate() {
    if (
      this.startDatePeriode.getMonth() == new Date().getMonth() &&
      this.startDatePeriode.getFullYear() == new Date().getFullYear()
    ) {
      this.endDatePeriode = new Date();
    } else {
      this.endDatePeriode = new Date(
        this.startDatePeriode.getFullYear(),
        this.startDatePeriode.getMonth() + 1,
        0
      );
    }
  }

  showPicDelivery(captureDelivery) {
    swal({
      title: "PIC Delivery",
      text: "",
      content: {
        element: "img",
        attributes: {
          src: this.services.apiUrl + "images/" + captureDelivery,
          style: "width:255px;"
        }
      }
    });
  }

  print(data, detailOrder) {
    this.services
      .promptMessage("PRINT FNPB", "Are you sure?", "info")
      .then(res => {
        if (res == true) {
          let dataParam = {
            order_id: data.id,
            created_by: this.loggedElogistik.data.profileUser[0].username
          };
          this.services.setFloading(true);
          this.orderServices.recheckCountPrint(data.id).subscribe(
            (response: any) => {
              if (response.status == false) {
                this.services.openSnackBarErrorHttpReq(response);
                return false;
              }
              this.orderServices.printFNPB(dataParam).subscribe(
                (response2: any) => {
                  this.services.setFloading(false);
                  if (response2.status == false) {
                    this.services.openSnackBarErrorHttpReq(response2);
                    return false;
                  }
                  this.pdfService.printFNPB(
                    response.data[0],
                    detailOrder,
                    this.mobileQuery.matches ? true : false
                  );
                },
                error => {
                  this.services.openSnackBarErrorHttpReq(error);
                  this.services.setFloading(false);
                }
              );
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
