import {
  Component,
  OnInit,    
} from '@angular/core';
import { Router }  from '@angular/router';

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <div class="container-fluid">
        <div class="row">
        </div>
        <div class="row">
            <div class="col-md-12">

            </div>
        </div>            
        <div class="row">
            <div class="col-md-12">
                <input type="text"
                    (change)="onChangeEmail($event.target.value)"/>
                <div>{{loginState?.errors?.email}}</div>                    
                <button type="button"
                    class="btn btn-primary" 
                    (click)="onLogin()">
                    Continue
                </button>
            </div>
        </div>            
    </div>            
  `
})
export class LoginComponent implements OnInit {

  public loginState: any = {
      email: '',
      errors: {
          email: null
      }
  }

  constructor(private router: Router) {

  }

  public ngOnInit() {
        
  }  

  onChangeEmail(email: string) {
      this.loginState.email = email;
  }

  onLogin() {
    //clear the login errors
    this.loginState.errors.email = null;

    //check if the email is valid
    if (this.validateEmail()) {
        //move to the next screen
        this.router.navigate(['main']);        
    } else {
        //throw login error
        this.loginState.errors.email = "Please enter a valid email";
    }
  }

  validateEmail() {      
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.loginState.email);
  }

}
