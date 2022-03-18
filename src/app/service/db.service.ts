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
    documentId: any
  ): Promise<void> {
    const collectionRef: AngularFirestoreCollection =
      this.db.collection(collection);
    const documentRef: AngularFirestoreDocument = collectionRef.doc(documentId);

    await documentRef.delete();
  }

  async getCollection(
    collection: string
  ): Promise<firebase.default.firestore.QuerySnapshot<unknown>> {
    const snaps: firebase.default.firestore.QuerySnapshot<unknown> =
      await this.db.collection(collection).get().toPromise();

    return snaps;
  }

  async getCollectionDocuments(collection: string): Promise<any[]> {
    const snaps: firebase.default.firestore.QuerySnapshot<unknown> =
      await this.getCollection(collection);

    const documents: any[] = snaps.docs.map((snap) => {
      const snapData: Object = snap.data() as Object;

      return {
        id: snap.id,
        document: snapData,
      };
    });

    return documents;
  }

  async saveCollectionDocument(collection: string, item: any): Promise<void> {
    const collectionRef: AngularFirestoreCollection =
      this.db.collection(collection);

    if (item.id) {
      console.log('update');
      const documentRef: AngularFirestoreDocument = collectionRef.doc(item.id);

      await documentRef.update(item.document);
    } else {
      console.log('add');
      collectionRef.add(item.document);
    }
  }
}
