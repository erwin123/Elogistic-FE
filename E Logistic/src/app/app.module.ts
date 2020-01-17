import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import {
  LyThemeModule,
  LY_THEME,
  LY_THEME_GLOBAL_VARIABLES,
  PartialThemeVariables
} from "@alyle/ui";
import { LyButtonModule } from "@alyle/ui/button";
import { MinimaLight } from "@alyle/ui/themes/minima";
import { LyFieldModule } from "@alyle/ui/field";
import { LyGridModule } from "@alyle/ui/grid";
import { LySnackBarModule } from "@alyle/ui/snack-bar";

import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LyIconModule } from "@alyle/ui/icon";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireModule } from "@angular/fire";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export class CustomMinimaLight implements PartialThemeVariables {
  name = "minima-light";
  primary = {
    default: "#213071",
    contrast: "#fff"
  };
  accent = {
    default: "#e91e63",
    contrast: "#fff"
  };
}

export class GlobalVariables implements PartialThemeVariables {
  typography = {
    fontFamily: `'Myriad', Fallback, sans-serif !important;`
  };
}

@NgModule({
  declarations: [AppComponent, LoginComponent, NotFoundComponent, ResetPasswordComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    LyThemeModule.setTheme("minima-light"),
    LyButtonModule,
    LyGridModule,
    LyFieldModule,
    LySnackBarModule,
    LyIconModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: CustomMinimaLight, multi: true },
    { provide: LY_THEME_GLOBAL_VARIABLES, useClass: GlobalVariables }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
