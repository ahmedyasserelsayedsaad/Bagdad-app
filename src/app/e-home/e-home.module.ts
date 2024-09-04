import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EHomePageRoutingModule } from './e-home-routing.module';

import { EHomePage } from './e-home.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EHomePageRoutingModule
  ],
  declarations: [EHomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EHomePageModule {}
