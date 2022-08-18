import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, switchMap, take, tap } from "rxjs";
import { Candidate } from "../../models/candidate.model";
import { CandidateService } from "../../services/candidate.service";

@Component({
    selector: "app-single-candidate",
    templateUrl: "./single-candidate.component.html",
    styleUrls: ["./single-candidate.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
    // local observables to get service data
    loading$!: Observable<boolean>;
    candidate$!: Observable<Candidate | undefined>;

    constructor(
        private route: ActivatedRoute,
        private candidateService: CandidateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initObservables();
    }

    // private method to init observable
    private initObservables() {
        // init loading
        this.loading$ = this.candidateService.loading$;
        // init candidate
        // const candidateId = +this.route.snapshot.params["id"];
        // this.candidate$ = this.candidateService.getCandidateById(candidateId);
        this.candidate$ = this.route.params.pipe(
            switchMap((params) =>
                this.candidateService.getCandidateById(+params["id"])
            )
        );
    }

    // method to handle click on hire
    onHire() {
        this.candidate$
            .pipe(
                take(1),
                tap((candidate) => {
                    if (candidate) {
                        this.candidateService.hireCandidate(candidate.id);
                    }
                    this.onGoBack();
                })
            )
            .subscribe();
    }

    // method to handle click on Refuse
    onRefuse() {
        // const candidateId = +this.route.snapshot.params["id"];
        // this.candidateService.refuseCandidate(candidateId);
        this.candidate$
            .pipe(
                take(1),
                tap((candidate) => {
                    if (candidate) {
                        this.candidateService.refuseCandidate(candidate.id);
                    }
                    this.onGoBack();
                })
            )
            .subscribe();
    }

    // method to handle click on GoBack
    onGoBack() {
        this.router.navigateByUrl("/reactive-state/candidates");
    }
}
