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

  seedSample() {
    const samples: Array<{ title: string; description?: string; done?: boolean }> = [
      { title: 'Acheter du lait' },
      { title: 'Envoyer le rapport hebdo', done: true },
      { title: 'Réserver un billet de train' },
      { title: 'Appeler le plombier', description: 'Fuite cuisine' },
      { title: 'Préparer la présentation' },
      { title: 'Aller courir 30 min', done: true },
      { title: 'Mettre à jour le CV' },
      { title: 'Faire les courses du week-end' },
      { title: 'Lire l’article sauvegardé' },
      { title: 'Nettoyer la voiture' },
      { title: 'Planifier les vacances' },
      { title: 'Payer la facture électricité' },
      { title: 'Prendre rendez-vous médecin', done: true },
      { title: 'Tester la nouvelle appli' },
      { title: 'Organiser les favoris du navigateur' },
      { title: 'Sauvegarder les photos' },
      { title: 'Classer les mails non lus' },
      { title: 'Mettre à jour les mots de passe' },
      { title: 'Remplacer la pile du détecteur de fumée' },
      { title: 'Préparer la liste de lecture' },
    ];

    this.itemsSignal.set(
      samples.map(item => ({
        id: crypto.randomUUID(),
        title: item.title.trim(),
        description: item.description?.trim() || '',
        done: Boolean(item.done),
      })),
    );
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

