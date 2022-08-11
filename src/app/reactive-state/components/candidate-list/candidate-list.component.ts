import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Candidate } from "../../models/candidate.model";
import { CandidateService } from "../../services/candidate.service";

@Component({
    selector: "app-candidate-list",
    templateUrl: "./candidate-list.component.html",
    styleUrls: ["./candidate-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // 3 cases to launch change detection : input new ref, event (on component or one of its child), manual change detection request
})
export class CandidateListComponent implements OnInit {
    // local observable
    loading$!: Observable<boolean>;
    candidates$!: Observable<Candidate[]>;

    constructor(private candidateService: CandidateService) {}

    ngOnInit(): void {
        this.initObervable();
        this.candidateService.getCandidatesFromServer();
    }

    private initObervable() {
        this.loading$ = this.candidateService.loading$;
        this.candidates$ = this.candidateService.candidates$;
    }
}
