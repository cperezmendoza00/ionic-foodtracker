import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  nuevo: boolean = false;
  item: any = {};
  titulo_modal: string = '';
  titulo_visibilidad = "Visible";
  categorias: any = [];
  categoria_id = 0;
  
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  constructor( private navParams: NavParams, private view: ViewController) {
    this.item = this.obtenerItemDefault();
    
  }


  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  closeModal() {
    console.log('closeModal');
    this.view.dismiss({"item":this.item,"eliminar":false,"cancelar":true});
  }


  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  aceptar(){
    console.log('aceptar');
    this.view.dismiss({"item":this.item,"eliminar":false,"cancelar":false});
  }

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  borrar_item(){
    console.log('borrar_item');
    this.view.dismiss({"item":this.item,"eliminar":true,"cancelar":false});
  }

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  ionViewDidLoad() {
    let data_de_home = this.navParams.get('data_de_home');
    this.categorias = data_de_home.categorias;
    if(!(data_de_home.item === undefined)) {
      this.categorias = data_de_home.categorias;
      this.item = data_de_home.item;
      if(typeof this.item.visibilidad == "undefined") {
        this.item.visibilidad = true;
      }
      this.titulo_modal = "Modificar "+this.item.nombre
      
    } else {
      this.nuevo = true;
      this.titulo_modal = "Agregar alimento ";
    }
  }


  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  selectText(input) {
    input.select();
  }

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  obtenerItemDefault(){
    let item_default = {
        "nombre": "",
        "cantidad":0,
        "porcion":100,
        "img": "../assets/imgs/thumbnail-totoro.png",
        "detalle": "",
        "visibilidad": true,
        "filtrado": false,
        "info": {
            "proteinas":parseFloat("0"),
            "grasas":parseFloat("0"),
            "carbohidratos":parseFloat("0"),
            "calorias":parseFloat("0"),
        }
      };
      return item_default;
    }


    //------------------------------------------------------------------------->>
    //------------------------------------------------------------------------->>
    cambiarVisibilidad(item){
      if(item.visibilidad) {
        this.titulo_visibilidad = "Visible";
      } else {
        this.titulo_visibilidad = "Oculto";
      }
    }
}
