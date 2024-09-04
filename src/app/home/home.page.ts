import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;


  constructor(private fb: FormBuilder, private navCtr: NavController, private loading: LoadingController,private userser:ShareService) {

    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })

   
  }

  async register() {
    if (this.form.valid) {
      const { userName, phone, email, password } = this.form.value;
      this.userser.addUser({
        userName,
        phone,
        email,
        password
      });
  
      let load = await this.loading.create({
        message: 'Check your information, please wait...',
        duration: 2000,
        mode: 'ios'
      });
      await load.present();
      console.log(this.form.value);
      
      setTimeout(() => {
        this.navCtr.navigateForward('/login');
      }, 3000);
    } else {
      console.log('Form is invalid');
    }
  }
  
}
