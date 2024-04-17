import { Component, OnDestroy } from '@angular/core';
import { homeCarouselData } from '../../../../../../Data/mainCarousel';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.css']
})
export class MainCarouselComponent implements OnDestroy {
  carouselData: any;
  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.carouselData = homeCarouselData;
    this.autoPlay();
  }

  autoPlay() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3500); 
  }

  nextSlide(direction: 'left' | 'right' = 'right') {
    if (direction === 'right') {
      this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
    } else if (direction === 'left') {
      if (this.currentSlide === 0) {
        this.currentSlide = this.carouselData.length; 
      }
      this.currentSlide = (this.currentSlide - 1 + this.carouselData.length) % this.carouselData.length;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval); 
  }
}
