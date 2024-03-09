import { Injectable, inject } from '@angular/core';
import { Firestore, setDoc, collection, addDoc, getDocs, updateDoc, doc, writeBatch } from  "@angular/fire/firestore";
import { Product } from '../models/product.model';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SklepyService {
  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addProduct(product: Product): Promise<any> {
    return await addDoc(collection(this.firestore, 'products'), product).then((productRef)=> {
      collection(this.firestore, `products/${productRef.id}/stops`);
      setDoc(productRef, {... product, id:  productRef.id});
      return  productRef;
    });
  }

  async updateProduct(product: Product): Promise<any> {
    await updateDoc(doc(this.firestore, "products/" + product.id), {
      name: product.name,
      price: product.price,
      value: product.value,
      units: product.units,
      quantity: product.quantity,
      available: product.available
    });
  }

  async bulkUpdateProducts(products: Map<string, number>): Promise<any> {
    let batch = writeBatch(this.firestore);
    
    products.forEach((value: number, key: string) => {
      let productsRef = doc(this.firestore, 'products/' + key);
      batch.update( productsRef, {available: value});
    });
    
    return await batch.commit();
  }

  async getProducts() {
    const productsRef = collection(this.firestore, 'products');
    return (await getDocs(productsRef)).docs.map(doc => doc.data());
  }
}
