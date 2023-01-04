import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecetaPage } from './receta';

@NgModule({
  declarations: [
    RecetaPage,
  ],
  imports: [
    IonicPageModule.forChild(RecetaPage),
  ],
})
export class RecetaPageModule {}
