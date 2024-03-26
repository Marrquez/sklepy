import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, orderBy, query, limit } from  "@angular/fire/firestore";
import { Transaction } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addTransaction(transaction: Transaction): Promise<any> {
    return await addDoc(collection(this.firestore, 'transactions'), transaction);
  }

  async getTransactions() {
    const productsRef = collection(this.firestore, 'transactions');
    return (await getDocs(query(productsRef, orderBy('date', 'desc'), limit(10)))).docs.map(doc => doc.data());
  }
}
