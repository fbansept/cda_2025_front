import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {NotificationService} from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  http = inject(HttpClient)
  notification = inject(NotificationService)
  readonly produits$ = new BehaviorSubject<Produit[]>([])

  getAll() {
    this.http.get<Produit[]>("http://localhost:8080/produits")
      .subscribe(produits => this.produits$.next(produits))
  }

  save(produit: any) {
    return this.http.post("http://localhost:8080/produit", produit).pipe(
      tap(() => this.getAll()),
      catchError(error => {
        // Handle the error if needed
        return throwError(error);
      })
    );
  }

  update(id: number, produit: any) {

    return this.http.put("http://localhost:8080/produit/" + id, produit).pipe(
      tap(() => this.getAll()),
      catchError(error => {
        // Handle the error if needed
        return throwError(error);
      })
    );
  }
}
