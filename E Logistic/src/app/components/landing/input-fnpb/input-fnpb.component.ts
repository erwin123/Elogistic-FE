import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  MaterialMaster,
  DataInputFNPB,
  ElasticSearchQuery,
  ParamGetCountStock,
  ParamGetMaterialHasNotBeenSent
} from "src/app/entity/global-entity";
import { Observable } from "rxjs";
import { AreasService } from "src/app/services/areas.service";
import { GlobalServiceService } from "src/app/services/global-service.service";
import { ZoneService } from "src/app/services/zone.service";
import { OrderService } from "src/app/services/order.service";
import { NgxConfirmBoxService } from "ngx-confirm-box";
import swal from "sweetalert";
import * as SecureLS from "secure-ls";
import { UsersService } from "src/app/services/users.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-input-fnpb",
  templateUrl: "./input-fnpb.component.html",
  styleUrls: ["./input-fnpb.component.css"]
})
export class InputFnpbComponent implements OnInit, OnDestroy {
  listMaterial = [];
  material = [];
  filterMaterial: Observable<MaterialMaster[]>;
  formFnpb: DataInputFNPB = new DataInputFNPB();
  listProject = [];
  listZone = [];
  listArea = [];
  lastUpdateStock;
  ls = new SecureLS();
  loggedElogistik = this.ls.get("loggedElogistik");
  private destroyed$ = new Subject<void>();
  _timer = null;
  eS: ElasticSearchQuery = new ElasticSearchQuery();
  quantityMaterialHasNotBeenSent: number = 0;

  constructor(
    private zoneService: ZoneService,
    private areaServices: AreasService,
    private services: GlobalServiceService,
    private orderService: OrderService,
    private confirmBox: NgxConfirmBoxService,
    private userServices: UsersService,
    private route: Router
  ) {}

