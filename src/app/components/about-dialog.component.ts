import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

export interface AboutLib {
  name: string;
  version: string;
}

export interface AboutData {
  title: string;
  intro: string;
  libsTitle: string;
  libs: AboutLib[];
  licenseTitle: string;
  licenseValue: string;
  closeLabel: string;
}

@Component({
  selector: 'app-about-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf, NgFor],
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss'],
})
export class AboutDialogComponent {
  protected readonly data = inject<AboutData>(MAT_DIALOG_DATA);
}


