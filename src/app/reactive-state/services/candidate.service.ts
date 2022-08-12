import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    BehaviorSubject,
    catchError,
    delay,
    filter,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
} from "rxjs";
import { environment } from "src/environments/environment";
import { Candidate } from "../models/candidate.model";

@Injectable()
export class CandidateService {
    constructor(private http: HttpClient) {}
    // behavior subject : emmit again its last emmision when subscribed

    // private variable
    private _loading$ = new BehaviorSubject<boolean>(false); // boolean behavior subject withfalse as default value
    // getter creation
    public get loading$(): Observable<boolean> {
        // return the behavior subject as an observable
        return this._loading$.asObservable();
    }
    // private variable for candidates list
    private _candidates$ = new BehaviorSubject<Candidate[]>([]);
    // getter creation for candidates list
    public get candidates$(): Observable<Candidate[]> {
        return this._candidates$.asObservable();
    }

    private setLoadingStatus(loading: boolean) {
        // by calling the next on the behavior subject all component using the observable will recieve the last value
        this._loading$.next(loading);
    }

    private lastCandidatesLoad = 0;

    // with reactive state managment, the method is called here and does not emmit an observable
    getCandidatesFromServer() {
        // if actual date is less than 5 minutes from lats load
        if (Date.now() - this.lastCandidatesLoad <= 300000) {
            return;
        }
        this.setLoadingStatus(true);
        this.http
            .get<Candidate[]>(`${environment.apiUrl}/candidates`)
            .pipe(
                delay(1000),
                tap((candidates) => {
                    this.lastCandidatesLoad = Date.now();
                    this._candidates$.next(candidates);
                    this.setLoadingStatus(false);
                })
            )
            .subscribe();
    }

    // get a single candidate using ist id
    getCandidateById(id: number): Observable<Candidate> {
        if (this.lastCandidatesLoad === 0) {
            this.getCandidatesFromServer();
        }
        return this.candidates$.pipe(
            map(
                (candidates) =>
                    candidates.filter((candidate) => candidate.id === id)[0]
            )
        );
    }

    // method to refuse a candidate and remove it from the list
    refuseCandidate(id: number): void {
        this.setLoadingStatus(true);
        this.http
            .delete(`${environment.apiUrl}/candidates/${id}`)
            .pipe(
                delay(1000),
                switchMap(() => this.candidates$),
                // to subscribe only to the ponctual value of candidates$
                take(1),
                map((candidates) =>
                    candidates.filter((candidate) => candidate.id !== id)
                ),
                tap((candidates) => {
                    // dispatch the chancge to the behavior subject to inform components
                    this._candidates$.next(candidates);
                    this.setLoadingStatus(false);
                })
            )
            .subscribe();
    }
}
