import { environment } from 'src/environments/environment';

export interface IParam {
    name: string;
    value: any;
}

export class Service {

    protected static ERROR_NO_URL_DEFINED = 'URL no definida';

    constructor() {
    }

    public static appendParams(service: string, params: Array<string | number>): string {
        let url: string = environment.API_URL + service;
        params.forEach((param) => {
            url = url + '/' + param;
        });
        return url;
    }

    public static getApiUrl(service: string, params?: Array<IParam>): string {
        if (params) {
            let url = environment.API_URL + service + '?';
            const rowLen = params.length;
            params.forEach((param, i) => {
                if (param.name) {
                    if (rowLen !== i + 1) {
                        url = url + param.name + '=' + param.value + '&';
                    } else {
                        url = url + param.name + '=' + param.value;
                    }
                }
            });
            return url;
        } else {
            return environment.API_URL + service;
        }
    }
}