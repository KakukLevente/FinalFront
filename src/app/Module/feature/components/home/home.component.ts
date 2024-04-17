import { Component } from '@angular/core';
import { menJeans } from '../../../../../Data/Men/men_jeans';
import { skirts_page1 } from '../../../../../Data/Skirts/women_skirts';
import { dress_page1 } from '../../../../../Data/Women/Dress';
import { mens_shirts } from '../../../../../Data/Men/men_shirts';
import { mens_shoes } from '../../../../../Data/Men/men_shoes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menJeans:any
  womenSkirts:any
  womenDress:any
  menShirts:any
  menShoes:any

  ngOnInit(){
    this.menJeans=menJeans.slice(0,5)
    this.womenSkirts=skirts_page1.slice(0,5)
    this.womenDress=dress_page1.slice(0,5)
    this.menShirts=mens_shirts.slice(0,5)
    this.menShoes=mens_shoes.slice(0,5)
  }

}
