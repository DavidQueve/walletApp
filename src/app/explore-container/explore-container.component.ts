import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  /* Esto es el ScrollInfiniti pero no funciona
  implements OnInit //esto va arriba en la clase
  items = [];
  ngOnInit(){
    this.generateItems();
  }

  private generateItems(){
    const count = this.items.length + 1;
    for (let i = 0; i<10; i++){
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    },500);
  }
  */
/* 
  items: Observable<any[]>;
  constructor(private alertController: AlertController,
              private toastController: ToastController,
              public db: AngularFireDatabase,
              public navCtrl: NavController,
            ) {
              this.items = db.list('list').valueChanges();
            }
  */

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    public db: AngularFireDatabase)
  {
  this.db.object('account/1').set({nombre:'pepoo',numeroCuenta:13131,gmail:"dada@dqd"});
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: "",
      subHeader: "",
      message: "",
      buttons: ['ok'],
    });
    await alert.present();
  }

  async presentToast(position:'top' | 'middle' | 'bottom'){
    const toast = await this.toastController.create({
      message:"Hello World",
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  @Input() name?: string;

}
