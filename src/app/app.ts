import { Component, computed, inject, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from './services/todo.service';
import { AddItemDialogComponent, AddItemData } from './components/add-item-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTooltipModule,
    MatRippleModule,
    MatSelectModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly todo = inject(TodoService);

  readonly items = this.todo.items;
  readonly hasItems = computed(() => this.items().length > 0);
  readonly lang = signal<'en' | 'fr' | 'de'>('en');
  private readonly translations: {
    [L in 'en' | 'fr' | 'de']: {
      [K in
        | 'title'
        | 'menuClearAll'
        | 'menuClearDone'
        | 'menuSettings'
        | 'menuAbout'
        | 'empty'
        | 'emptySubtitle'
        | 'addDialogTitle'
        | 'addDialogTitleLabel'
        | 'addDialogDescriptionLabel'
        | 'addDialogError'
        | 'addDialogCancel'
        | 'addDialogOk'
        | 'snackAdded'
        | 'snackClearedAll'
        | 'snackClearedDone'
        | 'confirmClearAllMessage'
        | 'confirm'
        | 'cancel'
        | 'notImplemented']: string;
    };
  } = {
    en: {
      title: 'Todo List',
      menuClearAll: 'Clear All',
      menuClearDone: 'Clear Done',
      menuSettings: 'Settings',
      menuAbout: 'About',
      empty: 'Nothing to do',
      emptySubtitle: 'Add a task to get started',
      addDialogTitle: 'Add Item',
      addDialogTitleLabel: 'Title',
      addDialogDescriptionLabel: 'Notes',
      addDialogError: 'Required',
      addDialogCancel: 'Cancel',
      addDialogOk: 'OK',
      snackAdded: 'Task added',
      snackClearedAll: 'List cleared',
      snackClearedDone: 'Done tasks removed',
      confirmClearAllMessage: 'Remove all items?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      notImplemented: 'Not implemented',
    },
    fr: {
      title: 'Todo List',
      menuClearAll: 'Tout effacer',
      menuClearDone: 'Effacer faits',
      menuSettings: 'Paramètres',
      menuAbout: 'À propos',
      empty: 'Aucune tâche',
      emptySubtitle: 'Ajoutez une tâche pour commencer',
      addDialogTitle: 'Ajouter une tâche',
      addDialogTitleLabel: 'Titre',
      addDialogDescriptionLabel: 'Notes',
      addDialogError: 'Champ requis',
      addDialogCancel: 'Annuler',
      addDialogOk: 'OK',
      snackAdded: 'Tâche ajoutée',
      snackClearedAll: 'Liste vidée',
      snackClearedDone: 'Tâches terminées supprimées',
      confirmClearAllMessage: 'Supprimer toutes les tâches ?',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      notImplemented: 'Non implémenté',
    },
    de: {
      title: 'Todo Liste',
      menuClearAll: 'Alle löschen',
      menuClearDone: 'Erledigte löschen',
      menuSettings: 'Einstellungen',
      menuAbout: 'Über',
      empty: 'Keine Aufgaben',
      emptySubtitle: 'Füge eine Aufgabe hinzu, um zu starten',
      addDialogTitle: 'Aufgabe hinzufügen',
      addDialogTitleLabel: 'Titel',
      addDialogDescriptionLabel: 'Notizen',
      addDialogError: 'Pflichtfeld',
      addDialogCancel: 'Abbrechen',
      addDialogOk: 'OK',
      snackAdded: 'Aufgabe hinzugefügt',
      snackClearedAll: 'Liste geleert',
      snackClearedDone: 'Erledigte entfernt',
      confirmClearAllMessage: 'Alle Aufgaben entfernen?',
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
      notImplemented: 'Nicht implementiert',
    },
  };

  openAddDialog() {
    const t = this.translations[this.lang()];
    const ref = this.dialog.open<AddItemDialogComponent, any, AddItemData>(AddItemDialogComponent, {
      width: '420px',
      data: {
        title: t.addDialogTitle,
        titleLabel: t.addDialogTitleLabel,
        descriptionLabel: t.addDialogDescriptionLabel,
        errorRequired: t.addDialogError,
        cancel: t.addDialogCancel,
        ok: t.addDialogOk,
      },
    });
    ref.afterClosed().subscribe(result => {
      if (!result) return;
      this.todo.add(result.title, result.description);
      this.snackBar.open(t.snackAdded, undefined, { duration: 2000 });
    });
  }

  toggle(id: Item['id']) {
    this.todo.toggle(id);
  }

  clearAll() {
    const t = this.translations[this.lang()];
    const ref = this.dialog.open<ConfirmDialogComponent, any, boolean>(ConfirmDialogComponent, {
      data: {
        title: t.confirm,
        message: t.confirmClearAllMessage,
        confirmLabel: t.confirm,
        cancelLabel: t.cancel,
      },
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.todo.clearAll();
        this.snackBar.open(t.snackClearedAll, undefined, { duration: 2000 });
      }
    });
  }

  clearDone() {
    this.todo.clearDone();
    const t = this.translations[this.lang()];
    this.snackBar.open(t.snackClearedDone, undefined, { duration: 2000 });
  }

  notImplemented(label: string) {
    const t = this.translations[this.lang()];
    this.snackBar.open(`${label}: ${t.notImplemented}`, undefined, { duration: 2000 });
  }

  setLang(code: 'en' | 'fr' | 'de') {
    this.lang.set(code);
  }

  t(key: keyof (typeof this.translations)['en']) {
    return this.translations[this.lang()][key];
  }
}
