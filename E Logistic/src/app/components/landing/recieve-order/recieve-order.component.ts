import { Component, OnInit } from "@angular/core";
import {
  ListRecieveOrder,
  ParamGetRecieveOrder,
  DetailRecieve
} from "src/app/entity/global-entity";
import { OrderService } from "src/app/services/order.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { LyTheme2, ThemeVariables, ThemeRef } from "@alyle/ui";
import { STYLES as EXPANSION_STYLES } from "@alyle/ui/expansion";
import { Router } from "@angular/router";

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
  selector: "app-recieve-order",
  templateUrl: "./recieve-order.component.html",
  styleUrls: ["./recieve-order.component.css"]
})
export class RecieveOrderComponent implements OnInit {
  listRecieveOrder: Array<ListRecieveOrder> = new Array<ListRecieveOrder>();
  paramGetRecieveOrder: ParamGetRecieveOrder = new ParamGetRecieveOrder();
  readonly classes = this._theme.addStyleSheet(STYLES);
  detailRecieve: Array<DetailRecieve> = new Array<DetailRecieve>();

  constructor(
    private orderService: OrderService,
    public services: GlobalServiceService,
    private _theme: LyTheme2,
    private route: Router
  ) {}

  ngOnInit() {
    this.getRecieveOrder();
  }

  getRecieveOrder() {
    this.services.setFloading(true);
    this.paramGetRecieveOrder.username = this.services.getUserLogin().data.profileUser[0].username;
    this.orderService.getRecieveOrder(this.paramGetRecieveOrder).subscribe(
      (response: any) => {
        this.listRecieveOrder = [];
        this.listRecieveOrder = response.data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }

  getDetailRecieve(tr_recieve_order_id) {
    this.services.setFloading(true);
    this.orderService.getDetailRecieve(tr_recieve_order_id).subscribe(
      (response: any) => {
        this.detailRecieve = [];
        this.detailRecieve = response.data;
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }

  recieveOrder() {
    let flagRecieveOrder = false;
    this.services.getUserLogin().data.profileRole.forEach(element => {
      if (element.role_code.trim() == "SPV_EL") {
        flagRecieveOrder = true;
      }
    });
    if (!flagRecieveOrder) {
      this.services.errorMessage(
        "Login as " +
          this.services.getUserLogin().data.profileUser[0].username +
          ",You don't have permission to recieve order!"
      );
      return false;
    }
    let emptyRecieveList: any;
    emptyRecieveList = this.detailRecieve.find(r => {
      if (!r.recieve_note) {
        return true;
      }
    });
    if (emptyRecieveList) {
      this.services.infoMessage("INFO", "Recieve Not cannot be empty!");
      return false;
    }
    this.route.navigate(["./landing/recieve"]);
    this.services.removeLs("recieveId");
    this.services.setLs("recieveId", this.detailRecieve);
  }
}
