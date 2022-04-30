import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const txtEditorDB = await openDB('txtEditor', 1);
  const transVar = txtEditorDB.transaction('txtEditor', 'readwrite');
  const storeVar = transVar.objectStore('txtEditor');
  const request = storeVar.put({ id: 1, value: content });
  
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const txtEditorDB = await openDB('txtEditor', 1);
  const transVar = txtEditorDB.transaction('txtEditor', 'readonly');
  const storeVar = transVar.objectStore('txtEditor');
  const request = storeVar.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  return result?.value;
};

initdb();
