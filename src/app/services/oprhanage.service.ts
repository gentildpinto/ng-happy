import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Orphanage } from '../interfaces/orphanage.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class OprhanageService {

	private _backendURL: string = environment.apiUrl;

	constructor(
		private _http: HttpClient
	) { }

	public getAllOrphanages(): Observable<Orphanage[]> {
		return this._http.get<Orphanage[]>(this._backendURL + 'orphanages')
			.pipe(
				retry(3),
				map((object: any) => object),
				catchError(this.handleError)
			);
	}

	public storeOrphanage(orphanageData: FormData): Observable<boolean | object> {
		return this._http.post(this._backendURL + 'orphanages', orphanageData)
			.pipe(
				retry(3),
				catchError(this.handleError)
			);
	}

	private handleError(error: any): Observable<never> {
		const errorMessage = error.error instanceof ErrorEvent
			? error.error.message
			: `Error Code: ${error.status}
               Message: ${error.message}`;

		// window.alert(errorMessage);
		return throwError(errorMessage);
	}
}
