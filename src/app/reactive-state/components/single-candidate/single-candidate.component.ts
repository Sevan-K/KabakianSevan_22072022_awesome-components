import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError, filter, map, Observable } from "rxjs";
import { Candidate } from "../../models/candidate.model";
import { CandidateService } from "../../services/candidate.service";

@Component({
    selector: "app-single-candidate",
    templateUrl: "./single-candidate.component.html",
    styleUrls: ["./single-candidate.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
    // loacl observables
    loading$!: Observable<boolean>;
    candidate$!: Observable<Candidate | undefined>;

    constructor(
        private route: ActivatedRoute,
        private candidateService: CandidateService
    ) {}

    ngOnInit(): void {}

    initObservables() {
        // init loading
        this.loading$ = this.candidateService.loading$;
        // init candidate
        const candidateId = +this.route.snapshot.params["id"];
        console.log(candidateId);

        this.candidate$ = this.candidateService.getCandidateByID(candidateId);
    }

    // method to handle click on hire
    onHire() {}

    // method to handle click on Refuse
    onRefuse() {}

    // method to handle click on GoBack
    onGoBack() {}
}