  ngOnInit() {
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "input-fnpb") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Input FNPB!"
      );
      this.route.navigate(["./landing/home"]);
      return false;
    }
    this.getProject();
    this.getLastUpdateStock();
  }

  addMaterial() {
    this.services.setFloading(true);
    setTimeout(() => {
      this.listMaterial.push({
        material_code: "",
        material_desc: "",
        base_unit_of_measure: "",
        quantity: "",
        storage_location_code: "",
        storage_location_desc: "",
        description: "",
        lastHourMeter: 0,
        unrestricted: 0
      });
      this.material = [];
      this.services.setFloading(false);
    }, 50);
  }

  setMaterial(material, index) {
    let flagAlreadyExixst = false;
    this.listMaterial.forEach(element => {
      if (element.material_code == material.MATERIAL_CODE) {
        flagAlreadyExixst = true;
      }
    });
    if (flagAlreadyExixst) {
      this.services.infoMessage("INFO", "Material already exixst!");
      return false;
    }
    let param: ParamGetCountStock = new ParamGetCountStock();
    param.PROJECT_ID = material.PROJECT_ID;
    param.MATERIAL_ID = material.MATERIAL_ID;
    param.STORAGE_LOCATION_CODE = material.STORAGE_LOCATION_CODE;
    this.services.setFloading(true);
    this.orderService.getCountStock(param).subscribe(
      (resCountStock: any) => {
        this.listMaterial[index].material_code = material.MATERIAL_CODE;
        this.listMaterial[index].material_desc = material.MATERIAL_DESC;
        this.listMaterial[index].base_unit_of_measure =
          material.BASE_UNIT_OF_MEASURE;
        this.listMaterial[index].storage_location_desc =
          material.STORAGE_LOCATION_DESC;
        this.listMaterial[index].storage_location_code =
          material.STORAGE_LOCATION_CODE;
        this.listMaterial[index].unrestricted =
          resCountStock.data[0].COUNTSTOCK;

        let param: ParamGetMaterialHasNotBeenSent = {
          material_code: material.MATERIAL_CODE,
          created_by: this.loggedElogistik.data.profileUser[0].username
        };

        this.orderService.getMaterialHasNotBeenSent(param).subscribe(
          (res: any) => {
            this.quantityMaterialHasNotBeenSent = 0;
            res.data.forEach(element => {
              this.quantityMaterialHasNotBeenSent =
                element.quantity - element.quantity_shipping;
            });
            this.services.setFloading(false);
          },
          error => {
            this.services.openSnackBarErrorHttpReq(error);
          }
        );
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
    this.material = [];
  }

  removeMaterial(index) {
    this.services.setFloading(true);
    setTimeout(() => {
      this.listMaterial.splice(index, 1);
      this.services.setFloading(false);
    }, 50);
  }

  onChangeMaterialName(index, word) {
    this.listMaterial[index].material_code = "";
    this.listMaterial[index].base_unit_of_measure = "";
    if (this._timer) window.clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      if (word) {
        if (word.length >= 3) {
          word = word.toUpperCase();
          this.services.setFloading(true);
          this.orderService.checkIndexElasticSearch().subscribe(
            (response: any) => {
              this.orderService.countDataIndexElasticSearch().subscribe(
                (responseCount: any) => {
                  if (responseCount.count > 0) {
                    let data = [
                      {
                        match: {
                          "PLANT_CODE.keyword": this.formFnpb.plant_code
                        }
                      },
                      {
                        prefix: {
                          "MATERIAL_DESC.keyword": word
                        }
                      }
                    ];
                    this.eS.query.bool.must = [];
                    this.eS.query.bool.must.push(data);
                    this.orderService.getMaterialFromEs(this.eS).subscribe(
                      (responseMat: any) => {
                        this.material = responseMat.hits.hits;
                        this.services.setFloading(false);
                      },
                      error => {
                        this.services.openSnackBarErrorHttpReq(error);
                        this.services.setFloading(false);
                      }
                    );
                  } else {
                    this.orderService.addDataFromDbToEs().subscribe(
                      (responseAddData: any) => {
                        let data = [
                          {
                            match: {
                              "PLANT_CODE.keyword": this.formFnpb.plant_code
                            }
                          },
                          {
                            prefix: {
                              "MATERIAL_DESC.keyword": word
                            }
                          }
                        ];
                        this.eS.query.bool.must = [];
                        this.eS.query.bool.must.push(data);
                        this.orderService.getMaterialFromEs(this.eS).subscribe(
                          (responseMat: any) => {
                            this.material = responseMat.hits.hits;
                            this.services.setFloading(false);
                          },
                          error => {
                            this.services.openSnackBarErrorHttpReq(error);
                            this.services.setFloading(false);
                          }
                        );
                      },
                      error => {
                        this.services.openSnackBarErrorHttpReq(error);
                        this.services.setFloading(false);
                      }
                    );
                  }
                },
                error => {
                  this.services.openSnackBarErrorHttpReq(error);
                  this.services.setFloading(false);
                }
              );
            },
            error => {
              if (error.status == 404) {
                this.orderService.createIndexElasticSearch().subscribe(
                  (responseCI: any) => {
                    this.orderService.countDataIndexElasticSearch().subscribe(
                      (responseCount: any) => {
                        if (responseCount.count > 0) {
                          let data = [
                            {
                              match: {
                                "PLANT_CODE.keyword": this.formFnpb.plant_code
                              }
                            },
                            {
                              prefix: {
                                "MATERIAL_DESC.keyword": word
                              }
                            }
                          ];
                          this.eS.query.bool.must = [];
                          this.eS.query.bool.must.push(data);
                          this.orderService
                            .getMaterialFromEs(this.eS)
                            .subscribe(
                              (responseMat: any) => {
                                this.material = responseMat.hits.hits;
                                this.services.setFloading(false);
                              },
                              error => {
                                this.services.openSnackBarErrorHttpReq(error);
                                this.services.setFloading(false);
                              }
                            );
                        } else {
                          this.orderService.addDataFromDbToEs().subscribe(
                            (responseAddData: any) => {
                              let data = [
                                {
                                  match: {
                                    "PLANT_CODE.keyword": this.formFnpb
                                      .plant_code
                                  }
                                },
                                {
                                  prefix: {
                                    "MATERIAL_DESC.keyword": word
                                  }
                                }
                              ];
                              this.eS.query.bool.must = [];
                              this.eS.query.bool.must.push(data);
                              this.orderService
                                .getMaterialFromEs(this.eS)
                                .subscribe(
                                  (responseMat: any) => {
                                    this.material = responseMat.hits.hits;
                                    this.services.setFloading(false);
                                  },
                                  error => {
                                    this.services.openSnackBarErrorHttpReq(
                                      error
                                    );
                                    this.services.setFloading(false);
                                  }
                                );
                            },
                            error => {
                              this.services.openSnackBarErrorHttpReq(error);
                              this.services.setFloading(false);
                            }
                          );
                        }
                      },
                      error => {
                        this.services.openSnackBarErrorHttpReq(error);
                        this.services.setFloading(false);
                      }
                    );
                  },
                  error => {
                    this.services.openSnackBarErrorHttpReq(error);
                    this.services.setFloading(false);
                  }
                );
              } else {
                this.services.openSnackBarErrorHttpReq(error);
                this.services.setFloading(false);
              }
            }
          );
        } else {
          this.material = [];
        }
      } else {
        this.material = [];
      }
    }, 800);
  }

  getProject() {
    this.listProject = [];
    this.listProject = this.loggedElogistik.data.profilePlant;
    this.formFnpb.plant_code = this.listProject[0].plant_code;
    this.getZoneByProject();
  }

  getZoneByProject() {
    this.services.setFloading(true);
    this.listZone = [];
    this.listArea = [];
    this.formFnpb.zone_id = 0;
    this.formFnpb.area_id = 0;
    this.listMaterial.forEach(element => {
      element.material_code = "";
      element.material_desc = "";
      element.base_unit_of_measure = "";
      element.quantity = "";
      element.storage_location_code = "";
      element.storage_location_desc = "";
      element.description = "";
      element.lastHourMeter = 0;
      element.unrestricted = 0;
    });
    this.material = [];
    if (this.formFnpb.plant_code != 0) {
      this.zoneService
        .getZoneByProject({ plant_code: this.formFnpb.plant_code })
        .subscribe(
          (response: any) => {
            if (response.status == false) {
              this.services.openSnackBarErrorHttpReq(response);
              this.services.setFloading(false);
              return false;
            }
            if (response.data) {
              if (response.data.length == 0) {
                this.services.infoMessage("INFO", "No zone found!");
                this.services.setFloading(false);
              } else {
                this.listZone = response.data;
                this.services.setFloading(false);
              }
            }
          },
          error => {
            this.services.openSnackBarErrorHttpReq(error);
            this.services.setFloading(false);
          }
        );
    } else {
      this.services.setFloading(false);
    }
  }

  getAreaByProjectZone() {
    this.services.setFloading(true);
    this.listArea = [];
    this.formFnpb.area_id = 0;
    if (this.formFnpb.zone_id != 0) {
      this.areaServices
        .getAreaByProjectZone({
          plant_code: this.formFnpb.plant_code,
          zone_id: this.formFnpb.zone_id
        })
        .subscribe(
          (response: any) => {
            if (response.status == false) {
              this.services.openSnackBarErrorHttpReq(response);
              this.services.setFloading(false);
              return false;
            }
            if (response.data) {
              if (response.data.length == 0) {
                this.services.infoMessage("INFO", "No area found!");
                this.services.setFloading(false);
              } else {
                this.listArea = response.data;
                this.services.setFloading(false);
              }
            }
          },
          error => {
            this.services.openSnackBarErrorHttpReq(error);
            this.services.setFloading(false);
          }
        );
    } else {
      this.services.setFloading(false);
    }
  }

  confirmSubmit() {
    this.confirmBox.show();
  }

  inputFnpb(showConfirm: boolean) {
    if (!showConfirm) {
      return false;
    }
    let flagAuthorize = false;
    this.loggedElogistik.data.profileMenu.forEach(element => {
      if (element.route == "input-fnpb") {
        flagAuthorize = true;
      }
    });
    if (!flagAuthorize) {
      this.services.errorMessage(
        "Login as " +
          this.loggedElogistik.data.profileUser[0].username +
          ", You don't have permission to Input FNPB!"
      );
      return false;
    }
    this.services.setFloading(true);
    this.formFnpb.material = this.listMaterial;
    // VALIDASI BEFORE SUBMIT
    if (!this.formFnpb.plant_code || this.formFnpb.plant_code == 0) {
      this.services.infoMessage("INFO", "Project cannot be empty!");
      this.services.setFloading(false);
      return false;
    }
    if (!this.formFnpb.zone_id || this.formFnpb.zone_id == 0) {
      this.services.infoMessage("INFO", "Zone cannot be empty!");
      this.services.setFloading(false);
      return false;
    }
    if (!this.formFnpb.area_id || this.formFnpb.area_id == 0) {
      this.services.infoMessage("INFO", "Area cannot be empty!");
      this.services.setFloading(false);
      return false;
    }
    if (!this.formFnpb.description) {
      this.services.infoMessage("INFO", "Description cannot be empty!");
      this.services.setFloading(false);
      return false;
    }

    /* if (!this.formFnpb.no_reservasi) {
      this.services.infoMessage("INFO", "No. Reservasi cannot be empty!");
      this.services.setFloading(false);
      return false;
    }

    if (this.formFnpb.no_reservasi.trim().length == 0) {
      this.services.infoMessage("INFO", "No. Reservasi cannot be empty!");
      this.services.setFloading(false);
      return false;
    } */

    if (this.listMaterial.length == 0) {
      this.services.infoMessage("INFO", "Please add material first!");
      this.services.setFloading(false);
      return false;
    }
    let flagMaterialCode = true;
    let flagQuantity = true;
    let flagOverQuantity = false;
    let flagInvalidQuantity = false;
    let flagNoRegSolar = true;
    let flagInvalidLastHourMeter = false;
    this.listMaterial.forEach(element => {
      if (!element.material_code) {
        flagMaterialCode = false;
      }
      if (!element.quantity) {
        flagQuantity = false;
      }
      if (element.quantity > element.unrestricted) {
        flagOverQuantity = true;
      }
      if (element.quantity < 1) {
        flagInvalidQuantity = true;
      }
      if (element.material_desc == "SOLAR" && !element.description.trim()) {
        flagNoRegSolar = false;
      }
      if (element.material_desc == "SOLAR" && element.lastHourMeter < 0) {
        flagNoRegSolar = true;
      }
    });
    if (!flagMaterialCode) {
      this.services.infoMessage("INFO", "Material cannot be empty!");
      this.services.setFloading(false);
      return false;
    }
    if (!flagQuantity) {
      this.services.infoMessage("INFO", "Quantity cannot be empty!");
      this.services.setFloading(false);
      return false;
    }
    if (flagOverQuantity) {
      this.services.infoMessage("INFO", "Insufficient stock!");
      this.services.setFloading(false);
      return false;
    }
    if (flagInvalidQuantity) {
      this.services.infoMessage("INFO", "Invalid quantity!");
      this.services.setFloading(false);
      return false;
    }
    if (!flagNoRegSolar) {
      this.services.infoMessage("INFO", "No. Registrasi cannot be empty!");
      this.services.setFloading(false);
      return false;
    }
    if (flagInvalidLastHourMeter) {
      this.services.infoMessage("INFO", "Invalid Last Hour Meter!");
      this.services.setFloading(false);
      return false;
    }
    // END VALIDASI BEFORE SUBMIT
    this.formFnpb.created_by = this.loggedElogistik.data.profileUser[0].username;
    this.orderService.order(this.formFnpb).subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          this.services.setFloading(false);
          return false;
        }
        swal(
          "REQUEST SUCSESS",
          response.message + ", Request ID : " + response.data.order_no,
          "success"
        );
        this.formFnpb.click_action =
          window.location.origin + "/#/landing/approval-order";
        this.userServices
          .sendNotification("users/sendNotificationsNewOrder", this.formFnpb)
          .subscribe();
        this.formFnpb = new DataInputFNPB();
        this.formFnpb.plant_code = this.listProject[0].plant_code;
        this.getZoneByProject();
        this.formFnpb.material = [];
        this.listMaterial = [];
        this.services.setFloading(false);
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
        this.services.setFloading(false);
      }
    );
  }

  getLastUpdateStock() {
    this.orderService.getLastUpdateStock().subscribe(
      (response: any) => {
        if (response.status == false) {
          this.services.openSnackBarErrorHttpReq(response);
          return false;
        }
        this.lastUpdateStock = response.data[0].last_update_stock;
      },
      error => {
        this.services.openSnackBarErrorHttpReq(error);
      }
    );
  }

  displayFn(material?: MaterialMaster): string | undefined {
    return material ? material.materialName : undefined;
  }

  private _filter(materialName: string): MaterialMaster[] {
    const filterValue = materialName.toLowerCase();

    return this.material.filter(
      option => option.materialName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
