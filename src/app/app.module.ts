import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { ControlChartComponent } from './control-chart/control-chart.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import {MenubarModule} from "primeng/menubar";
import {NgxEchartsModule} from "ngx-echarts";
import { EditControlChartComponent } from './control-chart/edit-control-chart/edit-control-chart.component';
import { AddXbarControlChartComponent } from './control-chart/add-control-chart/add-variable-control-chart/add-xbar-control-chart/add-xbar-control-chart.component';
import {DialogModule} from "primeng/dialog";
import { GraphComponent } from './graph/graph.component';
import {RouterModule} from "@angular/router";
import {ControlChartService} from "./control-chart.service";
import {MessageService} from "primeng/api";
import { AddEchantillonComponent } from './add-echantillon/add-echantillon.component';

@NgModule({
    declarations: [
        AppComponent,
        MeasurementListComponent,
        ControlChartComponent,
        NavbarComponent,
        EditControlChartComponent,
        AddXbarControlChartComponent,
        GraphComponent,
        AddEchantillonComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'add-control-chart/variable/x-bar', component: AddXbarControlChartComponent },
      // other routes
    ]),
    TableModule,
    ButtonModule,
    InputTextModule,
    AppRoutingModule,
    MenubarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    DialogModule,
  ],
  providers: [ControlChartService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
