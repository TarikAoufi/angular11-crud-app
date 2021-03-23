import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventDrivenService } from 'src/app/services/event-driven.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

//@Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private enventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
  }

  onGetProducts() {
  //this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
    this.enventDrivenService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
  //this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.enventDrivenService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
  //this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.enventDrivenService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onAddProduct() {
  //this.productEventEmitter.emit({type:ProductActionsTypes.ADD_PRODUCT});
    this.enventDrivenService.publishEvent({type:ProductActionsTypes.ADD_PRODUCT});
  }

  onSearch(dataForm:any) {
  //this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:dataForm});
    this.enventDrivenService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:dataForm});
  }

}