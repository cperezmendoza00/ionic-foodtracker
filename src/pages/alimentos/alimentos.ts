import { Component } from '@angular/core';
import { reorderArray } from 'ionic-angular';
import { Modal,  ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {
  className: string = 'one-class';
  profileModal: Modal;
  data = {};
  informacion_personal :any = {"proteinas":0,"grasas":0,"carbohidratos":0,"calorias":0,"peso":0};
  items = [];
  items_default = [];
  macros: any = {"proteinas":0,"grasas":0,"carbohidratos":0,"calorias":0};
  macros_default = {};
  btnName: string = 'Reiniciar';
  flag: boolean = true;
  barra: any = {"proteinas":0,"grasas":0,"carbohidratos":0,"calorias":0};
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  constructor(public navCtrl: NavController, private storage: Storage, private modal: ModalController, private alertCtrl: AlertController) {
    this.storage.get('informacion_personal').then((data) => {
      if (data) {
        this.informacion_personal = data;
      } else {
        //navCtrl.push(InicioPage);
      }
    });

    this.storage.get('barra').then((data) => {
      if (data) {
        this.barra = data;
      }
    });


    this.macros_default = {
      "proteinas": 0,
      "grasas": 0,
      "carbohidratos": 0,
      "calorias": 0,
    };
    this.items_default = [{
      "id": 1,
      "nombre": "Frutas",
      "cantidad": 0,
      "procion": 120,
      "img": "../assets/imgs/thumbnail-totoro.png",
      "detalle": "100 gr",
      "info": {
        "proteinas": parseFloat("0.8"),
        "grasas": parseFloat("0.2"),
        "carbohidratos": parseFloat("14.8"),
        "calorias": parseFloat("64.3"),
      }
    }, {
      "id": 2,
      "nombre": "Legumbres",
      "cantidad": 0,
      "procion": 100,
      "img": "../assets/imgs/thumbnail-totoro.png",
      "detalle": "De 120 a 150 gr cocidos",
      "info": {
        "proteinas": parseFloat("10.4"),
        "grasas": parseFloat("1"),
        "carbohidratos": parseFloat("19"),
        "calorias": parseFloat("64"),
      }
    }, {
      "id": 3,
      "nombre": "Cereales",
      "cantidad": 0,
      "porcion": 100,
      "img": "../assets/imgs/thumbnail-totoro.png",
      "detalle": "50 gr",
      "info": {
        "proteinas": parseFloat("1"),
        "grasas": parseFloat("11"),
        "carbohidratos": parseFloat("59"),
        "calorias": parseFloat("225"),
      }
    }];
    this.storage.get('Lista').then((data) => {
      if (data) {
        this.items = data;
      } else {
        this.items = this.items_default;
      }
    });

    this.storage.get('macros').then((data) => {
      if (data) {
        this.macros = data;
      } else {
        this.macros = this.macros_default;
      }
    });

  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    this.storage.set('Lista', this.items);
  }

  guardarAlimentos(){
    this.storage.set('Lista', this.items);
  }
}
