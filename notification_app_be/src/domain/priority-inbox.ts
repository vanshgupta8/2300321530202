import { Notification, compareByPriority } from "./notification";

// Keeps only the best N notifications using a small min-heap.
export class PriorityInbox {
  private items: Notification[] = [];

  constructor(private readonly maxSize: number = 10) {}

  addOne(item: Notification) {
    if (this.items.length < this.maxSize) {
      this.items.push(item);
      this.moveUp(this.items.length - 1);
      return;
    }

    if (compareByPriority(item, this.items[0]) > 0) {
      this.items[0] = item;
      this.moveDown(0);
    }
  }

  addMany(list: Notification[]) {
    for (const item of list) {
      this.addOne(item);
    }
  }

  getTopList(): Notification[] {
    return [...this.items].sort((a, b) => compareByPriority(b, a));
  }

  private moveUp(index: number) {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (compareByPriority(this.items[current], this.items[parent]) >= 0) {
        break;
      }
      this.swap(current, parent);
      current = parent;
    }
  }

  private moveDown(index: number) {
    let current = index;

    while (true) {
      const left = current * 2 + 1;
      const right = current * 2 + 2;
      let smallest = current;

      if (left < this.items.length && compareByPriority(this.items[left], this.items[smallest]) < 0) {
        smallest = left;
      }

      if (right < this.items.length && compareByPriority(this.items[right], this.items[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === current) {
        break;
      }

      this.swap(current, smallest);
      current = smallest;
    }
  }

  private swap(i: number, j: number) {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;
  }
}
