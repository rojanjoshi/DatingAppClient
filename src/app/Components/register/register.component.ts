import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  // @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();
  model:any = {}
  registerForm: FormGroup = new FormGroup({});
  constructor(private accountService:AccountService,
    private toastr:ToastrService){}

  ngOnInit(): void {
    this.initializeForm();
  }
 
  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,
        Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, this.matchValue('password')]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

matchValue(matchTo:string):ValidatorFn{
  return (control:AbstractControl)=>{
    return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
  }
}

  register(){
    // this.accountService.register(this.model).subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: (error) => this.toastr.error(error.error),
      
    // })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
