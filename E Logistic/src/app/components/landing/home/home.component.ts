import { Component, OnInit } from "@angular/core";
import { LyTheme2 } from "@alyle/ui";
import { GlobalServiceService } from "src/app/services/global-service.service";

const STYLES = {
  carousel: {
    margin: "auto",
    // responsive
    maxWidth: "540px",
    height: "50vh",
    minHeight: "220px",
    maxHeight: "320px"
  },
  carouselItem: {
    display: "flex",
    textAlign: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    padding: "1em 1em 48px",
    boxSizing: "border-box",
    color: "#fff",
    "&:nth-child(3)": {
      color: "#2b2b2b"
    }
  }
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  readonly classes = this._theme.addStyleSheet(STYLES);
  baseUrl = window.location.origin;
  items = [];

  constructor(
    private _theme: LyTheme2,
    private services: GlobalServiceService
  ) {}

  ngOnInit() {
    this.services.setFloading(true);
    this.items = [];
    this.services.getArticlesByApp().subscribe(
      (response: any) => {
        if (response == false) {
          this.services.errorMessage(JSON.stringify(response));
        } else {
          this.items = response.data;
          this.services.setFloading(false);
        }
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }
}
