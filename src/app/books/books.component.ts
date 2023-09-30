import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../interfaces/Book';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  notFound: boolean = false;

  failed: boolean = false;
  errorCode: string = '';
  errorName: string = '';

  constructor(
    private bookService: BookService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.searchInput$.subscribe((search) => {
      if (search.trim().length > 0) {
        this.bookService.searchForBooks(search).subscribe({
          next: (response: Book[]) => {
            this.books = response;

            this.books.length === 0
              ? (this.notFound = true)
              : (this.notFound = false);

            this.failed = false;

            console.log(this.books);
          },
          error: (responseError) => {
            console.error('Get error: ', responseError);
            this.failed = true;
            this.errorCode = responseError.status;
            this.errorName = responseError.error.error;
          },
        });
      }
    });
  }
}
