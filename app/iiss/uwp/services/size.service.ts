import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Size } from '../entities/size';

@Injectable()
export class SizeService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getDataList (url) {
        return this.http.get(url).map(this.extractDataList)
    }

    getData(id) {
        let sizeUrl = 'http://localhost:8000/sizes/' + id;
        return this.http.get(sizeUrl).map(this.extractData)
    }

    private extractData(res: Response) {
        let body = res.json();
        let data;
        let item = new Size();
        let parts = body['@id'].split('/');
        item.id = parts.pop();
        item.size = body['size'];
        item.diameter = body['diameter'];
        item.example = body['example'];
        item.surfaceGravity = body['surfaceGravity'];
        item.checked = false;
        data = {
            'item': item,
        };
        return data;
    }

    private extractDataList(res: Response) {
        let body = res.json();
        let data;
        let list: Size[] = Array();
        for (let x = 0; x < body['hydra:member'].length; x++) {
            let item = new Size();
            let member = body['hydra:member'][x];
            let parts = member['@id'].split('/');
            item.id = parts.pop();
            item.size = member['size'];
            item.diameter = member['diameter'];
            item.example = member['example'];
            item.surfaceGravity = member['surfaceGravity'];
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

    create(size: Size) {
        let url = 'http://localhost:8000/sizes'
        return this.http.
            post(url, JSON.stringify(size), {headers: this.headers});
    }

    update(size: Size) {
        let url = 'http://localhost:8000/sizes/' + size.id
        return this.http.put(url, JSON.stringify(size), {headers: this.headers});
    }

    delete(id) {
        let url = 'http://localhost:8000/sizes/' + id;
        return this.http.delete(url, {headers: this.headers});
    }

}
