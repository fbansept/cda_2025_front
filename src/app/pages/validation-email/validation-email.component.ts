import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {MatButtonModule} from '@angular/material/button';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-validation-email',
  imports: [
    MatButtonModule
  ],
  templateUrl: './validation-email.component.html',
  styleUrl: './validation-email.component.scss'
})
export class ValidationEmailComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute)
  http = inject(HttpClient)
  notification = inject(NotificationService)
  router = inject(Router)
  token?: string;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(parametres => {

        if (parametres['token']) {
          this.token = parametres['token']
        }
      })
  }

  onValidationInscription() {
    if (this.token) {
      this.http
        .post<{
          token: string,
          consentementUtilisationDonnees: boolean
        }>(environment.serverUrl + "validate-email", {token: this.token, consentementUtilisationDonnees: true})
        .subscribe({
          next: resultat => {
            this.notification.show("Votre inscription est finalisée, vous pouvez à présent vous connecter", "valid")
            this.router.navigateByUrl("/connexion")
          }
        })
    }
  }

}
