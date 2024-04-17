import { Component, Input } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../State/Product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {


  @Input() product:any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ){

  }

  ngOnInit() {
    console.log(this.product)
    if(this.product){
      this.productForm.patchValue(this.product),
      this.productForm.get('topLavelCategory')?.setValue(this.product.category.parentCategory.parentCategory.name)
      this.productForm.get('secondLavelCategory')?.setValue(this.product.category.parentCategory.name)
      this.productForm.get('thirdLavelCategory')?.setValue(this.product.category.name)
      this.sizeForm.get('s')?.setValue(this.product.sizes.find((size:any)=> size.name == 'S').quantity);
      this.sizeForm.get('m')?.setValue(this.product.sizes.find((size:any)=> size.name == 'M').quantity);
      this.sizeForm.get('l')?.setValue(this.product.sizes.find((size:any)=> size.name == 'L').quantity);

    }
  }

  productForm: FormGroup = this.formBuilder.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    price: [null, Validators.required],
    discountedPrice: [null, Validators.required],
    discountPersent: [null, Validators.required],
    quantity: [null, Validators.required],
    brand: ["", Validators.required],
    color: ["", Validators.required],
    imageUrl: ["", Validators.required],
    topLavelCategory: ["", Validators.required],
    secondLavelCategory: ["", Validators.required],
    thirdLavelCategory: ["", Validators.required]
  })

  sizeForm: FormGroup = this.formBuilder.group({
    s:[null],
    m:[null],
    l:[null],
  })


  submitForm(){

    this.sizeForm.markAllAsTouched();
    this.productForm.markAllAsTouched();

    if(!this.productForm.valid){
      return
    }
    if(!this.sizeForm.valid){
      return
    }

    const dto: dto ={
      ...this.productForm.value,
      id: this.product ? this.product.id : null ,
      size:[
        {
          name: "S",
          quantity: this.sizeForm.getRawValue().s
        },
        {
          name: "M",
          quantity: this.sizeForm.getRawValue().m
        },
        {
          name: "L",
          quantity: this.sizeForm.getRawValue().l
        }
      ]
    }
    console.log(dto)
    if(this.product != undefined){
      this.productService.saveProduct(dto);
    }else{
      this.productService.saveNewProduct(dto);
    }

  }

  get formValid(){
    return this.productForm.valid && this.sizeForm.valid
  }
}
interface dto {
    id?: number,
    imageUrl: string,
    brand: string,
    title: string,
    color: string,
    discountedPrice: number,
    price: number,
    discountPersent: number,
    size: [
        {
          name: "S",
          quantity: number
        },
        {
          name: "M",
          quantity: number
        },
        {
          name: "L",
          quantity: number
        }
      ],
      quantity: number,
      topLavelCategory: string,
      secondLavelCategory: string,
      thirdLavelCategory: string,
      description: string
}
