import { Component, Input } from '@angular/core';
import { navigation } from './nav-content';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.css'
})
export class NavContentComponent {

  category: any
  @Input() selectedSection: any;

  ngOnInit() {
    this.category = navigation;

    console.log("selected section", this.selectedSection)
  }

  constructor(private router:Router){}

handleNavigate=(path:any)=>{
  this.router.navigate([path])
}


}
