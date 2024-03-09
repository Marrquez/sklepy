import { Injectable, inject } from '@angular/core';
import { Firestore, setDoc, collection, addDoc, getDocs, updateDoc, doc, writeBatch } from  "@angular/fire/firestore";
import { Product, Sell } from '../models/product.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellsService {
  private sklepStatusId = 'lEKhxRjsDrFJyjEnme3R';
  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addSell(own: boolean, products: Array<Product>): Promise<any> {
    const newSell = {
      own,
      products: JSON.stringify(products)
    }
    return await addDoc(collection(this.firestore, 'sells'), newSell);
  }

  async openCloseSells(isOpen: any): Promise<any> {
    return await addDoc(collection(this.firestore, 'sellsStatus'), isOpen);
  }

  async getSklepStatus() {
    const productsRef = collection(this.firestore, 'sklepStatus');
    return (await getDocs(productsRef)).docs.map(doc => doc.data());
  }

  async addSklepStatus() {
    const sklepStatus = {
      status: false,
      date: new Date().toString(),
    }
    return await addDoc(collection(this.firestore, 'sklepStatus'), sklepStatus);
  }

  async updateSklepStatus(status: boolean, date: string ) {
    await updateDoc(doc(this.firestore, "sklepStatus/" + this.sklepStatusId), {
      status: status,
      date: date,
    });
  }

  async getSells() {
    const productsRef = collection(this.firestore, 'sells');
    return (await getDocs(productsRef)).docs.map(doc => doc.data());
  }
}
