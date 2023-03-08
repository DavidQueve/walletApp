import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public accountList: Account[]=[];

  public _cuentaIni: string="";
  public _cuentaDes: string="";
  public monto: number=0;

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private db: AngularFireDatabase) {
      this.getStarted();
    }
  
    async presentToast(position:'top' | 'middle' | 'bottom'){
      const toast = await this.toastController.create({
        message:"El monto es de: "+this._cuentaIni,
        duration: 1500,
        position: position
      });
  
      await toast.present();
    }

  async getStarted(){
    var account: Account[]=[];
    await this.getAccountRealTimeBD().then(value =>{
      account = value as Account[];
    });

    this.accountList = account;
    console.log(this._cuentaIni);

    //this.nombre = this.accountList[this.accountList.length-1].nombre + 1;
  }

  getAccountRealTimeBD(){
    return new Promise((resolve,reject)=>{
      this.db.list('account').valueChanges().subscribe(value =>{
        resolve(value);
      })
    });
  }
  
  async updateAccount(){
    console.log("hola:"+this._cuentaIni);
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

