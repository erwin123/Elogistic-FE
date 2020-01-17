export class Index {
  appVersion: Number = 1.0;
  appName: String = "UserManagement";
}

export class FormLogin {
  username: String = "";
  password: String = "";
  application_id: Number;
  token_fcm: String = "";
}

export class AddUser {
  username: String = "";
  full_name: String = "";
  gender: String = "";
  email: String = "";
  no_handphone: String = "";
  password: String = "";
  created_by: String = "";
}

export class AddJob {
  job_code: String = "";
  job_desc: String = "";
  created_by: String = "";
}

export class AddRole {
  role_code: String = "";
  role_desc: String = "";
  created_by: String = "";
}

export class AddApplication {
  application_name: String = "";
  created_by: String = "";
}

export class AddZone {
  zone_name: String = "";
  created_by: String = "";
}

export class AddArea {
  area_name: String = "";
  created_by: String = "";
}

export class AddArticles {
  title: String = "";
  description: String = "";
  application_id: String = "0";
  base64_url: String = "";
  start_date: String = "";
  end_date: String = "";
  created_by: String = "";
}

export class AppConfigUrl {
  api_login_url: string = "";
  api_url: string = "";
  api_elogistic: string = "";
  application_id = 0;
}

export class Job {
  id: number = 0;
  job_code: string = "";
  job_desc: string = "";
  is_active: number = 0;
  deleted: number = 0;
}

export class Project {
  id: number = 0;
  plant_code: string = "";
  project_name: string = "";
  is_active: number = 0;
  deleted: number = 0;
}

export class Zone {
  id: number = 0;
  plant_code: string = "";
  project_name: string = "";
  zone_name: string = "";
  is_active: number = 0;
  deleted: number = 0;
}

export class Area {
  id: number = 0;
  plant_code: string = "";
  project_name: string = "";
  zone_name: string = "";
  area_name: string = "";
  is_active: number = 0;
  deleted: number = 0;
}
