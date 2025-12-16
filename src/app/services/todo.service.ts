import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly itemsSignal = signal<Item[]>([]);

  readonly items = this.itemsSignal.asReadonly();

  add(title: string, description?: string) {
    const trimmed = title.trim();
    if (!trimmed) return;
    const next: Item = {
      id: crypto.randomUUID(),
      title: trimmed,
      description: description?.trim() || '',
      done: false,
    };
    this.itemsSignal.update(list => [...list, next]);
  }

  toggle(id: string) {
    this.itemsSignal.update(list =>
      list.map(item => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  clearAll() {
    this.itemsSignal.set([]);
  }

  clearDone() {
    this.itemsSignal.update(list => list.filter(item => !item.done));
  }
}

