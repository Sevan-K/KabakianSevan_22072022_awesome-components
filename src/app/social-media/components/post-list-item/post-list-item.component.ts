import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewCommentOnPost } from '../../models/newCommentOnPost.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
})
export class PostListItemComponent implements OnInit {
  // to get post from the smart component
  @Input() post!: Post;

  @Output() newCommentOnPost = new EventEmitter<NewCommentOnPost>();

  constructor() {}

  ngOnInit(): void {}

  onNewComment(newComment: string): void {
    console.log(newComment);
    this.newCommentOnPost.emit({ postId: this.post.id, comment: newComment });
  }
}
