import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { ArticlesService } from "src/app/services/articles.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  listArticles = [];
  constructor(
    private services: ConfigService,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.listArticles = [];
    this.services.setFloading(true);
    this.articlesService.getArticlesByApp().subscribe(
      (response: any) => {
        if (response == false) {
          this.services.errorMessage(JSON.stringify(response));
        } else {
          this.listArticles = response.data;
          this.services.setFloading(false);
        }
      },
      error => {
        this.services.errorMessage(JSON.stringify(error));
      }
    );
  }
}
