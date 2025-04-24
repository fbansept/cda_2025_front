import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-liste-produit',
  imports: [MatTableModule],
  templateUrl: './liste-produit.component.html',
  styleUrl: './liste-produit.component.scss'
})
export class ListeProduitComponent implements OnInit {

  http = inject(HttpClient)

  produits: Produit[] = [];
  displayedColumns = [
    "nom", "code", "prix", "description", "createur"]

  ngOnInit() {
    this.http
      .get<Produit[]>("http://localhost:8080/produits")
      .subscribe(produits =>
        this.produits = produits)
  }

}
