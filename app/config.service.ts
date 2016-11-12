import { Injectable } from '@angular/core';

@Injectable()

export class ConfigService {
    private config = {
        apiEndpoint: 'http://api.sykenote.dev/api'
    }

    public setOption(option, value) {
        this.config[option] = value;
    }

    public getOption(option) {
        return this.config[option];
    }

    public getConfig() {
        return this.config;
    }
}