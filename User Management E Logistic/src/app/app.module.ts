import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LandingComponent } from "./components/landing/landing.component";
import { ListUserComponent } from "./components/list-user/list-user.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { HomeComponent } from "./components/home/home.component";
import { ListJobComponent } from "./components/list-job/list-job.component";
import { ListRoleComponent } from "./components/list-role/list-role.component";
import { AddJobComponent } from "./components/add-job/add-job.component";
import { ListUserJobComponent } from "./components/list-user-job/list-user-job.component";
import { AddUserJobComponent } from "./components/add-user-job/add-user-job.component";
import { AddRoleComponent } from "./components/add-role/add-role.component";
import { ListRoleJobComponent } from "./components/list-role-job/list-role-job.component";
import { AddRoleJobComponent } from "./components/add-role-job/add-role-job.component";
import { ListApplicationsComponent } from "./components/list-applications/list-applications.component";
import { AddApplicationsComponent } from "./components/add-applications/add-applications.component";
import { ListApplicationMenuComponent } from "./components/list-application-menu/list-application-menu.component";
import { AddApplicationMenuComponent } from "./components/add-application-menu/add-application-menu.component";
import { ListApplicationRoleComponent } from "./components/list-application-role/list-application-role.component";
import { AddApplicationRoleComponent } from "./components/add-application-role/add-application-role.component";
import { ListProjectComponent } from "./components/list-project/list-project.component";
import { ListUserProjectComponent } from "./components/list-user-project/list-user-project.component";
import { AddUserProjectComponent } from "./components/add-user-project/add-user-project.component";
import { ListZoneComponent } from "./components/list-zone/list-zone.component";
import { AddZoneComponent } from "./components/add-zone/add-zone.component";
import { ListZoneProjectComponent } from "./components/list-zone-project/list-zone-project.component";
import { AddZoneProjectComponent } from "./components/add-zone-project/add-zone-project.component";
import { ListAreaComponent } from "./components/list-area/list-area.component";
import { AddAreaComponent } from "./components/add-area/add-area.component";
import { ListAreaZoneProjectComponent } from "./components/list-area-zone-project/list-area-zone-project.component";
import { AddAreaZoneProjectComponent } from "./components/add-area-zone-project/add-area-zone-project.component";
import { ListUserProjectZoneComponent } from "./components/list-user-project-zone/list-user-project-zone.component";
import { AddUserProjectZoneComponent } from "./components/add-user-project-zone/add-user-project-zone.component";
import { ListProjectSlocComponent } from "./components/list-project-sloc/list-project-sloc.component";
import { ListArticlesComponent } from "./components/list-articles/list-articles.component";
import { AddArticlesComponent } from "./components/add-articles/add-articles.component";
import { ListUserAreaComponent } from "./components/list-user-area/list-user-area.component";
import { AddUserAreaComponent } from "./components/add-user-area/add-user-area.component";
import { AppConfig } from "./services/app-config";
import { DetailUserComponent } from './components/detail-user/detail-user.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    LandingComponent,
    ListUserComponent,
    AddUserComponent,
    HomeComponent,
    ListJobComponent,
    ListRoleComponent,
    AddJobComponent,
    ListUserJobComponent,
    AddUserJobComponent,
    AddRoleComponent,
    ListRoleJobComponent,
    AddRoleJobComponent,
    ListApplicationsComponent,
    AddApplicationsComponent,
    ListApplicationMenuComponent,
    AddApplicationMenuComponent,
    ListApplicationRoleComponent,
    AddApplicationRoleComponent,
    ListProjectComponent,
    ListUserProjectComponent,
    AddUserProjectComponent,
    ListZoneComponent,
    AddZoneComponent,
    ListZoneProjectComponent,
    AddZoneProjectComponent,
    ListAreaComponent,
    AddAreaComponent,
    ListAreaZoneProjectComponent,
    AddAreaZoneProjectComponent,
    ListUserProjectZoneComponent,
    AddUserProjectZoneComponent,
    ListProjectSlocComponent,
    ListArticlesComponent,
    AddArticlesComponent,
    ListUserAreaComponent,
    AddUserAreaComponent,
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
