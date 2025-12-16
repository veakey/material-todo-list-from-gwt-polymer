import { Injectable, effect, signal } from '@angular/core';
import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly storageKey = 'todo-items';
  private readonly itemsSignal = signal<Item[]>([]);

  readonly items = this.itemsSignal.asReadonly();

  constructor() {
    this.restoreFromStorage();

    // Persiste les modifications dans le stockage local du navigateur.
    effect(() => {
      const serialized = JSON.stringify(this.itemsSignal());
      localStorage.setItem(this.storageKey, serialized);
    });
  }

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

  private restoreFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        this.itemsSignal.set(
          parsed.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description ?? '',
            done: Boolean(item.done),
          })),
        );
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tâches depuis le stockage local', error);
    }
  }
}

