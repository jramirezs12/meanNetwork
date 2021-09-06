import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  savePost(post: any) {
    return this._http.post<any>(this.env + 'board/savePost', post);
  }

  listPost() {
    return this._http.get<any>(this.env + 'board/listPost');
  }

  updatePost(post: any) {
    return this._http.put<any>(this.env + 'board/updatePost', post);
  }

  deletePost(post: any) {
    return this._http.delete<any>(this.env + 'board/deletePost/' + post._id);
  }

  savePostImg(post: any) {
    return this._http.post<any>(this.env + 'board/savePostImg', post);
  }

}
