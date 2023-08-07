import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import{MatBadgeModule} from '@angular/material/badge';
import{MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class HomeModule { }
