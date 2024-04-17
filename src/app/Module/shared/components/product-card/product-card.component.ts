import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';
import { UserService } from '../../../../State/User/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AdminModule } from "../../../admin/admin.module";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product:any
  userProfile: any;

  constructor(private router:Router,
    private productService: ProductService,
    private userService: UserService,
    public store: Store<AppState>,
    public dialog: MatDialog
  ){
    if (localStorage.getItem("jwt")) this.userService.getUserProfile()

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;

      console.log("user",user)
    })
  }

  navigate() {
    this.router.navigate([`product-details/${this.product.id}`])
  }



  deleteProduct(productId: number) {
    // Termék törlése
    this.productService.deleteProduct(productId);
  }

  openEditDialog(){
    console.log(this.product)
    this.dialog.open(EditDialog,{
      data: this.product
    })
  }

}

@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit-dialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, AdminModule]
})
export class EditDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
  }
}
