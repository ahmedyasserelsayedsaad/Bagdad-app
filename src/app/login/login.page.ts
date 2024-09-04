import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  form: FormGroup;



  constructor(private fb: FormBuilder,
    private navCtr: NavController,
    private loading: LoadingController,
    private userser: ShareService,
    private alrt: AlertController) {

    this.form = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })


  }

  ngOnInit() {
  }
  async register() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      let exist = this.userser.validateUser(email,password);
      if (exist) {
        this.navCtr.navigateForward('/e-home');
        let load = await this.loading.create({
          message: 'Check your information, please wait...',
          duration: 2000,
          mode: 'ios'
        });
        await load.present();
      } 
      else {
        let alert = await this.alrt.create({
          header: 'Error',
          message: 'User not found, try again.',
          buttons: [
            {
              role: 'cancel',
              text: 'Cancel',
            },
            {
              text: 'Sign Up',
              handler: () => {
                this.navCtr.navigateForward('/home');
              }
            }
          ]
        });
        await alert.present();
      }
  
    
    } 
    else {
      console.log('Form is invalid');
    }
  }
  
}
