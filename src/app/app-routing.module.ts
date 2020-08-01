import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main//main.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{ path: 'main', component: MainComponent},
                        { path: '', redirectTo: '/main', pathMatch: 'full' },
                        { path: '**', component: NotFoundComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
