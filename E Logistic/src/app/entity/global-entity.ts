export class ParamLogin {
  Username: String = "";
  Password: String = "";
}

export class MaterialMaster {
  materialCode: string = "";
  materialName: string = "";
  bun: string = "";
  qty: Number = 0;
  storageLocation: String = "";
}

export class DataInputFNPB {
  plant_code: any = "";
  zone_id: any = "";
  area_id: any = "";
  no_reservasi: String = "";
  material = [];
  created_by: String = "";
  click_action: String = "";
  description: String = "";
}

export class DetailUser {
  id: Number = 0;
  username: String = "";
  full_name: String = "";
  gender: String = "";
  email: String = "";
  no_handphone: String = "";
  updated_by: String = "";
}

export class Notifications {
  title: String = "E-Logistic";
  body: String = "";
  icon: String = window.location.origin + "/assets/icons/icon-512x512.png";
  click_action: String = window.location.origin;
}

export class ElasticSearchQuery {
  size: Number = 10000;
  query: ElasticSearchBool = new ElasticSearchBool();
}

export class ElasticSearchBool {
  bool: ElasticSearchMust = new ElasticSearchMust();
}

export class ElasticSearchMust {
  must: Array<any> = new Array<any>();
}

export class ParamGetCountStock {
  PROJECT_ID: Number = 0;
  MATERIAL_ID: Number = 0;
  STORAGE_LOCATION_CODE: String = "";
}

export class ListRecieveOrder {
  tr_recieve_order_id: String = "";
  order_no: String = "";
  delivery_by: String = "";
  delivery_picture: String = "";
  delivery_picture_2: String = "";
  no_reservasi: String = "";
  project_name: String = "";
  zone_name: String = "";
  area_name: String = "";
  panel_state: any = "";
}

export class ParamGetRecieveOrder {
  username: String = "";
}

export class DetailRecieve {
  id: String = "";
  tr_recieve_order_id: String = "";
  tr_delivery_d_id: String = "";
  tr_delivery_id: String = "";
  tr_order_d_id: String = "";
  tr_order_id: String = "";
  material_desc: String = "";
  stock: number = 0;
  quantity: number = 0;
  quantity_shipping: number = 0;
  recieve_note: String = "";
  base_unit_of_measure: String = "";
}

export class ParamRecieveOrder {
  recieve_image: String = "";
  created_by: String = "";
  detail_recieve: Array<DetailRecieve> = new Array<DetailRecieve>();
}

export class ResetPasswordParam {
  email: String = "";
}

export class ParamGetMaterialHasNotBeenSent {
  created_by: String = "";
  material_code: String = "";
}
