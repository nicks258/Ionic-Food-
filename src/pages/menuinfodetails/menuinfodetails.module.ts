import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuinfodetailsPage } from './menuinfodetails';

@NgModule({
  declarations: [
    MenuinfodetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuinfodetailsPage),
  ],
  exports: [
    MenuinfodetailsPage
  ]
})
export class MenuinfodetailsPageModule {}
