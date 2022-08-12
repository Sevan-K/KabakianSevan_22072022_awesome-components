import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, filter, map, Observable, switchMap, tap } from "rxjs";
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
    // research controls

    constructor(
        private route: ActivatedRoute,
        private candidateService: CandidateService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initObservables();
    }

    initObservables() {
        // init loading
        this.loading$ = this.candidateService.loading$;
        // init candidate
        // const candidateId = +this.route.snapshot.params["id"];
        this.candidate$ = this.route.params.pipe(
            switchMap((params) =>
                this.candidateService.getCandidateById(+params["id"])
            )
        );
    }

    // method to handle click on hire
    onHire() {}

    // method to handle click on Refuse
    onRefuse() {}

    // method to handle click on GoBack
    onGoBack() {
        this.router.navigateByUrl("/reactive-state/candidates");
    }
}
