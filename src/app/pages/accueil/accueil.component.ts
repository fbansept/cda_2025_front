import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';


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

  http = inject(HttpClient)
  produits: Produit[] = []
  auth = inject(AuthService)

  ngOnInit() {

    this.http.get<Produit[]>("http://localhost:8080/produits")
      .subscribe(produits => this.produits = produits)

  }

}
