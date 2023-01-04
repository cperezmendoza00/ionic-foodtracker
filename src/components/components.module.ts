import { NgModule } from '@angular/core';
import { ItemReorderComponent } from './item-reorder/item-reorder';
import { ModalControllerComponent } from './modal-controller/modal-controller';
@NgModule({
	declarations: [ItemReorderComponent,
    ModalControllerComponent],
	imports: [],
	exports: [ItemReorderComponent,
    ModalControllerComponent]
})
export class ComponentsModule {}
