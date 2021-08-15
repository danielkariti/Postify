
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule }        from './app-routing.module';
import { AuthInterceptor }         from './interceptors/auth-interceptor';
import { ErrorInterceptor }        from './interceptors/error-interceptor';
import { HttpClientModule,
         HTTP_INTERCEPTORS }       from '@angular/common/http';
import { NgModule,
         CUSTOM_ELEMENTS_SCHEMA}   from '@angular/core';

// ANGULAR COMPONENTS IMPORTS
import { AppComponent }         from './app.component';
import { HeaderComponent }      from './components/header/header.component';
import { ErrorComponent }       from './components/error/error.component';
import {AngularMaterialModule}  from './modules/angular-material.module'
import {PostsModule}            from './modules/posts.module'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PostsModule,
  ],
  exports:[
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide : HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
