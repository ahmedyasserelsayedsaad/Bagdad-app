import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  id: any;
  det: any = {};
  deet: any = [];
  rate = 'rate';
  h3 = 'h3';
  h4 = 'h4';
  p = 'p';
  constructor(private share: ShareService, private router: ActivatedRoute) {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id);


  }

  ngOnInit() {
    this.detials();
  }
  detials() {
    this.share.getOneProduct(this.id).subscribe((res: any) => {
      this.det = res;
      this.deet.push(this.det)
      console.log(this.det);
    })
    

  }
}
