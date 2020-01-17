import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuard } from "./auth.guard";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  {
    path: "landing",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: "./components/landing/landing.module#LandingModule"
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
