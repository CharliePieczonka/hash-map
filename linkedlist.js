// modified from linked list project to accomodate key value pairs in the hash map
class LinkedList {
  head = null;
  tail = null;
  size = 0;

  append(value) {
    let node = new Node(value);

    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }

      currentNode.nextNode = node;
    }

    this.tail = node;
    this.size++;
  }

  prepend(value) {
    let node = new Node(value);

    if (this.head === null) {
      this.head = node;
    } else {
      let copy = this.head;
      node.nextNode = copy;
      this.head = node;
    }

    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  valueAtKey(key) {
    let currentNode = this.head;
    for (let i = 0; i < this.size; i++) {
      if (key in currentNode.value) {
        return currentNode.value[key];
      }

      currentNode = currentNode.nextNode;
    }

    return null;
  }

  removeAtKey(key) {
    // assumes 2+ nodes; if 1 node then linked list is deleted by hash method
    let currentNode = this.head;
    let nextNode = currentNode.nextNode;
    let prevNode = null;
    for (let i = 0; i < this.size; i++) {
      if (key in currentNode.value) {
        //if key is found in linked list
        if (prevNode === null) {
          // key was head
          if (nextNode === null) {
            // there is no next node, i.e. head was only node
            currentNode.value = null;
          } else {
            // change next node to head
            this.head = nextNode;
            currentNode.value = null;
          }
        } else {
          // point prev node to next node
          prevNode.nextNode = nextNode;
          currentNode.value = null;
        }

        this.size--;
        return true;
      }

      prevNode = currentNode;
      currentNode = currentNode.nextNode;
      nextNode = currentNode.nextNode;
    }

    return false;
  }

  containsKey(key) {
    let currentNode = this.head;
    for (let i = 0; i < this.size; i++) {
      if (key in currentNode.value) {
        return true;
      }

      currentNode = currentNode.nextNode;
    }

    return false;
  }

  findKey(key) {
    let currentNode = this.head;
    for (let i = 1; i <= this.size; i++) {
      if (key in currentNode.value) {
        return i;
      }

      currentNode = currentNode.nextNode;
    }

    return null;
  }

  toString() {
    let string = "";
    let currentNode = this.head;
    for (let i = 0; i < this.size; i++) {
      string += "( ";
      string += currentNode.value;
      string += " ) -> ";
      currentNode = currentNode.nextNode;
    }

    string += "null";
    return string;
  }

  updateObjAt(key, value, index) {
    let currentNode = this.head;
    for (let i = 1; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    currentNode.value[key] = value;
  }
}

class Node {
  value = null;
  nextNode = null;

  constructor(value) {
    this.value = value;
  }
}

export { LinkedList };
