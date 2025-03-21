import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss'
})
export class EditProduitComponent {

  formBuilder = inject(FormBuilder)

  formulaire = this.formBuilder.group({
    nom: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
    code: ["", [Validators.required]],
    description: ["", []],
    prix: [0, [Validators.required, Validators.min(0.1)]],
  })

  onAjoutProduit() {

    if (this.formulaire.valid) {
      console.log(this.formulaire.value)
    }

  }

}
