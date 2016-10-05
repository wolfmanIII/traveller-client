import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Atmosphere } from '../entities/atmosphere';

@Injectable()
export class AtmosphereService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getDataList (url) {
        return this.http.get(url).map(this.extractDataList)
    }

    getData(id) {
        let url = 'http://localhost:8000/atmospheres/' + id;
        return this.http.get(url).map(this.extractData)
    }

    private extractData(res: Response) {
        let body = res.json();
        let data;
        let item = new Atmosphere();
        let parts = body['@id'].split('/');
        item.id = parts.pop();
        item.atmosphere = body['atmosphere'];
        item.composition = body['composition'];
        item.examples = body['examples'];
        item.pressure = body['pressure'];
        item.survivalGearRequired = body['survivalGearRequired'];
        item.checked = false;
        data = {
            'item': item,
        };
        return data;
    }

    private extractDataList(res: Response) {
        let body = res.json();
        let data;
        let list: Atmosphere[] = Array();
        for (let x = 0; x < body['hydra:member'].length; x++) {
            let item = new Atmosphere();
            let member = body['hydra:member'][x];
            let parts = member['@id'].split('/');
            item.id = parts.pop();
            item.atmosphere = member['atmosphere'];
            item.composition = member['composition'];
            item.examples = member['examples'];
            item.pressure = member['pressure'];
            item.survivalGearRequired = member['survivalGearRequired'];
            item.checked = false;
            list.push(item);
        }
        data = {
            'itemsPerPage': body['hydra:itemsPerPage'],
            'totalItems': body['hydra:totalItems'],
            'list': list,
        };
        return data;
    }

    create(atmosphere: Atmosphere) {
        let url = 'http://localhost:8000/atmospheres'
        return this.http.post(url, JSON.stringify(atmosphere), {headers: this.headers});
    }

    update(atmosphere: Atmosphere) {
        let url = 'http://localhost:8000/atmospheres/' + atmosphere.id
        return this.http.put(url, JSON.stringify(atmosphere), {headers: this.headers});
    }

    delete(id) {
        let url = 'http://localhost:8000/atmospheres/' + id;
        return this.http.delete(url, {headers: this.headers});
    }

}
