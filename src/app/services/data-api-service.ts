import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { forkJoin, Observable,of } from 'rxjs';
import { map,mergeMap } from 'rxjs/operators';
import { Yeoman } from './yeoman.service';

/* import { CategoryInterface } from './global.service';
 */export interface RequestInterface{
}
export interface UserInterface {
}
export interface ColorInterface {
}export interface BrandInterface {
}
export interface OrderInterface {
}
export interface PartInterface {
}
export interface ClientInterface {
}
export interface PostInterface {
}
export interface DistInterface {
}
export interface ProductInterface {
}
export interface CarInterface {
}
export interface MemberInterface {
}
export interface RubroInterfaces {

}

export interface CardInterface {
	id?:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	//ticket: Observable<any>;
	private baseUrl = 'https://db.buckapi.com:8090/api';

	url:any;
	cards:any;
	orders:any;
	clients:any;
	dists:any;
	client:any;
	chat:any;
	messages:any;
	chats:any;
	cars:any;
	parts:any;
	branch:any;
	cierre:any;
	serial:any;
	transactions:any;
  	constructor(
	  	// public butler:Butler, 
	public yeoman: Yeoman,
 /*   		private AuthRESTService:AuthRESTService,
 */ 	 	private http: HttpClient
  	) {
		}
  	headers : HttpHeaders = new HttpHeaders({  		
		  "Content-Type":"application/json"	
	});


	 
	getAllCategory() {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/svbCategories/records';
		return this.http.get(url_api);
	  }
	
      sendSpecialist( request: RequestInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/camiwaQuizSpacialist/records';
		return this.http.post<RequestInterface>(url_api, request).pipe(
		  map(data => data)
		);
	  }
	  sendPatient( request: RequestInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/camiwaQuizPacientes/records';
		return this.http.post<RequestInterface>(url_api, request).pipe(
		  map(data => data)
		);
	  }
	  
	
	
	
	
}