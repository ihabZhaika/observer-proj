
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import {MaterializeDirective } from "angular2-materialize";
import { AppComponent } from './app.component';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { AdminComponent } from './components/admin/admin.component';
import {routing} from "./Routes/app.routes";
import { PanelComponent } from './components/panel/panel.component'
import {DataTableModule,SharedModule,ContextMenuModule,InputTextModule,CalendarModule} from 'primeng/primeng';
import { CommoditiesComponent } from './components/commodities/commodities.component';
import {DataService} from "./services/data/data.service";
import {UtilsService} from "./services/utils.service";
import { CustomerComponent } from './components/customer/customer.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CarComponent } from './components/car/car.component';
import { ShiftComponent } from './shift/shift.component';

@NgModule({
  declarations: [
    AppComponent,MaterializeDirective, AdminComponent, PanelComponent, CommoditiesComponent, CustomerComponent, CarComponent, ShiftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    LocaleModule.forRoot(),
    LocalizationModule.forRoot(),
    routing,
    DataTableModule,
    SharedModule,
    ContextMenuModule,
    InputTextModule,
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
    CalendarModule
  ],
  providers: [DataService,UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
