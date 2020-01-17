import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LandingComponent } from "./components/landing/landing.component";
import { ListUserComponent } from "./components/list-user/list-user.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { ListJobComponent } from "./components/list-job/list-job.component";
import { ListRoleComponent } from "./components/list-role/list-role.component";
import { ListUserJobComponent } from "./components/list-user-job/list-user-job.component";
import { ListRoleJobComponent } from "./components/list-role-job/list-role-job.component";
import { ListApplicationsComponent } from "./components/list-applications/list-applications.component";
import { ListApplicationMenuComponent } from "./components/list-application-menu/list-application-menu.component";
import { ListApplicationRoleComponent } from "./components/list-application-role/list-application-role.component";
import { ListProjectComponent } from "./components/list-project/list-project.component";
import { ListUserProjectComponent } from "./components/list-user-project/list-user-project.component";
import { ListZoneComponent } from "./components/list-zone/list-zone.component";
import { ListZoneProjectComponent } from "./components/list-zone-project/list-zone-project.component";
import { ListAreaComponent } from "./components/list-area/list-area.component";
import { ListAreaZoneProjectComponent } from "./components/list-area-zone-project/list-area-zone-project.component";
import { ListUserProjectZoneComponent } from "./components/list-user-project-zone/list-user-project-zone.component";
import { ListProjectSlocComponent } from "./components/list-project-sloc/list-project-sloc.component";
import { ListArticlesComponent } from "./components/list-articles/list-articles.component";
import { ListUserAreaComponent } from "./components/list-user-area/list-user-area.component";
import { DetailUserComponent } from "./components/detail-user/detail-user.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "landing", redirectTo: "landing/home", pathMatch: "full" },
  {
    path: "landing",
    component: LandingComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "list-user", component: ListUserComponent },
      { path: "detail-user", component: DetailUserComponent },
      { path: "list-job", component: ListJobComponent },
      { path: "list-user-job", component: ListUserJobComponent },
      { path: "list-role", component: ListRoleComponent },
      { path: "list-role-job", component: ListRoleJobComponent },
      { path: "list-applications", component: ListApplicationsComponent },
      {
        path: "list-application-menu",
        component: ListApplicationMenuComponent
      },
      {
        path: "list-application-role",
        component: ListApplicationRoleComponent
      },
      { path: "list-project", component: ListProjectComponent },
      { path: "list-user-project", component: ListUserProjectComponent },
      { path: "list-zone", component: ListZoneComponent },
      { path: "list-zone-project", component: ListZoneProjectComponent },
      {
        path: "list-user-project-zone",
        component: ListUserProjectZoneComponent
      },
      { path: "list-area", component: ListAreaComponent },
      {
        path: "list-user-area",
        component: ListUserAreaComponent
      },
      {
        path: "list-area-zone-project",
        component: ListAreaZoneProjectComponent
      },
      {
        path: "list-project-sloc",
        component: ListProjectSlocComponent
      },
      {
        path: "list-articles",
        component: ListArticlesComponent
      }
    ]
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
