import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "src/app/services/articles.service";
import { ConfigService } from "src/app/services/config.service";
import * as SecureLS from "secure-ls";
import { ApplicationsService } from "src/app/services/applications.service";

@Component({
  selector: "app-list-articles",
  templateUrl: "./list-articles.component.html",
  styleUrls: ["./list-articles.component.scss"]
})
export class ListArticlesComponent implements OnInit {
  listArticles = [];
  ls = new SecureLS();
  detailArticle: any;
  showModalEditArticle: Boolean = false;
  listApplication = [];
  startDate;
  endDate;
  fileSize: any;
  fileType: any;

  constructor(
    private services: ConfigService,
    private articlesService: ArticlesService,
    private applicationsService: ApplicationsService
  ) {}

  ngOnInit() {
    this.getArticles();
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

  getArticles() {
    this.services.setFloading(true);
    this.listArticles = [];
    this.articlesService.getAllArticles().subscribe(
      (response: any) => {
        if (response.status == false) {
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

  activeDeactiveArticle(data) {
    this.services
      .promptMessage(
        "Are you sure?",
        data.is_active == 1
          ? "Non Activate Article " + data.title
          : "Active Article " + data.title,
        "info"
      )
      .then(res => {
        if (res == true) {
          this.services.setFloading(true);
          this.articlesService
            .activatedArticle({
              id: data.id,
              is_active: data.is_active == 1 ? 0 : 1,
              updated_by: this.ls.get("loggedUM").profileUser[0].username
            })
            .subscribe(
              (response: any) => {
                this.services.setFloading(false);
                if (response.status == false) {
                  this.services.errorMessage(JSON.stringify(response));
                } else {
                  this.services.successMessage("SAVE", "Success!");
                  this.getArticles();
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

  deleteArticle(data) {
    this.services
      .promptMessage("Are you sure?", "Delete Article " + data.title, "warning")
      .then(res => {
        if (res == true) {
          this.services.setFloading(true);
          this.articlesService
            .deleteArticle({
              id: data.id,
              updated_by: this.ls.get("loggedUM").profileUser[0].username
            })
            .subscribe(
              (response: any) => {
                this.services.setFloading(false);
                if (response.status == false) {
                  this.services.errorMessage(JSON.stringify(response));
                } else {
                  this.services.successMessage("SAVE", "Success!");
                  this.getArticles();
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

  modalEditArticle(data) {
    this.detailArticle = null;
    this.detailArticle = data;
    this.getApplication();
    this.showModalEditArticle = true;
    this.startDate = this.services.clarityDate(this.detailArticle.start_date);
    this.endDate = this.services.clarityDate(this.detailArticle.end_date);
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
        this.fileType = false;
        return false;
      } else {
        this.fileSize = event.target.files[0].size;
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.detailArticle.base64_url = reader.result.toString();
        };
      }
    }
  }

  updateArticle() {
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

    if (this.fileType == false) {
      this.services.infoMessage("INFO", "Extension only JPG, JPEG, PNG");
      return false;
    }
    this.services.promptMessage("SAVE", "Are you sure?", "info").then(res => {
      if (res == true) {
        this.detailArticle.start_date = this.services.sqlServerDate(
          this.startDate
        );
        this.detailArticle.end_date = this.services.sqlServerDate(this.endDate);
        this.detailArticle.updated_by = this.ls.get(
          "loggedUM"
        ).profileUser[0].username;
        this.services.setFloading(true);
        this.articlesService.updateArticle(this.detailArticle).subscribe(
          (response: any) => {
            if (response.status == false) {
              this.services.errorMessage(JSON.stringify(response));
              this.services.setFloading(false);
            } else {
              this.services.successMessage(
                "SUCCESS",
                "Update article success!"
              );
              this.detailArticle = null;
              this.startDate = "";
              this.endDate = "";
              this.fileSize = null;
              this.fileType = null;
              this.showModalEditArticle = false;
              this.getArticles();
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
}
