import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  deleteDoc,
  doc,
  Firestore, updateDoc
} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {update} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  // TODO: Get collection data
  getCollectionData(collectionName: string): Observable<any[]> {
    const collectionsRef = collection(this.firestore, collectionName)
    return collectionData(collectionsRef)
  }
  // TODO: Get collection data with ids
  getCollectionDataWithIds(collectionName:string): Observable<any[]> {
    const collectionRef = collection(this.firestore,collectionName);
    return collectionSnapshots(collectionRef).pipe(
      map(actions => actions.map( a => {
        const id = a.id
        const data = a.data()
        return {id, ...data};
      }))
    )
  }
  // TODO: Add data to collection
  addDocumentData(collectionName: string, data: any): Promise<any>{
    const collectionsRef = collection(this.firestore, collectionName);
    return addDoc(collectionsRef, data)
  }
  // TODO: Update data
  updateDocument(collectionName: string, id: string, data: any) {
    const docRef = doc(this.firestore, collectionName, id);
    return updateDoc(docRef,data)
  }
  // TODO: Move data to different collection
  // TODO: Remove data from collection
  removeDocument(collectionName: string, docId: string): Promise<void> {
    console.log('docId ', docId)
    const docRef = doc(this.firestore, `${collectionName}/${docId}`)
    return deleteDoc(docRef)
  }
}
