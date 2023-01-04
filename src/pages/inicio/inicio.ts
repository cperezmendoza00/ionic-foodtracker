import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  selectedItem: any;
  informacion_personal: any = {
    "peso":0,
    "calorias":0,
    "proteinas":0,
    "porcentajeproteinas":0,
    "porcentajegrasas":0,
    "porcentajecarbohidratos":0,
    "grasas":0,
    "carbohidratos":0,
    "proteinaporkilo":10,
    "relacion":35,
  }
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    //navCtrl.push(HomePage);
    this.selectedItem = navParams.get('item');
    this.storage.get('informacion_personal').then((data) => {
      if (data) {
        this.informacion_personal = data;
      }
    });

  }
  selectText(input) {
    input.select();
  }
  guardarDatos(){
    this.storage.set('informacion_personal',this.informacion_personal);
    this.navCtrl.push(HomePage);
  }
  actualizarMacros(tipo){
    //Proteinas:
    if(tipo=="peso") {
      this.informacion_personal.proteinas = Math.floor(this.informacion_personal.peso * (this.informacion_personal.proteinaporkilo/10));
    }
    let porcentajeproteinas = Math.floor(((this.informacion_personal.proteinas * 4) * 100 ) / this.informacion_personal.calorias);
    porcentajeproteinas = (porcentajeproteinas < 0 ? 0: porcentajeproteinas);
    this.informacion_personal.porcentajeproteinas = porcentajeproteinas;
    this.cambiarRelacion(this);
  }
  cambiarRango(info){
    this.actualizarMacros('peso');
    this.actualizarMacros('calorias');
  }
  cambiarRelacion(info){
      //Grasas:
      let restantes = this.informacion_personal.calorias - (this.informacion_personal.proteinas * 4);
      this.informacion_personal.grasas = Math.floor(((restantes * this.informacion_personal.relacion) / 100)/9);
      let porcentajegrasas =  Math.floor(((this.informacion_personal.grasas * 9) * 100 ) / this.informacion_personal.calorias);
      porcentajegrasas = (porcentajegrasas < 0 ? 0: porcentajegrasas);
      this.informacion_personal.porcentajegrasas = porcentajegrasas;
      //Carbohidratos:
      restantes = this.informacion_personal.calorias - ((this.informacion_personal.grasas * 9) + (this.informacion_personal.proteinas * 4));
      this.informacion_personal.carbohidratos = Math.floor(restantes / 4);
      this.informacion_personal.porcentajecarbohidratos = 100 - (this.informacion_personal.porcentajeproteinas + this.informacion_personal.porcentajegrasas);
    }

}
