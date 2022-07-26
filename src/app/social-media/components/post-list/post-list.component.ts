import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  // observable to get data from the resolver
  posts$!: Observable<Post[]>;

  // the resolver is available through the activated route
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // resolver data are recovered
    this.posts$ = this.route.data.pipe(map((data) => data['posts']));
  }
}
