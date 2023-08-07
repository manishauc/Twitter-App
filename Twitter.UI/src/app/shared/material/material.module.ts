import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{MatCardModule} from '@angular/material/card';
import{MatDialogModule} from '@angular/material/dialog'
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import{MatIconModule} from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

const modules:(any)[]=[
  MatIconModule,
  MatCardModule,
 MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatBadgeModule,
  MatMenuModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ...modules
  ],
  exports:[
    ...modules
  ]
})
export class MaterialModule { }
