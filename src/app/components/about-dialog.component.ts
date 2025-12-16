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
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <div mat-dialog-content class="about-content">
      <p class="intro">{{ data.intro }}</p>

      <div class="section" *ngIf="data.libs?.length">
        <div class="section-title">{{ data.libsTitle }}</div>
        <ul>
          <li *ngFor="let lib of data.libs">
            <strong>{{ lib.name }}</strong>
            <span class="version">{{ lib.version }}</span>
          </li>
        </ul>
      </div>

      <div class="section">
        <div class="section-title">{{ data.licenseTitle }}</div>
        <div class="license">{{ data.licenseValue }}</div>
      </div>
    </div>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>{{ data.closeLabel }}</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .about-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 4px;
      }

      .intro {
        margin: 0;
      }

      .section {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .section-title {
        font-weight: 600;
        color: #3f51b5;
      }

      ul {
        margin: 0;
        padding-left: 18px;
      }

      li {
        display: flex;
        gap: 8px;
        align-items: baseline;
      }

      .version {
        color: #666;
        font-size: 13px;
      }

      .license {
        color: #444;
      }
    `,
  ],
})
export class AboutDialogComponent {
  protected readonly data = inject<AboutData>(MAT_DIALOG_DATA);
}


