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

  async deleteCollectionDocument(
    collection: string,
    document: any
  ): Promise<void> {
    const collectionRef: AngularFirestoreCollection =
      this.db.collection(collection);
    const documentRef: AngularFirestoreDocument = collectionRef?.doc(
      document.id
    );

    await documentRef?.delete();
  }

  async getCollection(
    collection: string
  ): Promise<firebase.default.firestore.QuerySnapshot<unknown>> {
    const snaps: firebase.default.firestore.QuerySnapshot<unknown> =
      await this.db.collection(collection).get().toPromise();

    return snaps;
  }

  async saveCollectionDocument(
    collection: string,
    document: any
  ): Promise<void> {
    const collectionRef: AngularFirestoreCollection =
      this.db.collection(collection);
    const documentRef: AngularFirestoreDocument = collectionRef?.doc(
      document.id
    );
    const dto: any = JSON.parse(JSON.stringify(document));
    await documentRef?.set(dto);
  }
}
