/**
 * store.js - Encrypted IndexedDB Storage using Web Crypto API
 */
export class Store {
  constructor(dbName = 'jcore-db') {
    this.dbName = dbName;
    this.db = null;
    this.key = null;
  }

  async init() {
    // Generate/Recover a key (in real app, this might come from a password/PBKDF2)
    this.key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore('data', { keyPath: 'id' });
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };
      request.onerror = (e) => reject(e);
    });
  }

  async set(id, data) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(data));
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      this.key,
      encoded
    );

    // Combine IV and encrypted data
    const blob = new Uint8Array(iv.length + encrypted.byteLength);
    blob.set(iv);
    blob.set(new Uint8Array(encrypted), iv.length);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['data'], 'readwrite');
      const store = transaction.objectStore('data');
      const request = store.put({ id, value: blob });
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
    });
  }

  async get(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['data'], 'readonly');
      const store = transaction.objectStore('data');
      const request = store.get(id);
      request.onsuccess = async () => {
        if (request.result) {
          const blob = request.result.value;
          const iv = blob.slice(0, 12);
          const data = blob.slice(12);
          try {
            const decrypted = await crypto.subtle.decrypt(
              { name: "AES-GCM", iv },
              this.key,
              data
            );
            resolve(JSON.parse(new TextDecoder().decode(decrypted)));
          } catch (e) {
            reject(e);
          }
        } else {
          resolve(null);
        }
      };
      request.onerror = (e) => reject(e);
    });
  }
}
