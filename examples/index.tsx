import { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { useFirestoreDoc } from '../src/useFirestoreDoc';
import { useFirestoreQuery } from '../src/useFirestoreQuery';

type Album = {
  artist: string;
  title: string;
  publishDate: Date;
  description?: string;
  genre?: string;
};

const WithoutFirehookComponent: React.StatelessComponent = () => {
  const [albumData, setAlbumData] = useState<Album | null>(null);

  useEffect(() => {
    return firestore()
      .collection('albums')
      .doc('The Moon Has Fallen')
      .onSnapshot(doc => {
        const docData = doc.data() as Album;
        setAlbumData(docData);
      });
  });

  return albumData ? <p>{albumData.title}</p> : <p>Loading...</p>;
};

const FirehookDocComponent: React.StatelessComponent = () => {
  const albumData = useFirestoreDoc<Album>(
    firestore()
      .collection('albums')
      .doc('The Moon Has Fallen')
  );

  if (albumData.isLoading) {
    return <p>Loading</p>;
  }

  if (!albumData.data) {
    <p>Could not find album</p>;
  }

  return <p>{albumData.data.title}</p>;
};

const FirehookQueryComponent: React.StatelessComponent = () => {
  const albumData = useFirestoreQuery<Album>(
    firestore()
      .collection('albums')
      .where('', '<', '')
  );

  if (albumData) {
    return <p>Loading</p>;
  }

  if (albumData.isEmpty) {
    <p>Could not find any albums</p>;
  }

  return (
    <ul>
      {albumData.data.map(album => (
        <li>{album.data.title}</li>
      ))}
    </ul>
  );
};
