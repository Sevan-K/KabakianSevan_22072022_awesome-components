import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [CommonModule],
  exports: [MatToolbarModule, MatCardModule, CommentsComponent],
})
export class SharedModule {}
