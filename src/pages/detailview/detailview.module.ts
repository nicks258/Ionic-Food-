import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailviewPage } from './detailview';

@NgModule({
  declarations: [
    DetailviewPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailviewPage),
  ],
  exports: [
    DetailviewPage
  ]
})
export class DetailviewPageModule {}
