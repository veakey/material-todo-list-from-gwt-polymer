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
import { SettingsDialogComponent } from './components/settings-dialog.component';
import { AboutDialogComponent } from './components/about-dialog.component';

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
    AddItemDialogComponent,
    ConfirmDialogComponent,
    SettingsDialogComponent,
    AboutDialogComponent,
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
        | 'settingsTitle'
        | 'settingsIntro'
        | 'settingsComingSoon'
        | 'settingsClose'
        | 'aboutTitle'
        | 'aboutIntro'
        | 'aboutLibsTitle'
        | 'aboutLicenseTitle'
        | 'aboutLicenseValue'
        | 'aboutClose'
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
      settingsTitle: 'Settings',
      settingsIntro: 'Fine-tune the app to your preferences.',
      settingsComingSoon: 'More options will be added soon.',
      settingsClose: 'Close',
      aboutTitle: 'About',
      aboutIntro: 'Lightweight todo list using Angular & Angular Material.',
      aboutLibsTitle: 'Libraries',
      aboutLicenseTitle: 'License',
      aboutLicenseValue: 'MIT License (see LICENSE file)',
      aboutClose: 'Close',
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
      settingsTitle: 'Paramètres',
      settingsIntro: 'Ajustez les préférences de l’application.',
      settingsComingSoon: 'Davantage d’options arrivent bientôt.',
      settingsClose: 'Fermer',
      aboutTitle: 'À propos',
      aboutIntro: 'Liste de tâches légère avec Angular & Angular Material.',
      aboutLibsTitle: 'Bibliothèques',
      aboutLicenseTitle: 'Licence',
      aboutLicenseValue: 'Licence MIT (voir le fichier LICENSE)',
      aboutClose: 'Fermer',
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
      settingsTitle: 'Einstellungen',
      settingsIntro: 'Passen Sie die App an Ihre Vorlieben an.',
      settingsComingSoon: 'Weitere Optionen folgen bald.',
      settingsClose: 'Schließen',
      aboutTitle: 'Über',
      aboutIntro: 'Leichte To-do-Liste mit Angular & Angular Material.',
      aboutLibsTitle: 'Bibliotheken',
      aboutLicenseTitle: 'Lizenz',
      aboutLicenseValue: 'MIT-Lizenz (siehe LICENSE)',
      aboutClose: 'Schließen',
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

  openSettingsDialog() {
    const t = this.translations[this.lang()];
    this.dialog.open(SettingsDialogComponent, {
      width: '420px',
      data: {
        title: t.settingsTitle,
        intro: t.settingsIntro,
        comingSoon: t.settingsComingSoon,
        closeLabel: t.settingsClose,
      },
    });
  }

  openAboutDialog() {
    const t = this.translations[this.lang()];
    this.dialog.open(AboutDialogComponent, {
      width: '480px',
      data: {
        title: t.aboutTitle,
        intro: t.aboutIntro,
        libsTitle: t.aboutLibsTitle,
        libs: [
          { name: 'Angular', version: '^21.0.0' },
          { name: 'Angular Material', version: '^21.0.3' },
          { name: 'RxJS', version: '~7.8.0' },
        ],
        licenseTitle: t.aboutLicenseTitle,
        licenseValue: t.aboutLicenseValue,
        closeLabel: t.aboutClose,
      },
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
