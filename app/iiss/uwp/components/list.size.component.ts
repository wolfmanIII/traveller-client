import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

import { Size }      from '../entities/size';
import { SizeService } from '../services/size.service';

@Component({
    selector: 'list-size-component',
    templateUrl: 'app/iiss/uwp/resources/view/list-size.html',
    providers: [SizeService]
})

export class ListSizeComponent implements OnInit {

    @ViewChild('lgModal') lgModal;
    @ViewChild('itemModal') itemModal;

    private title = 'Size data';
    private data;
    private list: any;
    private item = new Size();
    private message:string = "Loading...";
    private allChecked = false;
    private progressBar = 0;
    private errorMessage:string = '';

    /**
     * Pagination
     */
    public totalItems:number = 0;
    public maxSize:number = 5;
    public currentPage:number = 1;
    public itemsPerPage: number = 1;
    public apiUrl = 'http://localhost:8000/sizes';

    public setPage(pageNo:number):void {
        this.currentPage = pageNo;
    };

    public pageChanged(event:any):void {
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
        this.apiUrl = 'http://localhost:8000/sizes' + '?page=' + event.page;
        this.setData4Page();
    };
    // End pagination

     /**
      * Helper function to check
      * if a value is a number
      */
     isNumber(n) {
         return parseFloat(n);
     }

    constructor (
        private router: Router,
        private sizeService: SizeService ) {
    }

    setData4Page() {
        this.progressBar = 100;
        this.sizeService
            .getDataList(this.apiUrl)
            .subscribe(data => {
                this.data = data;
                this.list = this.data.list;
                this.itemsPerPage = this.data.itemsPerPage;
                this.totalItems = this.data.totalItems;
                if ( !(this.totalItems > 0) ) {
                    this.message = 'Dati non presenti!';
                }
                this.list.sort(function (a, b) {
                    return a.size - b.size;
                });
                this.showModal(false);
            });
    }

    checkAll(ev) {
        if(this.list) {
            this.list.forEach(x => x.checked = ev.target.checked);
        }
    }

    isAllChecked() {
        if(this.list) {
            return  this.list.every(_ => _.checked);
        }
    }

    ngOnInit(): void {
        this.setData4Page();
    }

    ngAfterViewInit(): void {
        this.showModal(true);
    }

    showModal (show) {
        if (show) {
            this.lgModal.show();
        } else {
            this.lgModal.hide();
        }
    }

    getItem(id) {
        this.sizeService
            .getData(id)
            .subscribe(data => {
                this.data = data;
                this.item = this.data.item;
                this.itemModal.show();
            });
    }

    updateItem(id) {
        this.getItem(id);
    }

    newItem() {
        this.item = new Size();
        this.itemModal.show();
    }

    save() {
        if (this.item.id) {
            this.sizeService.update(this.item)
                .subscribe(
                    data => {
                        this.data = data;
                        this.setData4Page();
                        this.itemModal.hide();
                    },
                    error => {
                        let errorData = error.json();
                        this.errorMessage = errorData['violations'][0].message;
                        //console.log(this.item.id);
                    });
        } else {
            this.sizeService.create(this.item)
                .subscribe(data => {
                    this.setData4Page();
                    this.itemModal.hide();
                });
        }
    }

    getProgressBarStep() {
        let step = 0;
        for( let i = 0; i < this.list.length; i++ ) {
            if (this.list[i].checked) {
                step++;
            }
        }
        step++;
        let percStep = Math.ceil(100 / step);
        return percStep;
    }

    multipleDelete() {
        if (this.list.length > 0) {
            this.showModal(true);
            this.progressBar = 0;
        }
        this.apiUrl = 'http://localhost:8000/sizes';
        if ( (this.allChecked || this.list.length == 1)
             && (this.currentPage >= 2) ) {
            this.currentPage = this.currentPage - 1;
        }
        if (this.currentPage > 1) {
            this.apiUrl = this.apiUrl + '?page=' + this.currentPage;
        }
        //console.log(this.apiUrl);
        this.list.forEach( item => {
            if (item.checked) {
                this.delete(item.id, true);
            }
        });
    }

    delete(id, multi) {
        if ( !multi ) {
            this.showModal(true);
            this.apiUrl = 'http://localhost:8000/sizes';
            if ( this.list.length == 1 && this.currentPage >= 2 ) {
                this.currentPage = this.currentPage - 1;
                this.apiUrl = this.apiUrl  + '?page=' + this.currentPage;
            } else if (this.list.length > 1) {
                this.apiUrl = this.apiUrl  + '?page=' + this.currentPage;
            }
        }
        this.sizeService.delete(id)
            .subscribe(data => {
                this.data = data;
                this.progressBar = this.progressBar + this.getProgressBarStep();
                this.setData4Page();
            });
    }

}
