import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppSettingsService {
  public environment = {
    basePath: "",
    lcode: "",
    baseAppPath: "",
    imagePath: "",
    orgLogoPath: "",
    encrypt: false,
    maxFileSize: 0,
    fileSizeErrorMsg: "",
    fileAccept: "",
    serverDateFormat: "",
    serverDateFormatWithTime: "",
    dateViewFormat: "",
    dateViewFormatWithTime: "",
  };

  constructor(private http: HttpClient) { }

  loadConfig() {
    let d = new Date();
    let n = d.getTime();
    return this.http
      .get("./app.settings.json?v=" + n)
      .toPromise()
      .then((success: any) => {
        this.environment = success;
      });
  }
}
