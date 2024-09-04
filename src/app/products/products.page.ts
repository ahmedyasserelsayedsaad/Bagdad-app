
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareService } from '../services/share.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


  ob: Subscription | undefined;

  inpvalue: any = '';
  search = 'search';
  products: any = [];
  displayProducts: any = [];
  counterValue: number = 1;

  totalPages: number = 0;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  itemPerPage: number = 6;


  categoryInput: string = '';

  cartItemCount: number = 0; 

  constructor(private share: ShareService,private load:LoadingController) {


  }

  ngOnInit() {
    this.loadCtr();
  }
  ngOnDestroy() {
    this.ob?.unsubscribe();
  }

  
  log(e: any) {
    const categoryInput = e.target.value;
    console.log('Input Value:', categoryInput);
  }

  //chips fillter
  allpro() {
    console.log('all products');
    this.displayProducts = [...this.products];
    this.updateDisplay();
  }
  offers() {
    console.log('offers products');
    this.displayProducts = this.products.filter((pro: any) => pro.price < 50);
    this.currentPage = 1;

  }
  newst() {
    console.log('newest products');
    this.displayProducts = this.products.filter((pro: any) => pro.rating.rate >= 3);
    this.currentPage = 1;

  }

  //all products
  getALLproducts() {
    this.ob = this.share.getpro().subscribe((res: any) => {
      console.log(res);
      this.products = res;
      let totalItems = res.length;
      this.totalPages = Math.ceil(totalItems / this.itemPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1)
      console.log(this.products);
      this.updateDisplay();

    })
  }

  //products to display
  updateDisplay() {
    let startIndex = (this.currentPage - 1) * this.itemPerPage;
    const endIndex = Math.min(startIndex + this.itemPerPage, this.products.length);
    this.displayProducts = this.products.slice(startIndex, endIndex);
  }

  //paggination
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplay();
  }

//add to cart 
toggleCounter(item: any) {
  item.showB = true;
  if (typeof item.counterValue === 'undefined') {
    item.counterValue = 1;
  }

  // Update cart in local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const existingItemIndex = cartItems.findIndex((cartItem:any) => cartItem.id === item.id);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].counterValue = item.counterValue;
  } else {
    cartItems.push(item);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

  increase(item: any) {
    if (item.counterValue <= this.products.length) {
      item.counterValue++;
    }
  }

  decrease(item: any) {
    if (item.counterValue > 1) {
      item.counterValue--;
    }
  }


  //input filter
  filterByCategory() {
    if (this.categoryInput.trim() === '') {
      this.displayProducts = [...this.products];
    } else {
      this.displayProducts = this.products.filter((product: any) =>
        product.category.toLowerCase().includes(this.categoryInput.toLowerCase())
      );
    }

  }


//load controll
async loadCtr(){
  let loadc=await this.load.create({
    message:'منتجات سوق بغداد اهلا بك ',
    duration:500,
    spinner:'bubbles',
    mode:'ios'
  })
  await loadc.present();
  this.getALLproducts();
}


}
