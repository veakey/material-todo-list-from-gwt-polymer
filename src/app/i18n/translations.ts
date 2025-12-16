export type SupportedLang = 'en' | 'fr' | 'de';

export type TranslationKey =
  | 'title'
  | 'menuClearAll'
  | 'menuClearDone'
  | 'menuSettings'
  | 'menuAbout'
  | 'menuSeedSample'
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
  | 'seedAdded'
  | 'snackClearedAll'
  | 'snackClearedDone'
  | 'confirmClearAllMessage'
  | 'confirm'
  | 'cancel'
  | 'notImplemented';

export type Translations = {
  [L in SupportedLang]: { [K in TranslationKey]: string };
};

export const translations: Translations = {
  en: {
    title: 'Todo List',
    menuClearAll: 'Clear All',
    menuClearDone: 'Clear Done',
    menuSettings: 'Settings',
    menuAbout: 'About',
    menuSeedSample: 'Populate sample todos',
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
    seedAdded: 'Sample tasks added',
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
    menuSeedSample: 'Peupler avec des tâches de démonstration',
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
    seedAdded: 'Tâches de démonstration ajoutées',
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
    menuSeedSample: 'Beispielaufgaben befüllen',
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
    seedAdded: 'Beispielaufgaben hinzugefügt',
    snackClearedAll: 'Liste geleert',
    snackClearedDone: 'Erledigte entfernt',
    confirmClearAllMessage: 'Alle Aufgaben entfernen?',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    notImplemented: 'Nicht implementiert',
  },
};


