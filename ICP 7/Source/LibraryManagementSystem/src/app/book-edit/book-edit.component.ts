import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookEditForm: FormGroup;
  // isbn: string = '';
  // title: string = '';
  // description: string = '';
  // author: string = '';
  // publisher: string = '';
  // published_year: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
    this.bookEditForm = this.formBuilder.group({
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      'publisher': [null, Validators.required],
      'published_year': [null, Validators.required]
    });
  }

  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log('Edit page ################',data);
        // this.book = data;
        this.editBook(data);
      });
  }

  editBook(book) {
    this.bookEditForm.setValue({
      isbn: book.isbn,
      title: book.title,
      description: book.description,
      author: book.author,
      publisher: book.publisher,
      published_year: book.published_year
    })
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.route.snapshot.params['id'], form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

}
