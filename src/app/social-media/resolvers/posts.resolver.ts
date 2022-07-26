import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/posts.service';

// injectable decorator is need for a resolver
@Injectable()

//  aresolver is a class
export class PostsResolver implements Resolve<Post[]> {
  constructor(private postsService: PostService) {}

  // resolve method is needed
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post[]> {
    return this.postsService.getPosts();
  }
}
