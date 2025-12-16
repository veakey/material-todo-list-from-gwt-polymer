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
import { SupportedLang, TranslationKey, translations } from './i18n/translations';

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
  readonly lang = signal<SupportedLang>('en');

  openAddDialog() {
    const t = translations[this.lang()];
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
    const t = translations[this.lang()];
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
    const t = translations[this.lang()];
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
    const t = translations[this.lang()];
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
    const t = translations[this.lang()];
    this.snackBar.open(t.snackClearedDone, undefined, { duration: 2000 });
  }

  seedSample() {
    const t = translations[this.lang()];
    this.todo.seedSample();
    this.snackBar.open(t.seedAdded, undefined, { duration: 2000 });
  }

  notImplemented(label: string) {
    const t = translations[this.lang()];
    this.snackBar.open(`${label}: ${t.notImplemented}`, undefined, { duration: 2000 });
  }

  setLang(code: SupportedLang) {
    this.lang.set(code);
  }

  t(key: TranslationKey) {
    return translations[this.lang()][key];
  }
}
