import { InjectionToken } from "@angular/core";
import { environment } from "../environments/environment";
import { Config } from "./config";
import * as angular from "angular";
import { downgradeInjectable } from "@angular/upgrade/static";

export const CONFIG_TOKEN = new InjectionToken<Config>('config');

export const CONFIG_VALUE : Config = {
    apiEndPoint: environment.apiEndPoint
}

angular
  .module("sampleapp")
  .factory("configService", downgradeInjectable(CONFIG_TOKEN) as any);