import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface AddItemData {
  title: string;
  description: string;
}

export interface AddItemDialogLabels {
  title: string;
  titleLabel: string;
  descriptionLabel: string;
  errorRequired: string;
  cancel: string;
  ok: string;
}

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ labels.title }}</h2>
    <form [formGroup]="form" (ngSubmit)="submit()" class="dialog-form-add-todo" mat-dialog-content>
      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ labels.titleLabel }}</mat-label>
        <input matInput formControlName="title" required />
        <mat-error *ngIf="form.controls.title.hasError('required')">{{ labels.errorRequired }}</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ labels.descriptionLabel }}</mat-label>
        <textarea matInput formControlName="description" rows="3"></textarea>
      </mat-form-field>
    </form>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>{{ labels.cancel }}</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="submit()">{{ labels.ok }}</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .dialog-form-add-todo {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 8px!important;
      }
      .full {
        width: 100%;
      }
    `,
  ],
})
export class AddItemDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AddItemDialogComponent, AddItemData | undefined>);
  private readonly data = inject<AddItemDialogLabels>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  readonly labels = this.data;
  readonly form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  submit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.getRawValue() as AddItemData);
  }
}

