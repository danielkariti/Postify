import { NgModule } from "@angular/core";
import {MatInputModule}           from '@angular/material/input';
import {MatCardModule}            from '@angular/material/card';
import {MatButtonModule}          from '@angular/material/button';
import {MatToolbarModule}         from '@angular/material/toolbar';
import {MatIconModule}            from '@angular/material/icon';
import {MatExpansionModule}       from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule}       from '@angular/material/paginator';
import {MatDialogModule}          from '@angular/material/dialog';
import {MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatSlideToggleModule}     from '@angular/material/slide-toggle';
import {MatMenuModule}            from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AngularMaterialModule{}
