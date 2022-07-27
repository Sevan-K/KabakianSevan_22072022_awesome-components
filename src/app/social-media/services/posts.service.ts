import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewCommentOnPost } from '../models/newCommentOnPost.model';
import { Post } from '../models/post.model';

// on provideIn pas in root car le module est en lazy loading
@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  // get post method to return an observable with an array of post
  getPosts(): Observable<Post[]> {
    // an env variable is used for the
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  // method to add comment
  addNewComment(newCommentOnPost: NewCommentOnPost) {
    console.log(
      newCommentOnPost.comment,
      ', sur le post : ',
      newCommentOnPost.postId
    );
  }
}
