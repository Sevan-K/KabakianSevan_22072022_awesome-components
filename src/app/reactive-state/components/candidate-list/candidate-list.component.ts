import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { combineLatest, map, Observable, startWith } from "rxjs";
import { CandidateSearchType } from "../../enums/candidate-search-type.enum";
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
    // research controls
    searchCtrl!: FormControl;
    searchTypeCtrl!: FormControl;
    // arrar of option
    searchTypeOptions!: { value: CandidateSearchType; label: string }[];
    // obersable to get formCtrl values
    // search$!: Observable<string>;
    // searchType$!: Observable<string>;

    constructor(
        private candidateService: CandidateService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForms();
        this.initObervable();
        this.candidateService.getCandidatesFromServer();
    }

    private initObervable() {
        this.loading$ = this.candidateService.loading$;
        // form related observable
        const search$ = this.searchCtrl.valueChanges.pipe(
            // start with for the first search
            startWith(this.searchCtrl.value),
            // values will be compared in lower case
            map((value) => value.toLowerCase())
        );
        const searchType$: Observable<CandidateSearchType> =
            this.searchTypeCtrl.valueChanges.pipe(
                startWith(this.searchTypeCtrl.value)
            );
        // combineLatest is an operator to create observable
        //  a tupple is emmited each time one of the source observable emmit
        // À chaque émission de l'un de ses Observables enfants,  combineLatest  émet les dernières émissions de tous ses enfants sous forme de tuple – à condition que tous les enfants aient émis au moins une fois !
        this.candidates$ = combineLatest([
            search$,
            searchType$,
            this.candidateService.candidates$,
        ]).pipe(
            map(([search, searchType, candidates]) =>
                candidates.filter((candidate) =>
                    candidate[searchType]
                        .toLowerCase()
                        .includes(search as string)
                )
            )
        );
    }

    // pivate method to init forms control
    private initForms() {
        this.searchCtrl = this.formBuilder.control("");
        this.searchTypeCtrl = this.formBuilder.control(
            CandidateSearchType.LASTNAME
        );
        this.searchTypeOptions = [
            { value: CandidateSearchType.LASTNAME, label: "Nom" },
            { value: CandidateSearchType.FIRSTNAME, label: "Prénom" },
            { value: CandidateSearchType.COMPANY, label: "Entreprise" },
        ];
    }
}
