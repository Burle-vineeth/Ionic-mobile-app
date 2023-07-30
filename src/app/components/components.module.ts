import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupCallCardComponent } from './pickup-call-card/pickup-call-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    PickupCallCardComponent,
    ErrorMessageComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    PickupCallCardComponent,
    ErrorMessageComponent,
    LoaderComponent,
  ]
})
export class ComponentsModule { }
