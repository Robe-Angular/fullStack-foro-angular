import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
	public url: string;
	public identity;
	public token;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url
	}

	prueba(){
		return 'Hola mundo desde el servicio de Angular';
	}

	register(user): Observable<any>{
		//Convertir el objeto del usuario a un JSONSTRING
		let params = JSON.stringify(user);

		//Definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		//Hacer Petición ajax
		return this._http.post(this.url + 'register', params, {headers:headers});
	}

	signup(user, gettoken = null): Observable<any>{
		//Cmprobar si llega el gettoken


		if(gettoken != null){
			user.gettoken = gettoken;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url + 'login', params, {headers: headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != null && identity != undefined && identity != 'undefined' && identity){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
	let token = localStorage.getItem('token');

		if(token != null && token != undefined && token != 'undefined' && token){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	update(user): Observable<any>{
		//Convertir el objeto del usuario a un JSONSTRING
		let params = JSON.stringify(user);
		console.log(params);
		//Definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
			.set('Authorization', this.getToken());

		//Hacer Petición ajax
		return this._http.put(this.url + 'update', params, {headers:headers});
	}

	getUsers():Observable<any>{
		return this._http.get(this.url + 'users');
	}

	getUser(userId):Observable<any>{
		return this._http.get(this.url + 'user/' + userId);
	}
}
