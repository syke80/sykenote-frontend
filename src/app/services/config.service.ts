import { Injectable, Inject } from '@angular/core';

@Injectable()

export class ApiConfigModel {
    apiUrl: string;
}

export class ConfigService {
    private config: ApiConfigModel = {
        apiUrl: 'http://api.sykenote.dev/api'
    };
/*
    constructor(
        @Inject('api.config') private apiConfig: ApiConfigModel
    ) {
        console.log('Injected config:', this.apiConfig);
    }
*/
    public setOption(option: string, value: string): void {
        this.config[option] = value;
    }

    public getOption(option: string): string {
        return this.config[option];
    }

    public getConfig(): ApiConfigModel {
        return this.config;
    }
}