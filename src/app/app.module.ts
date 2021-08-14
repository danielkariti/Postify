
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule }        from './app-routing.module';
import { AuthInterceptor }         from './interceptors/auth-interceptor';
import { ErrorInterceptor }        from './interceptors/error-interceptor';
import { ReactiveFormsModule,
         FormsModule }             from '@angular/forms';
import { HttpClientModule,
         HTTP_INTERCEPTORS }       from '@angular/common/http';
import { NgModule,
         CUSTOM_ELEMENTS_SCHEMA}   from '@angular/core';

// ANGULAR COMPONENTS IMPORTS
import { AppComponent }         from './app.component';
import { PostCreateComponent }  from './components/posts/post-create/post-create.component';
import { PostListComponent}     from './components/posts/post-list/post-list.component'
import { HeaderComponent }      from './components/header/header.component';
import { LoginComponent }       from './components/auth/login/login.component';
import { RegisterComponent }    from './components/auth/register/register.component';
import { ErrorComponent }       from './components/error/error.component';

// MATERIAL ANGULAR IMPORTS
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

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports:[
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide : HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
