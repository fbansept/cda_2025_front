import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

  formBuilder = inject(FormBuilder)
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  auth = inject(AuthService)

  formulaire = this.formBuilder.group({
    email: ["a@a.com", [Validators.required, Validators.email]],
    password: ["root", [Validators.required]],
  })

  onConnexion() {
    if (this.formulaire.valid) {

      this.http
        .post(
          "http://localhost:8080/connexion",
          this.formulaire.value,
          {responseType: "text"})
        .subscribe({
          next: jwt => {
            this.router.navigateByUrl("/accueil")
            this.auth.decodeJwt(jwt)
          },
          error: erreur => {
            if (erreur.status === 401) {
              this.notification.show("Mauvais login / mot de passe", "error")
            }
          }
        })
    }
  }

}
