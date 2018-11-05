import { useState, useEffect } from 'react';
import { firestore } from 'firebase';

export type FirehookCollectionDoc<T> = {
  id: string;
  data: T;
  metadata: firestore.SnapshotMetadata;
};

export type FirehookCollectionData<T> = {
  data: FirehookCollectionDoc<T>[];
  isEmpty?: boolean;
  isLoading: boolean;
  metadata?: firestore.SnapshotMetadata;
};

export function useFirestoreQuery<T>(
  ref: firestore.CollectionReference | firestore.Query
) {
  const [refData, setRefData] = useState<FirehookCollectionData<T>>(null);

  useEffect(() => {
    return ref.onSnapshot(it => {
      const docData: FirehookCollectionDoc<T>[] = it.docs.map(doc => ({
        id: doc.id,
        data: doc.data() as T,
        metadata: doc.metadata,
        x: doc.data()
      }));

      setRefData({
        data: docData,
        isLoading: true,
        isEmpty: it.empty,
        metadata: it.metadata
      });
    });
  });

  setRefData({
    data: [],
    isLoading: true
  });

  return refData;
}
