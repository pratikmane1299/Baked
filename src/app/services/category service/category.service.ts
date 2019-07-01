import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../category';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {

  category:ICategory[];

  readAllCategoriesURL = "api/read-categories"; 

  constructor(private http: HttpClient) {
  }

  getAllCategories(){
    return this.http.get(this.readAllCategoriesURL);
  }
}
