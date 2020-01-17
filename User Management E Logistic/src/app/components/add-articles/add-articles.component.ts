import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { ApplicationsService } from "src/app/services/applications.service";
import { AddArticles } from "src/app/entity";
import * as SecureLS from "secure-ls";
import { ArticlesService } from "src/app/services/articles.service";

@Component({
  selector: "app-add-articles",
  templateUrl: "./add-articles.component.html",
  styleUrls: ["./add-articles.component.scss"]
})
export class AddArticlesComponent implements OnInit {
  listApplication = [];
  newArticle: AddArticles = new AddArticles();
  fileSize: any;
  startDate: String = "";
  endDate: String = "";
  fileImage: any;
  ls = new SecureLS();

  constructor(
    private services: ConfigService,
    private applicationsService: ApplicationsService,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.getApplication();
  }

  getApplication() {
    this.listApplication = [];
    this.services.setFloading(true);
    this.applicationsService.getApplications().subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.errorMessage(JSON.stringify(response));
        } else {
          this.listApplication = response.data;
          this.services.setFloading(false);
        }
      },
      error => {
        this.services.errorMessage(JSON.stringify(error));
      }
    );
  }

  submit() {
    if (!this.startDate || !this.endDate) {
      this.services.infoMessage(
        "REQUIRED",
        "Start Date and End Date cannot be empty!"
      );
      return false;
    }

    if (this.fileSize > 9000000) {
      this.services.infoMessage("INFO", "File cannot exceed 9MB");
      return false;
    }

    if (!this.fileSize) {
      this.services.infoMessage("INFO", "Extension only JPG, JPEG, PNG");
      return false;
    }
    this.services.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.newArticle.start_date = this.services.sqlServerDate(
          this.startDate
        );
        this.newArticle.end_date = this.services.sqlServerDate(this.endDate);
        this.newArticle.created_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.services.setFloading(true);
        this.articlesService.addArticles(this.newArticle).subscribe(
          (response: any) => {
            if (response.status == false) {
              this.services.errorMessage(JSON.stringify(response));
              this.services.setFloading(false);
            } else {
              this.services.successMessage("SUCCESS", "Add article success!");
              this.newArticle = new AddArticles();
              this.startDate = "";
              this.endDate = "";
              this.fileSize = null;
              this.services.setFloading(false);
            }
          },
          error => {
            this.services.errorMessage(JSON.stringify(error));
            this.services.setFloading(false);
          }
        );
      }
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].size > 9000000) {
        this.services.infoMessage("INFO", "File cannot exceed 9MB");
        return false;
      } else if (
        event.target.files[0].type != "image/jpeg" &&
        event.target.files[0].type != "image/png" &&
        event.target.files[0].type != "image/jpg"
      ) {
        this.services.infoMessage("INFO", "Extension only JPG, JPEG, PNG");
        return false;
      } else {
        this.fileSize = event.target.files[0].size;
      }
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newArticle.base64_url = reader.result.toString();
      };
    }
  }
}
