import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private db: AngularFirestore) {}

  async addDocument(collection: string, document: any) {
    const c = this.getCollection(collection);

    c?.add(document);
  }

  async deleteDocument(collection: string, document: any): Promise<void> {
    const c: AngularFirestoreCollection = this.db.collection(collection);
    const d: AngularFirestoreDocument = c?.doc(document.id);

    d?.delete();
  }

  getCollection(collection: string) {
    return this.db.collection(collection);
  }
}
