import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { LyTheme2 } from "@alyle/ui";
import { MediaMatcher } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { GlobalServiceService } from "src/app/services/global-service.service";

const STYLES = {
  drawerContainer: {
    height: "calc(100vh - 64px)",
    transform: "translate3d(0,0,0)"
  },
  drawerContentArea: {
    padding: "1%",
    height: "100%",
    overflow: "auto"
  },
  icon: {
    margin: "0 8px"
  },
  iconSize: {
    fontSize: "20px"
  },
  grow: {
    flex: 1
  }
};
/* const DEFAULT = "190px over@XSmall";
const MINI = "56px over@XSmall"; */

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit, OnDestroy {
  readonly classes = this._theme.addStyleSheet(STYLES);
  mini = false;
  fOpened = false;
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");

  listMenuSideRight = [
    { name: "Logout", icon: "fa-sign-out-alt", routerOutlet: "" }
  ];
  listMenuReport = [];

  listMenuSideLeft = [];

  /*  get width() {
    return this.mini ? MINI : DEFAULT;
  } */

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _theme: LyTheme2,
    private route: Router,
    private usersService: UsersService,
    private services: GlobalServiceService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.listMenuSideLeft = this.loggedElogistik.data.profileMenu.filter(
      menu => {
        return !menu.route.toLowerCase().includes("report");
      }
    );
    this.listMenuReport = this.loggedElogistik.data.profileMenu.filter(menu => {
      return menu.route.toLowerCase().includes("report");
    });
  }

  toggleMini() {
    this.mini = !this.mini;
  }
  ngOnInit() {
    this.fOpened = true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.services.setFloading(true);
    let data = {
      id: this.ls.get("loggedElogistik").data.profileUser[0].id,
      application_id: 6
    };
    this.usersService.logoutUser("users/logout", data).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.errorMessage(response.message);
          this.services.setFloading(false);
        } else {
          this.services.setFloading(false);
          this.ls.removeAll();
          this.route.navigate(["login"]);
        }
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }
}
