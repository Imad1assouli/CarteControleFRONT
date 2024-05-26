import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlChartComponent } from './control-chart/control-chart.component';
import { EditControlChartComponent } from './control-chart/edit-control-chart/edit-control-chart.component';
import {AddXbarControlChartComponent} from "./control-chart/add-control-chart/add-variable-control-chart/add-xbar-control-chart/add-xbar-control-chart.component";
import {GraphComponent} from "./graph/graph.component";

const routes: Routes = [
  { path: 'control-charts', component: ControlChartComponent },
  { path: 'control-charts/view/:id', component: GraphComponent },
  { path: 'add-variable-control-chart/x-bar', component: AddXbarControlChartComponent },
  { path: 'edit-control-chart/:id', component: EditControlChartComponent },
  { path: 'graph/:id', component: GraphComponent },
  { path: '', redirectTo: '/control-charts', pathMatch: 'full' },
  { path: '**', redirectTo: '/control-charts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
