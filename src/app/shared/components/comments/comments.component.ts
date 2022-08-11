import {
    animate,
    animateChild,
    group,
    query,
    sequence,
    stagger,
    state,
    style,
    transition,
    trigger,
    useAnimation,
} from "@angular/animations";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Comment } from "src/app/core/models/comment.model";
import { flashAnimation } from "../../animations/flash.animation";
import { slideAndFadeAnimation } from "../../animations/slide-and-fade.animation";

@Component({
    selector: "app-comments",
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.scss"],
    animations: [
        trigger("list", [
            transition(":enter", [
                // asking for the element with the listItem trigger
                query("@listItem", [
                    // to shift the element on list
                    stagger(50, [animateChild()]),
                ]),
            ]),
        ]),
        trigger("listItem", [
            // ------- state change animation
            state(
                "default",
                style({
                    transform: "scale(1)",
                    "background-color": "white",
                    "z-index": 1,
                })
            ),
            state(
                "active",
                style({
                    transform: "scale(1.05)",
                    "background-color": "rgb(201,157,242)",
                    "z-index": 2,
                })
            ),
            transition("default => active", [animate("100ms ease-in-out")]),
            transition("active => default", [animate("500ms ease-in-out")]),
            // ------- animation from void
            // transition from void to all (void=>* or :enter), from all to void (void<=* or :leave)
            // transition on both way (void <=> *)
            transition(":enter", [
                query(".comment__text, .comment__date", style({ opacity: 0 })),
                useAnimation(slideAndFadeAnimation, {
                    params: {
                        slideTime: "250ms",
                        slideColor: "rgb(201,157,242)",
                    },
                }),
                // to launch animation in parallel
                group([
                    useAnimation(flashAnimation, {
                        params: {
                            flashTime: "250ms",
                            flashColor: "rgb(201,157,242)",
                        },
                    }),
                    query(".comment__text", [
                        animate("250ms", style({ opacity: 1 })),
                    ]),
                    query(".comment__date", [
                        animate("500ms", style({ opacity: 1 })),
                    ]),
                ]),
            ]),
        ]),
    ],
})
export class CommentsComponent implements OnInit {
    @Input() comments!: Comment[];
    @Output() newComment = new EventEmitter<string>();

    commentCtrl!: FormControl;

    // listItemAnimationState!: 'default' | 'active';

    animationsStates: { [key: number]: "default" | "active" } = {};

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.commentCtrl = this.formBuilder.control("", [
            Validators.required,
            Validators.minLength(10),
        ]);
        for (let comment of this.comments) {
            /* this.animationsStates = {
        ...this.animationsStates,
        [comment.id]: 'default',
      }; */
            this.animationsStates[comment.id] = "default";
        }
        // console.log(this.animationsStates);
    }

    onLeaveComment() {
        if (this.commentCtrl.invalid) {
            return;
        }
        const maxId = Math.max(...this.comments.map((comment) => comment.id));
        /*     const commentIds = this.comments.map((comment) => comment.id);
    const maxId2 = commentIds.reduce(
      (accumulator, currentValue) =>
        currentValue > accumulator ? currentValue : accumulator,
      0
    ); */

        this.comments.unshift({
            id: maxId + 1,
            comment: this.commentCtrl.value,
            createdDate: new Date().toISOString(),
            userId: 1,
        });

        this.newComment.emit(this.commentCtrl.value);
        this.commentCtrl.reset();
    }

    onLitsttemMouseEnter(commentId: number) {
        this.animationsStates[commentId] = "active";
        // console.log(commentId);
    }

    onLitsttemMouseLeave(commentId: number) {
        this.animationsStates[commentId] = "default";
        // console.log(commentId);
    }
}
