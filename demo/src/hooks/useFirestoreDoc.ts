import { useState, useEffect } from 'react';
import { firestore } from 'firebase';

export type FirehookDocData<T> = {
  id?: string;
  data?: T;
  isLoading: boolean;
  metadata?: firestore.SnapshotMetadata;
};

type Props = {
  ref: firestore.DocumentReference;
  onSubscribe?: () => void;
  onDetach?: () => void;
};

export function useFirestoreDoc<T>({ ref, onSubscribe, onDetach }: Props) {
  const [refData, setRefData] = useState<FirehookDocData<T>>({
    isLoading: true
  });

  useEffect(() => {
    if (onSubscribe) {
      onSubscribe();
    }

    const unsubscribe = ref.onSnapshot(doc => {
      const docData = doc.data() as T | undefined;

      setRefData({
        id: doc.id,
        data: docData,
        isLoading: false,
        metadata: doc.metadata
      });
    });

    return () => {
      if (onDetach) {
        onDetach();
      }
      unsubscribe();
    };
  }, []);

  return refData;
}
