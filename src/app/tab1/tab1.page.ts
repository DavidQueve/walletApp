import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
public accountList: Account[]=[];
  constructor(private db: AngularFireDatabase)
  {
  //this.db.object('4').set({nombre:'Ahorros de Navidad',numeroCuenta:2999101214,saldoDisponible:"500"});
  this.getStarted();
  }

  async getStarted(){
    var account: Account[]=[];
    await this.getAccountRealTimeBD().then(value =>{
      account = value as Account[];
    });

    this.accountList = account;
    console.log(this.accountList);
  }

  getAccountRealTimeBD(){
    return new Promise((resolve,reject)=>{
      this.db.list('account').valueChanges().subscribe(value =>{
        resolve(value);
      })
    });
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
