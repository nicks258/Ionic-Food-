import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailmodalPage } from './detailmodal';

@NgModule({
  declarations: [
    DetailmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailmodalPage),
  ],
  exports: [
    DetailmodalPage
  ]
})
export class DetailmodalPageModule {}
