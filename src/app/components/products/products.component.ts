import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productService: ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetProducts() {
    this.products$=
      this.productService.getProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$=
      this.productService.getSelectedProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );    
  }

  onGetAvailableProducts() {
    this.products$=
      this.productService.getAvailableProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) { 
    if(!dataForm.keyword || dataForm.keyword.trim() === '') {
      this.products$=null;
      return;
    } 
    this.products$=
      this.productService.searchProducts(dataForm.keyword.trim()).pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p:Product) {
    this.productService.selectProduct(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p:Product) {
    let v=confirm("Are you sure?");
    if(v)
    this.productService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetProducts();
      })
  }

  onAddProduct() {
    this.router.navigateByUrl("/addProduct");
  }

  onEdit(p:Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionsTypes.ADD_PRODUCT: this.onAddProduct(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProductActionsTypes.DELECTE_PRODUCT: this.onDelete($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload); break;
    }
  }

}
