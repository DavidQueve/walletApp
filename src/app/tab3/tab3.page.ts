import { Component } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { async, Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public accountList: Account[]=[];

  num = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

  public _nombre: string="";
  public _numeroCuenta: string=this.num.toString();;
  public _saldoDisponible: number=0;

  constructor(private alertController: AlertController,
    private db: AngularFireDatabase) {
      this.getStarted();
    }
    
    async presentAlert(){
      const alert = await this.alertController.create({
        header: this._nombre,
        subHeader: this._numeroCuenta,
        message: "Saldo Disponible: "+this._saldoDisponible,
        buttons: ['Listo'],
      });
      
      await this.addAccount();
      await alert.present();
      await this.getStarted();
    }

  async getStarted(){
    var account: Account[]=[];
    await this.getAccountRealTimeBD().then(value =>{
      account = value as Account[];
    });

    this.accountList = account;
    console.log(this.accountList);

    this._nombre = "Cuenta Nueva #"+ this.accountList.length;
  }

  getAccountRealTimeBD(){
    return new Promise((resolve,reject)=>{
      this.db.list('account').valueChanges().subscribe(value =>{
        resolve(value);
      })
    });
  }
  
  async addAccount(){
    
    var data={
      nombre: this._nombre,
      numeroCuenta: this._numeroCuenta,
      saldoDisponible: this._saldoDisponible
    }

    await this.db.object('account/'+this.accountList.length).set(data);
    this.clearFields();
  }

  clearFields(){
    this._nombre="",
    this._numeroCuenta="",
    this._saldoDisponible=0
  }

}
class Account {
  nombre: string;
  numeroCuenta: string;
  saldoDisponible: number;

  constructor() {
    this.nombre = '';
    this.numeroCuenta = '';
    this.saldoDisponible = 0;
  }
}

