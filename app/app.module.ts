//import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './app.routing';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { UwpComponent } from './iiss/uwp/components/uwp.component';
import { ListSizeComponent } from './iiss/uwp/components/list.size.component';
import { SizeService }   from './iiss/uwp/services/size.service';
import { ListAtmosphereComponent } from './iiss/uwp/components/list.atmosphere.component';
import { AtmosphereService }   from './iiss/uwp/services/atmosphere.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        UwpComponent,
        ListSizeComponent,
        ListAtmosphereComponent
    ],
    providers: [
        SizeService,
        AtmosphereService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
