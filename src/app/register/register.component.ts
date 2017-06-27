import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ 
    selector: 'register-content',
  styles: [`
  `],
  template: `
    <div class="container-fluid">        
        <div class="row">
            <div class="col-md-12">
                <input type="number"
                    [value]="mainState?.aadhar"
                    (change)="onChangeAadhar($event.target.value)"/>
                <button type="button" 
                    (click)="onVerifyAadhar()"
                    class="btn btn-primary">
                    Verify
                </button>                
                <div>
                    {{mainState?.errors?.aadhar}}
                </div>
                <input type="checkbox" 
                    [checked]="mainState?.areTermsAccepted"
                    (change)="onChangeTerms($event.target.value)"/>
                <div>
                    {{mainState?.errors?.areTermsAccepted}}
                </div>
                <input type="number" 
                    [value]="mainState?.otp"
                    (change)="onChangeOtp($event.target.value)"/>
                <button type="button" 
                    [disabled]="!mainState.enableSubmit"
                    (click)="onSubmit()"
                    class="btn btn-primary">
                    Submit
                </button>
                <div>{{mainState?.errors?.otp}}</div>
            </div>
        </div>        
    </div>            
  `
})
export class RegisterContent implements OnInit {      

    mainState: any = {
        aadhar: null,
        isAadharVerified: false,
        otp: null,
        areTermsAccepted: false,
        enableSubmit: false,
        errors: {
            aadhar: null,
            otp: null,
            areTermsAccepted: null
        }
    }

    constructor(public activeModal: NgbActiveModal) {
        
    }  

    ngOnInit() {

    }

    onChangeAadhar(aadhar: number) {
        this.mainState.aadhar = aadhar;
    }

    onChangeTerms(areTermsAccepted: boolean) {
        this.mainState.areTermsAccepted = areTermsAccepted;
        this.checkEnableSubmit();
    }

    onChangeOtp(otp: number) {
        this.mainState.otp = otp;
        
        if(this.validateOtp()) {
            this.mainState.errors.otp = null;
            this.checkEnableSubmit();
        } else {
            this.mainState.errors.otp = 'Please enter a valid OTP';
        }
        
    }

    onVerifyAadhar() {      
        this.mainState.errors.aadhar = null;    
        
        if(!this.validateAadhar()) {
            this.mainState.errors.aadhar = 'Please enter a valid aadhar number.';
        } else {        
            this.checkEnableSubmit();
        }          
    }

    onSubmit() {        
        this.mainState.isAadharVerified = true;        
        this.activeModal.close('registered');
    }

    validateAadhar() {
        return !!(this.mainState.aadhar && this.mainState.aadhar.length == 12)        
    }  

    validateOtp() {
        return !!(this.mainState.otp && this.mainState.otp.length == 6);        
    }  

    validateTerms() {
        return this.mainState.areTermsAccepted;
    }

    checkEnableSubmit() {
        if (this.validateAadhar() && this.validateOtp() && this.validateTerms()) {
            this.mainState.enableSubmit = true;
        } else {
            this.mainState.enableSubmit = false;
        }
    }

}

@Component({
  selector: 'register',
  template: '<div></div>'
})
export class RegisterComponent implements OnInit{  

    @Output() onRegister: EventEmitter<any> = new EventEmitter();  

    constructor(private modalService: NgbModal) {
        
    }

    ngOnInit() {
            this.modalService
                .open(RegisterContent)
                .result
                .then((result) => {
                    this.onRegister.emit();
                },(error) => {
                    
                });
    }
  
}
