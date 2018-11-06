import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useFirestoreDoc, FirehookDocData } from '../hooks/useFirestoreDoc';
import { useFirestoreQuery } from '../hooks/useFirestoreQuery';
const firestore = firebase.firestore;
type Todo = {
  id: string;
  status: string;
  title: string;
};

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY!,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL!,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!
});

export const WithoutFirehookComponent: React.StatelessComponent = () => {
  const [todoData, setTodoData] = useState<FirehookDocData<Todo>>({
    isLoading: true
  });

  useEffect(() => {
    console.log('Hello!');

    return firestore()
      .collection('todos')
      .doc('07af3e73-4a92-4301-976d-bc6bc7e9f42a')
      .onSnapshot(doc => {
        const docData = doc.data() as Todo;
        setTodoData({
          id: doc.id,
          data: docData,
          isLoading: false,
          metadata: doc.metadata
        });
      });
  });

  if (todoData.isLoading) {
    return <p>Loading</p>;
  }

  if (!todoData.data) {
    return <p>Could not find album</p>;
  }

  return (
    <p>
      {todoData.data.title} - {todoData.data.status}
    </p>
  );
};

export const FirehookDocComponent: React.StatelessComponent = () => {
  const todoData = useFirestoreDoc<Todo>({
    ref: firestore()
      .collection('todos')
      .doc('07af3e73-4a92-4301-976d-bc6bc7e9f42a'),
    onSubscribe: () => console.log('Hello!'),
    onDetach: () => console.log('Goodbye!')
  });

  if (todoData.isLoading) {
    return <p>Loading</p>;
  }

  if (!todoData.data) {
    return <p>Could not find album</p>;
  }

  return (
    <p>
      {todoData.data.title} - {todoData.data.status}
    </p>
  );
};

export const FirehookQueryComponent: React.StatelessComponent = () => {
  const todoData = useFirestoreQuery<Todo>(
    firestore()
      .collection('todos')
      .where('status', '==', 'incomplete')
  );

  if (todoData.isLoading) {
    return <p>Loading</p>;
  }

  if (todoData.isEmpty) {
    return <p>Could not find any albums</p>;
  }

  return (
    <ul>
      {todoData.data.map(todo => (
        <li>
          {todo.data.title} - {todo.data.status}
        </li>
      ))}
    </ul>
  );
};
