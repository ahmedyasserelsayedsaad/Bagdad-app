import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  show:any;
  constructor() { }

  ngOnInit() {
    this.loadCartItems();
    this.showCart();
  }
  loadCartItems() {
    // Load cart items from local storage or service
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.counterValue), 0);
  }
showCart(){
this.show=true;
setTimeout(() => {
  this.show=false
}, 2000);
}



}
