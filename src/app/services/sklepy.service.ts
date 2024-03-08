import { Injectable, inject } from '@angular/core';
import { Firestore, setDoc, collection, addDoc, getDocs } from  "@angular/fire/firestore";
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class SklepyService {
  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addProduct(product: Product): Promise<any> {
    addDoc(collection(this.firestore, 'products'), product).then((travelRef) => {
      collection(this.firestore, `products/${travelRef.id}/stops`);
      setDoc(travelRef, {... product, id:  travelRef.id});
      return  travelRef;
    })
  }

  getProducts() {
    return getDocs(collection(this.firestore, "products"));
  }
}
