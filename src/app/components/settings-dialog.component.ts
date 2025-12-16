import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface SettingsData {
  title: string;
  intro: string;
  comingSoon: string;
  closeLabel: string;
}

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <div mat-dialog-content class="settings-content">
      <p class="intro">{{ data.intro }}</p>
      <p class="coming">{{ data.comingSoon }}</p>
    </div>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>{{ data.closeLabel }}</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .settings-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 4px;
      }

      .intro {
        margin: 0;
      }

      .coming {
        margin: 0;
        color: #555;
      }
    `,
  ],
})
export class SettingsDialogComponent {
  protected readonly data = inject<SettingsData>(MAT_DIALOG_DATA);
}


