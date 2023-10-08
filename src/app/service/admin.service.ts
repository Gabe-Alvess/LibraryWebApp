import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = `http://localhost:8080/book`;
  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/adm/add`, book);
  }

  addBooks(books: Book[]): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/adm/multiAdd`, books);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/adm/update?id=${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/adm/delete?id=${id}`);
  }
}