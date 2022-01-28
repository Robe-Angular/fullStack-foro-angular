import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

	public page_title: string;
	public user: User;
	public identity;
	public token;
	public status;
	public afuConfig;
	public url;
	public resetVar: string;
	

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService
	) { 
		this.page_title = 'Ajustes de usuario';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.url = global.url;

		this.afuConfig = {
			multiple: false,
			formatsAllowed: ".jpg, .jpeg, .png, .gif",
			maxSize: "50",
			uploadAPI: {
				url: this.url + 'upload-avatar',
				headers: {
					"Authorization": this.token
				}
			},
			theme: "attachPin",
			hideProdressBar: false,
			hideResetBtn: true,
			hideSelectBtn: false,
			attachPinText: "sube tu foto",
			replaceTexts: {
		      selectFileBtn: 'Select Files',
		      resetBtn: 'Reset',
		      uploadBtn: 'Upload',
		      dragNDropBox: 'Drag N Drop',
		      attachPinBtn: 'Sube tu foto ...',
		      afterUploadMsg_success: 'Successfully Uploaded !',
		      afterUploadMsg_error: 'Upload Failed !',
		      sizeLimit: 'Size Limit'
		    }
		}
		
		
	}

	avatarUpload(data){		
		this.user.image =  data.body.user.image;
		console.log(this.user);
	}

	ngOnInit(): void {

	}

	onSubmit(form){

		let actual_user = this._userService.getIdentity();
		let actual_email = actual_user.email;
		this._userService.update(this.user).subscribe(
			response => {
				if(!response.user){
					this.status = 'error';
				}else{
					this.status = 'success';
					if(actual_email != this.user.email){
						localStorage.setItem('token', JSON.stringify(response.token));
					}
					console.log(response);
					localStorage.setItem('identity', JSON.stringify(this.user));
				}
			},
			error => {
				this.status = 'error'
				console.log(error);
			});	
	}

}
