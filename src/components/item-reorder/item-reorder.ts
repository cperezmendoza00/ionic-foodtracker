import { Component } from '@angular/core';

/**
 * Generated class for the ItemReorderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-reorder',
  templateUrl: 'item-reorder.html'
})
export class ItemReorderComponent {

  text: string;

  constructor() {
    console.log('Hello ItemReorderComponent Component');
    this.text = 'Hello World';
  }

}
