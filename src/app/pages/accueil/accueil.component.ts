import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ProduitService} from '../../services/crud/produit.service';


@Component({
  selector: 'app-accueil',
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterLink,
    NgStyle
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {

  auth = inject(AuthService)
  produitService = inject(ProduitService)
  produits: Produit[] = [];

  ngOnInit() {
    this.produitService.getAll()

    this.produitService.produits$.subscribe(
      produits => this.produits = produits)
  }
}
