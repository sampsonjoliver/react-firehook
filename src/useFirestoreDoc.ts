import { useState, useEffect } from 'react';
import { firestore } from 'firebase';

export type FirehookDocData<T> = {
  id?: string;
  data?: T;
  isLoading: boolean;
  metadata?: firestore.SnapshotMetadata;
};

export function useFirestoreDoc<T>(ref: firestore.DocumentReference) {
  const [refData, setRefData] = useState<FirehookDocData<T>>(null);

  useEffect(() => {
    return ref.onSnapshot(doc => {
      const docData = doc.data() as T | undefined;

      setRefData({
        id: doc.id,
        data: docData,
        isLoading: false,
        metadata: doc.metadata
      });
    });
  });

  setRefData({ isLoading: true });

  return refData;
}
