import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/environments/environment';
import { Categories } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URI = API_URI.url;
  constructor(private http: HttpClient) { }

  getCategories(token: any) {
    let headers = new HttpHeaders({ 'x-token': token });
    return this.http.get(`${this.API_URI}/categories/list`, { 'headers': headers });
  }

  getCategory(token: any, id: string) {
    let headers = new HttpHeaders({ 'x-token': token });
    return this.http.get(`${this.API_URI}/categories/getOne/${id}`, { 'headers': headers });
  }

  saveCategory(category: Categories) {
    return this.http.post(`${this.API_URI}/categories/create`, category);
  }

  updateCategory(category: Categories, id: string) {
    return this.http.put(`${this.API_URI}/categories/update/${id}`, category)
  }

  deleteCategory(token: any, id: string) {
    let headers = new HttpHeaders({ 'x-token': token });
    return this.http.delete(`${this.API_URI}/categories/delete/${id}`, { 'headers': headers });
  }
}
