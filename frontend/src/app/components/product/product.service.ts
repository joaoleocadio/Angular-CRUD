import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from 'rxjs';
import { Produto } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', { duration: 3000, horizontalPosition: "right", verticalPosition: "top", panelClass: isError ? ['msg-error'] : ['msg-sucess']})
  }

  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseUrl, produto).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

  read(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  readByID(id: string): Observable<Produto> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Produto>(url)

  }

  update(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/${produto.id}`
    return this.http.put<Produto>(url, produto)
  }

  delete(id: string): Observable<Produto> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Produto>(url)
  }
}
