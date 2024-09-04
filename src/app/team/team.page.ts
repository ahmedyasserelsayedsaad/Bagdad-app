import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  show: any;
  teeam: any = [];
  form: FormGroup;
  constructor(
    private shareData: ShareService,
    private alert: AlertController,
    private fb: FormBuilder,
    private loadctr: LoadingController) {
    this.form = new FormGroup({

      userName: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.teeam = this.shareData.ourTeam();
    this.ourTeam();
  }
  ourTeam() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 1300);
  }
  async aboutdev(teamme: any) {
    let alert = await this.alert.create({
      header: teamme.name,
      mode: 'ios',
      message: `phone: ${teamme.phone} \n\n Description: ${teamme.des}`,
      buttons: [
        {
          text: 'ok',
        }
      ],
    })
    await alert.present();
  }

  async sendMessage() {
    if (this.form.value !== '') {
      let load = await this.loadctr.create({
       
        message: 'سيتم ارسال رسالتك لفريق سوق بغداد',
        duration: 1500,
        spinner: 'dots',
        mode: 'ios',
      })
      await load.present();
    }
  }
}
