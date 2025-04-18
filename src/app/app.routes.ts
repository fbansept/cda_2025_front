import {Routes} from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {ConnexionComponent} from './pages/connexion/connexion.component';
import {Page404Component} from './pages/page404/page404.component';
import {EditProduitComponent} from './pages/edit-produit/edit-produit.component';
import {connecteGuard} from './services/connecte.guard';

export const routes: Routes = [
  {path: "accueil", component: AccueilComponent, canActivate: [connecteGuard]},
  {path: "connexion", component: ConnexionComponent},
  {path: "ajout-produit", component: EditProduitComponent, canActivate: [connecteGuard]},
  {path: "modifier-produit/:id", component: EditProduitComponent, canActivate: [connecteGuard]},
  {path: "", redirectTo: "accueil", pathMatch: "full"},
  {path: "**", component: Page404Component},
];
