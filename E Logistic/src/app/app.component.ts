import { Component } from "@angular/core";
import { LyTheme2, ThemeVariables } from "@alyle/ui";
import { GlobalServiceService } from "./services/global-service.service";
import {
  Router,
  RouterEvent,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from "@angular/router";

const styles = (theme: ThemeVariables) => ({
  "@global": {
    body: {
      // Styles for `<body>` element
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  readonly classes = this.theme.addStyleSheet(styles);
  activeLoading: Boolean = false;
  title = "e-warehouse-approval";
  constructor(
    private theme: LyTheme2,
    private services: GlobalServiceService,
    private router: Router
  ) {
    this.services
      .getFloading()
      .subscribe(response => (this.activeLoading = response));
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        this.services.setFloading(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.services.setFloading(false);
      }
    });
  }
}
