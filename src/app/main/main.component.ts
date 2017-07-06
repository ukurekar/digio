import {
  Component,
  OnInit
} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent, RegisterContent } from '../register/register.component';

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <div class="container-fluid">        
        <div class="row">
            <div class="col-md-12">
                <ng-template ngbModalContainer></ng-template>
                <register (onRegister)="onRegister($event)">                    
                </register>
                Main Page
            </div>
        </div>    
        <ngb-alert 
            [type]="success"
            *ngIf="mainState?.isRegistered">Aadhar verified successfully</ngb-alert>    
    </div>            
  `
})
export class MainComponent implements OnInit {

  public mainState: any = {
      aadhar: null,
      otp: null,
      isRegistered: false,
      errors: {
          aadhar: null,
          otp: null
      }
  }

  constructor(private registerModal:NgbModal) {

  }  

  ngOnInit() {

  }

  onRegister(message: any) {      
    this.mainState.isRegistered = true;
    setTimeout(() => {
        this.mainState.isRegistered = false;
    }, 3000)
  }


}
