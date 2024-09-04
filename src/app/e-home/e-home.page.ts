import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-e-home',
  templateUrl: './e-home.page.html',
  styleUrls: ['./e-home.page.scss'],
})
export class EHomePage implements OnInit {
search='search'
inpvalue:any

imges:any=['assets/imgs/images1.jpeg','assets/imgs/imags2.webp','assets/imgs/images3.webp','assets/imgs/images4.jpeg',]


  constructor(private navctr:NavController) { }

  ngOnInit() {
  }
  log(e: any) {
    const inputValue = e.target.value;
    console.log('Input Value:', inputValue);
  }

  swiperSlideChange(e:any){
console.log('changed  :'+e);

  }

  goToProducts(){
    this.navctr.navigateForward('/products')
  }
  goToteam(){
    this.navctr.navigateForward('/team')
  }
}
