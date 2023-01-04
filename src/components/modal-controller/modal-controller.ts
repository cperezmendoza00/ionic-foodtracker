import { Component } from '@angular/core';

/**
 * Generated class for the ModalControllerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-controller',
  templateUrl: 'modal-controller.html'
})
export class ModalControllerComponent {

  text: string;

  constructor() {
    console.log('Hello ModalControllerComponent Component');
    this.text = 'Hello World';
  }

}
