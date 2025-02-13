import { LinkedList } from "./linkedlist.js";

class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  buckets = [];
  length = 0;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.buckets[index] !== undefined) {
      // if the bucket is not empty
      let list = this.buckets[index];
      if (list.containsKey(key)) {
        // if the bucket contains the key, update the value
        list.updateObjAt(key, value, list.findKey(key));
      } else {
        // else append the key value pair to the linked list
        let obj = {};
        obj[key] = value;
        list.append(obj);
        this.length++;
      }
    } else {
      // else the bucket is empty: create the linked list and append the key value pair
      let ll = new LinkedList();
      let obj = {};
      obj[key] = value;
      ll.append(obj);
      this.buckets[index] = ll;
      this.length++;
    }

    if (this.length > this.loadFactor * this.capacity) {
      this.rehash();
      console.log("load level exceeded, rehash occured.");
    }
  }

  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.buckets[index] === undefined) {
      // if bucket is empty return null
      return null;
    } else {
      // else find the value at key - returns null if not found
      let list = this.buckets[index];
      return list.valueAtKey(key);
    }
  }

  has(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.buckets[index] === undefined) {
      // if bucket is empty return false
      return false;
    } else {
      // else search the bucket for the key - returns true or false
      let list = this.buckets[index];
      return list.containsKey(key);
    }
  }

  remove(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.buckets[index] === undefined) {
      // if bucket is empty return null
      return false;
    } else {
      // else remove entry based on key; returns false if key not found
      let list = this.buckets[index];
      if (list.removeAtKey(key)) {
        length--;
        return true;
      }

      return false;
    }
  }
  getLength() {
    return this.length;
  }

  clear() {
    this.buckets = [];
    this.length = 0;
  }

  keys() {
    let keyArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        // bucket is not empty / contains a linked list
        let currentNode = bucket.getHead();
        for (let i = 0; i < bucket.size; i++) {
          keyArr.push(Object.keys(currentNode.value)[0]);
          currentNode = currentNode.nextNode;
        }
      }
    });

    return keyArr;
  }

  values() {
    let valueArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        // bucket is not empty / contains a linked list
        let currentNode = bucket.getHead();
        for (let i = 0; i < bucket.size; i++) {
          let key = Object.keys(currentNode.value)[0];
          valueArr.push(currentNode.value[key]);
          currentNode = currentNode.nextNode;
        }
      }
    });

    return valueArr;
  }

  entries() {
    let entriesArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        // bucket is not empty / contains a linked list
        let currentNode = bucket.getHead();
        for (let i = 0; i < bucket.size; i++) {
          let key = Object.keys(currentNode.value)[0];
          let value = currentNode.value[key];
          entriesArr.push([key, value]);
          currentNode = currentNode.nextNode;
        }
      }
    });

    return entriesArr;
  }

  rehash() {
    this.capacity *= 2;
    let entries = this.entries();
    this.clear();

    entries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }
}

export { HashMap };
