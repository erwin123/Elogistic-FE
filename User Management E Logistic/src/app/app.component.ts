import { Component } from "@angular/core";
import { ConfigService } from "./services/config.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "fe-user-management";
  loading: Boolean = false;

  constructor(private config: ConfigService) {}
  ngOnInit() {
    this.config.getFloading().subscribe(response => (this.loading = response));
  }
}
