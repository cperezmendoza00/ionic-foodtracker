import {  Component } from '@angular/core';
import {  reorderArray } from 'ionic-angular';
import {  Modal,  ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import {  Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  className: string = 'one-class';
  profileModal: Modal;
  data = {};
  informacion_personal :any = {"proteinas":0,"grasas":0,"carbohidratos":0,"calorias":0,"peso":0};
  items = [];
  categorias = [];
  items_default = [];
  macros: any = {"proteinas":0,"grasas":0,"carbohidratos":0,"calorias":0};
  macros_default = {};
  btnName: string = 'Reiniciar';
  flag: boolean = true;
  barra: any = {"proteinas":0,"grasas":0,"carbohidratos":0,"calorias":0};
  searchTerm: string = '';
  clase_campo_busqueda: string  = 'buscador_oculto';
  
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  constructor(public navCtrl: NavController, private storage: Storage, private modal: ModalController, private alertCtrl: AlertController) {
    //this.storage.remove('informacion_personal');
    this.clase_campo_busqueda = 'buscador_oculto';
    this.storage.get('informacion_personal').then((data) => {
      if (data) {
        this.informacion_personal = data;
      } else {
        navCtrl.push(InicioPage);
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
      "visibilidad": true,
      "filtrado": false,
      "categoria": 2,
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
      "visibilidad": true,
      "filtrado": false,
      "categoria": 1,
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
      "visibilidad": true,
      "filtrado": false,
      "categoria": 4,
      "info": {
        "proteinas": parseFloat("1"),
        "grasas": parseFloat("11"),
        "carbohidratos": parseFloat("59"),
        "calorias": parseFloat("225"),
      }
    }];

    this.categorias = [{
      "id": 1,
      "nombre": "Legumbres",
    },{
      "id": 2,
      "nombre": "Frutas",
    },{
      "id": 3,
      "nombre": "Frutos secos",
    },{
      "id": 4,
      "nombre": "Semillas",
    },{
      "id": 5,
      "nombre": "Cereales",
    },{
      "id": 6,
      "nombre": "Verduras",
    },{
      "id": 7,
      "nombre": "Proteínas",
    },{
      "id": 8,
      "nombre": "Otros",
    }
  ];

  this.storage.get('Lista').then((data) => {
    if (data) {
      for (var i = 0; i < data.length; i++) {
          data[i].filtrado = false;
        }
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
  //------------------------------------------------------------------------->>
  //Al presionar la lupa en el header
  //------------------------------------------------------------------------->>
  mostrarOcultarBuscador(info) {
    if(this.clase_campo_busqueda == "") {
      //Ocultar el buscador
      this.clase_campo_busqueda = 'buscador_oculto';
      this.searchTerm = '';
      this.cambiarBusqueda();
    } else {
      //Mostrar el buscador
      this.clase_campo_busqueda = '';
      let inputField = document.querySelector('.searchbar-input-container > .searchbar-input');
      
    }
  }


  //------------------------------------------------------------------------->>
  //Al escribir algo en el campo de busqueda o para limpiar
  //------------------------------------------------------------------------->>
  cambiarBusqueda() {
    this.storage.get('Lista').then((data) => {
      if (data) {
        this.items = data;
        for (var i = 0; i < this.items.length; i++) {
          if(this.searchTerm !=""){
            //Si has escrito algo:
            if(this.items[i].nombre.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1){
              this.items[i].filtrado = false;
              this.items[i].visibilidad = true;
            } else {
              this.items[i].filtrado = true;
            }
          } else {
            //Si no hay nada escrito
            this.items[i].filtrado = false;
          }
        }
      }
    });
  }


  //------------------------------------------------------------------------->>
  //Al hacer clic en alguna de las categorías para filtrar
  //------------------------------------------------------------------------->>
  seleccionarCategoria(elemento){
    if(typeof elemento == "boolean") {
      this.searchTerm = '';
      this.cambiarBusqueda();
    } else {
      this.searchTerm = elemento.nombre;
      
      for (var i = 0; i < this.items.length; i++) {
        if(this.items[i].categoria == elemento.id){
          this.items[i].filtrado = false;
        } else {
          this.items[i].filtrado = true;
        }
      }

      



    }
  }


  

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  modificarCantidad(item, accion) {
    var nuevo_valor = 0;
    if (accion == 'add') {
      nuevo_valor = parseFloat((parseFloat(item.cantidad) + 1).toFixed(1));
      item.cantidad = nuevo_valor < 999 ? nuevo_valor: 999;
    }
    if (accion == 'rmv') {
      nuevo_valor = parseFloat((parseFloat(item.cantidad) - 1).toFixed(1));
      item.cantidad = nuevo_valor > 0 ? nuevo_valor: 0;
    }
    //this.actualizarMacros();
  }


  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  modalAgregar(item) {
    var home = this;
    let alert = this.alertCtrl.create({
    title: 'Agregar cantidad',
    cssClass: 'custom-alertDanger',
    inputs: [
      {
        id: 'boton_porciones',
        value: 'Porciones',
        type: 'button'
      },
      {
        id: 'boton_gramos',
        value: 'Gramos',
        type: 'button',
        handler: data => {
        }
      },
      {
        id: 'input_agregar',
        name: 'cantidad',
        placeholder: 'Cantidad',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          var input_agregar = document.getElementById("input_agregar") as HTMLInputElement;
          if(document.querySelector('.custom-alertDanger input[type="button"].boton_presionado') !== null) {
            //Se seleccionó un botón
            let id = document.querySelector('.custom-alertDanger input[type="button"].boton_presionado').id;
            if(input_agregar.value !="") {
              let cantidad_agregada = parseFloat(input_agregar.value);
              if(id == 'boton_porciones') {
                item.cantidad = (parseFloat(item.cantidad) + cantidad_agregada).toFixed(1);
              } else if(id == 'boton_gramos') {
                item.cantidad = (parseFloat(item.cantidad) + (cantidad_agregada / item.porcion)).toFixed(1);
              }
            }
            
          }
        }
      }
    ]
  });
  alert.present().then(() => {
    var boton_gramos = document.getElementById("boton_gramos");
    boton_gramos.addEventListener("click", home.botonTipoCantidad, false);
    var boton_porciones = document.getElementById("boton_porciones");
    boton_porciones.addEventListener("click", home.botonTipoCantidad, false);
    document.getElementById('boton_porciones').click();
   });
  }


  //------------------------------------------------------------------------->>
  //Función que se ejecuta al cambiar el tipo de cantidad a agregar
  //------------------------------------------------------------------------->>
  botonTipoCantidad(boton_presionado){
    let botones = boton_presionado.target.parentElement.parentElement.querySelectorAll('input[type="button"]');

    botones[0].classList.remove('boton_presionado');
    botones[1].classList.remove('boton_presionado');

    boton_presionado.target.classList.add('boton_presionado');
    if(boton_presionado.target.id =="boton_gramos"){
      boton_presionado.target.classList.add('boton_presionado');
    }
    if(boton_presionado.target.id =="boton_porciones"){
    }
  }

  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    this.storage.set('Lista', this.items);
  }
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  selectText(input) {
    input.select();
  }
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  blurInput(item) {
    if(item.cantidad=="")item.cantidad = 0;
  }
  actualizarMacros() {

    var proteinas = 0;
    var grasas = 0;
    var carbohidratos = 0;
    var calorias = 0;
    var cantidad = 0;
    for (var i = 0; i < this.items.length; i++) {
      cantidad = parseFloat(this.items[i].cantidad);
      if(isNaN(cantidad)) cantidad = 0;
      proteinas = proteinas + ((parseFloat(this.items[i].info.proteinas)) * ((cantidad)));
      grasas = grasas + ((parseFloat(this.items[i].info.grasas)) * ((cantidad)));
      carbohidratos = carbohidratos + ((parseFloat(this.items[i].info.carbohidratos)) * ((cantidad)));
      calorias = calorias + ((parseFloat(this.items[i].info.calorias)) * ((cantidad)));
    }

    this.macros.proteinas = proteinas.toFixed(0);
    this.macros.grasas = grasas.toFixed(0);
    this.macros.carbohidratos = carbohidratos.toFixed(0);
    this.macros.calorias = calorias.toFixed(0);
    this.storage.set('Lista', this.items);
    this.storage.set('macros', this.macros);

    this.barra.proteinas = ((this.macros.proteinas * 100 / this.informacion_personal.proteinas )*0.5).toFixed(0);
    this.barra.proteinas = this.barra.proteinas <= 100 ? this.barra.proteinas : 100;
    this.barra.grasas = ((this.macros.grasas * 100 / this.informacion_personal.grasas )*0.5).toFixed(0);
    this.barra.grasas = this.barra.grasas <= 100 ? this.barra.grasas : 100;
    this.barra.carbohidratos = ((this.macros.carbohidratos * 100 / this.informacion_personal.carbohidratos )*0.5).toFixed(0);
    this.barra.carbohidratos = this.barra.carbohidratos <= 100 ? this.barra.carbohidratos : 100;

    this.barra.calorias = ((this.macros.calorias * 100 / this.informacion_personal.calorias )*0.5).toFixed(0);
    this.barra.calorias = this.barra.calorias <= 100 ? this.barra.calorias : 100;




    this.storage.set('Lista', this.items);
    this.storage.set('macros', this.macros);
    this.storage.set('barra', this.barra);

  }


  //------------------------------------------------------------------------->>
  //Al presionar botón "Agregar alimento"
  //------------------------------------------------------------------------->>
  agregarNuevoItem() {
    this.profileModal = this.modal.create('ModalPage', {
      data_de_home: {
        "categorias":this.categorias
      }
    });

    this.profileModal.onDidDismiss(data_de_modal => {
      if (data_de_modal === undefined) {
      } else {
        if(!data_de_modal.eliminar && !data_de_modal.cancelar) {
          var calorias  = parseFloat((
            (parseFloat(data_de_modal.item.info.proteinas) * 4 ) +
            (parseFloat(data_de_modal.item.info.grasas) * 9 ) +
            (parseFloat(data_de_modal.item.info.carbohidratos) * 4 )).toFixed(1)
          );
          data_de_modal.item.info.calorias = calorias;
          this.items.push(data_de_modal.item);
          this.storage.set('Lista', this.items);
        }
      }
    });
    this.profileModal.present();
  }


  //------------------------------------------------------------------------->>
  //Al presionar botón "Agregar receta"
  //------------------------------------------------------------------------->>
  agregarReceta() {
    this.profileModal = this.modal.create('RecetaPage', {
      data_de_home: {
        "categorias":this.categorias
      }
    });

    this.profileModal.onDidDismiss(data_de_modal => {
      if (data_de_modal === undefined) {
      } else {
        if(!data_de_modal.cancelar) {
          var calorias  = parseFloat((
            (parseFloat(data_de_modal.item.info.proteinas) * 4 ) +
            (parseFloat(data_de_modal.item.info.grasas) * 9 ) +
            (parseFloat(data_de_modal.item.info.carbohidratos) * 4 )).toFixed(1)
          );
          data_de_modal.item.info.calorias = calorias;
          this.items.push(data_de_modal.item);
          this.storage.set('Lista', this.items);
        }
      }
    });
    this.profileModal.present();
  }
  //------------------------------------------------------------------------->>
  //------------------------------------------------------------------------->>
  editarItem(item) {
    
    let valorOriginal = Object.assign({}, item );
    //var itemFake = JSON.parse(JSON.stringify(item));

    this.profileModal = this.modal.create('ModalPage', {
      data_de_home: {
        "item": valorOriginal,
        "categorias":this.categorias
      }
    });
    this.profileModal.onDidDismiss(data_de_modal => {

      
      if (data_de_modal.cancelar) {
        //Si presiono cancelar
        item = valorOriginal;
      } 
      
      if(data_de_modal.eliminar){
        //Si presiono eliminar
        let index = this.items.indexOf(item);
        if(index > -1){
          this.items.splice(index, 1);
        }
        //Elimino y guardo
        this.storage.set('Lista', this.items);
      } 
      
      if(!data_de_modal.eliminar && !data_de_modal.cancelar) {
        //Si presiono Aceptar
        //item.nombre = data_de_modal.item.nombre;
        item = Object.assign(item, data_de_modal.item );
        var calorias  = parseFloat((
          (parseFloat(data_de_modal.item.info.proteinas) * 4 ) +
          (parseFloat(data_de_modal.item.info.grasas) * 9 ) +
          (parseFloat(data_de_modal.item.info.carbohidratos) * 4 )).toFixed(1)
        );
        data_de_modal.item.info.calorias = calorias;
        item = data_de_modal.item;
        //Modifico y guardo
        this.storage.set('Lista', this.items);
      }
    });
    this.profileModal.present();
  }
  reiniciar_todo(){
    this.storage.remove('Lista')
    this.storage.remove('macros')
    this.storage.remove('informacion_personal');
    this.storage.remove('barra');
    this.navCtrl.push(InicioPage);
  }

  confirmarReinicio() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: 'Todas las cantidades de los alimentos cambiaran a cero (0).',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Reinciar',
          handler: () => {
            for (var i = 0; i < this.items.length; i++) {
              this.items[i].cantidad = 0;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
