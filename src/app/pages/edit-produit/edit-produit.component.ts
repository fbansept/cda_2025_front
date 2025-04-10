import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-edit-produit',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss'
})
export class EditProduitComponent implements OnInit {

  formBuilder = inject(FormBuilder)
  http = inject(HttpClient)
  activatedRoute = inject(ActivatedRoute)
  notification = inject(NotificationService)


  formulaire = this.formBuilder.group({
    nom: ["Nouveau produit", [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    code: ["7777", [Validators.required]],
    description: ["une description", []],
    prix: [99.99, [Validators.required, Validators.min(0.1)]],
    etat: [{id: 1}],
    etiquettes: [[] as Etiquette[]],
  })

  etats: Etat[] = []
  etiquettes: Etiquette[] = []
  produitEdite: Produit | null = null

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(parametres => {

        //si c'est une edition
        if (parametres['id']) {
          this.http
            .get<Produit>(`http://localhost:8080/produit/` + parametres['id'])
            .subscribe(produit => {
              this.formulaire.patchValue(produit)
              this.produitEdite = produit
            })
        }
      })

    this.http
      .get<Etat[]>("http://localhost:8080/etats")
      .subscribe(etats => this.etats = etats)

    this.http
      .get<Etiquette[]>("http://localhost:8080/etiquettes")
      .subscribe(etiquettes => this.etiquettes = etiquettes)
  }

  onAjoutProduit() {

    if (this.formulaire.valid) {

      if (this.produitEdite) {

        this.http
          .put("http://localhost:8080/produit/" + this.produitEdite.id, this.formulaire.value)
          .subscribe(resultat => {
            this.notification.show("Le produit a bien été modifié", "valid")
          })

      } else {

        this.http
          .post("http://localhost:8080/produit", this.formulaire.value)
          .subscribe(resultat => {
            this.notification.show("Le produit a bien été ajouté", "valid")
          })
      }
    }
  }

  compareId(o1: { id: number }, o2: { id: number }) {

    return o1.id === o2.id

  }

}
