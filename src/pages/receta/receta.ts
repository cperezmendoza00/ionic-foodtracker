import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import {  Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-receta',
  templateUrl: 'receta.html'
})
export class RecetaPage {
  item: any = {};
  item_seleccionado: any = {};
  items = [];
  listado_ingredientes = [];
  titulo_modal: string = '';
  titulo_visibilidad = "Visible";
  categorias: any = [];
  categoria_id = 0;
  searchTerm : string = '';
  receta:any = {};
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  constructor( private navParams: NavParams, private storage: Storage, private view: ViewController) {
    this.item = this.obtenerItemDefault();
    this.receta = this.obtenerRecetaDefault();
    this.storage.get('Lista').then((data) => {
      if (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].filtrado = true;
          }
          this.items = data;
        }
      });
     
    
  }


  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  closeModal() {
    console.log('closeModal');
    this.view.dismiss({"item":this.item,"cancelar":true});
  }


  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  aceptar(){
    let error = false;

    if(this.item.nombre == "") error = true;;
    if(this.item.detalle =="") error = true;
    if(this.item.porcion == "") error = true;
    if(this.item.categoria == "") error = true;
    if(this.item.peso == "") error = true;


    if(!error) {
      this.view.dismiss({"item":this.item,"eliminar":false,"cancelar":false});
    } else {
      console.log('faltan cosas que guardar');
    }
  }

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  ionViewDidLoad() {
    let data_de_home = this.navParams.get('data_de_home');
    this.categorias = data_de_home.categorias;
    this.titulo_modal = "Agregar receta ";
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
      "peso":"",
      "porciones":"",
      "img": "../assets/imgs/thumbnail-totoro.png",
      "detalle": "",
      "categoria": "",
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
  obtenerRecetaDefault(){
    let item_default = {
      "info": {
          "proteinas_total":parseFloat("0"),
          "grasas_total":parseFloat("0"),
          "carbohidratos_total":parseFloat("0"),
          "calorias_total":parseFloat("0"),
      }
    };
    return item_default;
  }


  //------------------------------------------------------------------------->>
  //Al escribir algo en el campo de busqueda o para limpiar
  //------------------------------------------------------------------------->>
  cambiarBusqueda() {
    for (var i = 0; i < this.items.length; i++) {
      if(this.searchTerm !=""){
        //Si has escrito algo:
        if(this.items[i].nombre.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1){
          this.items[i].filtrado = false;
        } else {
          this.items[i].filtrado = true;
        }
      } else {
        //Si no hay nada escrito
        this.items[i].filtrado = true;
      }
    }
  }
  //------------------------------------------------------------------------->>
  //Al escribir algo en el campo de busqueda o para limpiar
  //------------------------------------------------------------------------->>
  seleccionar_ingrediente(item) {
    //Dejo el nombre seleccionado en el campo
    this.searchTerm = (item.nombre);
    //Oculto todos los elementos
    for (var i = 0; i < this.items.length; i++) {
        this.items[i].filtrado = true;
    }
    this.item_seleccionado = item;
  }

  //------------------------------------------------------------------------->>
  //Al presionar el botón para agregar ingrediente
  //------------------------------------------------------------------------->>
  agregar_ingrediente() {
    if(this.item.porciones !="" && this.searchTerm !="" && typeof this.item_seleccionado.nombre !="undefined") {
      let datos_ingredientes: any = {};
      datos_ingredientes.nombre = this.item_seleccionado.nombre;
      datos_ingredientes.porcion = this.item_seleccionado.porcion;
      datos_ingredientes.porciones = this.item.porciones;
      datos_ingredientes.info = this.item_seleccionado.info;
      this.listado_ingredientes.push(datos_ingredientes);
      this.searchTerm = '';
      this.item.porciones = '';
      this.calcularMacros();
      this.item_seleccionado = {};
    }
  }

  eliminar(index){
    if(index > -1){
      this.listado_ingredientes.splice(index, 1);
    }
    this.calcularMacros();
  }

  calcularMacros(){
    this.receta.info.proteinas_total = 0;
    this.receta.info.grasas_total = 0;
    this.receta.info.carbohidratos_total = 0;
    this.item.peso = parseInt(this.item.peso);
    if(isNaN(this.item.peso)) this.item.peso = 0;
    for (var i = 0; i < this.listado_ingredientes.length; i++) {
      let proteinas =  (parseFloat(this.listado_ingredientes[i].porciones) *  this.listado_ingredientes[i].info.proteinas);
      let grasas = (parseFloat(this.listado_ingredientes[i].porciones) *  this.listado_ingredientes[i].info.grasas);
      let carbohidratos = (parseFloat(this.listado_ingredientes[i].porciones) *  this.listado_ingredientes[i].info.carbohidratos);

      this.receta.info.proteinas_total = this.receta.info.proteinas_total + proteinas;
      this.receta.info.grasas_total = this.receta.info.grasas_total + grasas
      this.receta.info.carbohidratos_total = this.receta.info.carbohidratos_total + carbohidratos  
    }
   
    if(this.item.peso != 0 ) {
      this.item.info.proteinas =  (parseFloat(this.receta.info.proteinas_total) / (this.item.peso /100 )).toFixed(1);
      this.item.info.grasas = (parseFloat(this.receta.info.grasas_total) / (this.item.peso /100 )).toFixed(1);
      this.item.info.carbohidratos = (parseFloat(this.receta.info.carbohidratos_total) / (this.item.peso /100 )).toFixed(1);
      console.log(this.item);
    }
    




    this.receta.info.proteinas_total = parseFloat(this.receta.info.proteinas_total).toFixed(1);
    this.receta.info.grasas_total = parseFloat(this.receta.info.grasas_total).toFixed(1);
    this.receta.info.carbohidratos_total = parseFloat(this.receta.info.carbohidratos_total).toFixed(1);
    this.receta.info.carbohidratos_total = parseFloat(this.receta.info.carbohidratos_total).toFixed(1);



    

  }
}
