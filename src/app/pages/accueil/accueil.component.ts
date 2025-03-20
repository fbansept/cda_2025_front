import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-accueil',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  http = inject(HttpClient)
  produits: any = []

  ngOnInit() {
    this.http.get("http://localhost:8080/produits")
      .subscribe(produits => this.produits = produits)
  }

}
