import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {ProduitService} from '../../services/crud/produit.service';
import {FileChooserComponent} from '../../components/file-chooser/file-chooser.component';

@Component({
  selector: 'app-edit-produit',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    FileChooserComponent
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss'
})
export class EditProduitComponent implements OnInit {

  formBuilder = inject(FormBuilder)
  http = inject(HttpClient)
  activatedRoute = inject(ActivatedRoute)
  notification = inject(NotificationService)
  router = inject(Router)
  produitService = inject(ProduitService)
  photo: File | null = null;


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
        this.produitService
          .update(this.produitEdite.id, this.formulaire.value)
          .subscribe({
            next: () => this.notification.show("Le produit a bien été modifié", "valid"),
            error: () => this.notification.show("Problème de communication", "error"),
          })
      } else {

        const formData = new FormData();

        formData.set("produit", new Blob([JSON.stringify(this.formulaire.value)], {type: 'application/json'}));

        if (this.photo) {
          formData.set("photo", this.photo)
        }

        this.http
          .post("http://localhost:8080/produit", formData)
          .subscribe(produit => console.log("OK"))


        // this.produitService
        //   .save(this.formulaire.value)
        //   .subscribe({
        //     next: () => this.notification.show("Le produit a bien été ajouté", "valid"),
        //     error: () => this.notification.show("Problème de communication", "error"),
        //   })


      }

      this.router.navigateByUrl("/accueil")
    }
  }

  compareId(o1: { id: number }, o2: { id: number }) {
    return o1.id === o2.id
  }

  onPhotoSelectionne(fichier: File | null) {
    this.photo = fichier
  }

}
