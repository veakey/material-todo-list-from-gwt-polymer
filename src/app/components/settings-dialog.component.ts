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
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  protected readonly data = inject<SettingsData>(MAT_DIALOG_DATA);
}


