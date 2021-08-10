import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// dynamic form builder

import { DynamicFormBuilderModule } from './dynamic-form-builder/dynamic-form-builder.module';

import {} from './';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ScriptService } from './script.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
    HttpClientModule
  ],
  declarations: [AppComponent, HelloComponent],
  providers: [ConfigService, ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule {}
