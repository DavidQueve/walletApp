import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public accountList: Account[]=[];

  public _cuentaIni: string="";
  public _cuentaDes: string="";
  public monto: number= 10;

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private db: AngularFireDatabase) {
      this.getStarted();
    }
  
    async presentToast(position:'top' | 'middle' | 'bottom'){
      const toastTop = await this.toastController.create({
        message:"Transferencia Completada",
        duration: 1500,
        position: position
      });

      const toastBottom = await this.toastController.create({
        message:"NO se completo la Transferencia",
        duration: 1500,
        position: position
      });

      const toastMiddle = await this.toastController.create({
        message:"Las cuentas son IGUALES",
        duration: 1500,
        position: position
      });

      switch (position){
        case 'top':
          await toastTop.present();
        break;
        case 'bottom':
          await toastBottom.present();
        break;
        case 'middle':
          await toastMiddle.present();
        break;
      }

      
      await this.getStarted();
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

    var dataIni={
      id: this.accountList[parseInt(this._cuentaIni)].id,
      nombre: this.accountList[parseInt(this._cuentaIni)].nombre,
      numeroCuenta: this.accountList[parseInt(this._cuentaIni)].numeroCuenta,
      saldoDisponible: this.accountList[parseInt(this._cuentaIni)].saldoDisponible
    }
    var dataDes={
      id: this.accountList[parseInt(this._cuentaDes)].id,
      nombre: this.accountList[parseInt(this._cuentaDes)].nombre,
      numeroCuenta: this.accountList[parseInt(this._cuentaDes)].numeroCuenta,
      saldoDisponible: this.accountList[parseInt(this._cuentaDes)].saldoDisponible
    }

    if(this.monto <= dataIni.saldoDisponible && this._cuentaIni!=this._cuentaDes){
      dataDes.saldoDisponible = dataDes.saldoDisponible - (-this.monto);
      dataIni.saldoDisponible = dataIni.saldoDisponible - this.monto;



      await this.db.object('account/'+this._cuentaIni).set(dataIni);
      await this.db.object('account/'+this._cuentaDes).set(dataDes);

      console.log("Transferencia Completada-Monto Añadido: "+this.monto);
      console.log("Saldo de cuenta de origen: "+dataIni.saldoDisponible);
      console.log("Saldo de cuenta de destino: "+dataDes.saldoDisponible);
      this.presentToast("top");
    }else{
      console.log("El monto > que SALDO DISPONIBLE");
      this.presentToast("bottom");
    }

    if(this._cuentaIni==this._cuentaDes){
      console.log("Las cuentas son iguales");
      this.presentToast("middle");
    }
    
  }
}
class Account {
  id:number;
  nombre: string;
  numeroCuenta: string;
  saldoDisponible: number;

  constructor() {
    this.id=0;
    this.nombre = '';
    this.numeroCuenta = '';
    this.saldoDisponible = 0;
  }
}

