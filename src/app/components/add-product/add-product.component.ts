import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDrivenService } from 'src/app/services/event-driven.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(
    private formBuilder:FormBuilder, 
    private productService:ProductsService, 
    private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
    this.productFormGroup=this.formBuilder.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });
  }

  onSaveProduct() {
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    this.productService.saveProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.ADD_PRODUCT});
        alert("Success saving product");
      })
  }

}
