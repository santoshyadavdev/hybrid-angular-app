import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import * as angular from "angular";
import { downgradeComponent } from '@angular/upgrade/static';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product = this.productSevice.getProduct();

  constructor(private productSevice: ProductService) { }

  ngOnInit() {

  }

}


angular.module("sampleapp").directive(
  "appProduct",
  downgradeComponent({
    component: ProductComponent,
  }) as angular.IDirectiveFactory
);