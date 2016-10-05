import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/components/dashboard.component'
import { UwpComponent } from './iiss/uwp/components/uwp.component';
import { ListSizeComponent } from './iiss/uwp/components/list.size.component';

import { ListAtmosphereComponent } from './iiss/uwp/components/list.atmosphere.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'uwp',
        component: UwpComponent
    },
    {
        path: 'uwp/list-size',
        component: ListSizeComponent
    },
    {
        path: 'uwp/list-atmosphere',
        component: ListAtmosphereComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
