import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from '../../routing/main.routing';
import { MainHomeComponent } from './main-home.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    MainHomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule
  ]
})
export class ViewMainModule {}
