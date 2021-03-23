import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventDrivenService } from 'src/app/services/event-driven.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId:number;
  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private activetedRoute:ActivatedRoute, 
      private productService:ProductsService,
      private formBuilder:FormBuilder,
      private eventDrivenService:EventDrivenService) {
    this.productId=activetedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
      .subscribe(product=>{
        this.productFormGroup=this.formBuilder.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]
        })
      })
  }

  onUpdateProduct() {
    this.productService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT});
        alert("Success product updated");
      });
  }

}
