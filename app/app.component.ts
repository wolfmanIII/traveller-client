import { Component, ViewContainerRef }     from '@angular/core';

@Component({
    selector: 'traveller-app',
    templateUrl: 'app/traveller-app.html'
})

export class AppComponent {
    title = 'Traveller';

    private viewContainerRef: ViewContainerRef;

    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
