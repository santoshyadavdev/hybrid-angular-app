import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductComponent],
  entryComponents: [ProductComponent],
})
export class ProductModule {}
