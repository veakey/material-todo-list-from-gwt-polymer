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
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
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

