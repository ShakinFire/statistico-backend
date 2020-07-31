import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appStates } from './app.states';

@NgModule({
  imports: [RouterModule.forRoot(appStates)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
