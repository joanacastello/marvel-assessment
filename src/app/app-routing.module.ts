import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';

const routes: Routes = [
  { path: 'home', title: 'Marvel Characters / Home', component: CharacterGridComponent },
  { path: 'character/:id', title: 'Marvel Characters / Detail', component: CharacterDetailComponent },
  { path: '',  title: 'Home', component: CharacterGridComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
