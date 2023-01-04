import { Component } from '@angular/core';
import { reorderArray } from 'ionic-angular';
import { Modal,  ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-configuraciones',
  templateUrl: 'configuraciones.html',
})
export class ConfiguracionesPage {

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  constructor(public navCtrl: NavController, private storage: Storage, private modal: ModalController, private alertCtrl: AlertController) {
  }

  reiniciar_todo(){
    this.storage.remove('Lista')
    this.storage.remove('macros')
    this.storage.remove('informacion_personal');
    this.storage.remove('barra');
    this.navCtrl.push(InicioPage);
  }
}
