import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private FB:FormBuilder,
    private render:Renderer2,
    private auth:AuthService,
    private tostar:ToastrService,
    private route:Router
  ){}
  Register:FormGroup = this.FB.group({
    name: [null, [Validators.required, Validators.pattern(/^.{3,20}$/)]],
    email: [null,[Validators.required,Validators.pattern(/\w+@(gmail|mail|outlook|example).(com|net|org)$/i)]],
    password: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    age: ["", [Validators.required, Validators.pattern(/^(1[89]|[2-9][0-9])$/)]],
     address:[null,Validators.required]
      })
  get Name(){
   return this.Register.controls['name'];
  }
  get Email(){
   return this.Register.controls['email'];
  }
  get Password(){
   return this.Register.controls['password'];
  }
  get Phone(){
   return this.Register.controls['phone'];
  }
  get Age(){
   return this.Register.controls['age'];
  }
  get Address(){
   return this.Register.controls['address'];
  }
  @ViewChild("btneye1") eyeclose :ElementRef;
  @ViewChild("passwordInput") passwordField :ElementRef;

  appear(){
    const eyeclose =  this.eyeclose.nativeElement;
    const password = this.passwordField.nativeElement

      if(password.type === "password"){
       password.type="text";
       this.render.addClass(eyeclose,"bi-eye-slash-fill");
       this.render.removeClass(eyeclose,"bi-eye-fill");
      }
      else{
       password.type = "password"
       this.render.addClass(eyeclose,'bi-eye-fill');
       this.render.removeClass(eyeclose,'bi-eye-slash-fill')
      }
     }
     onSubmit(){
       if(this.Register.invalid){
         this.tostar.warning("Enter Your Correct Data please Dont play For Disabled Input");
         return ;
       }
       this.auth.registerApi(this.Register.value).subscribe({
          next:((res:any)=>{
           this.auth.setToken(res.token);
           this.tostar.success("Registration completed successfully")
           this.route.navigateByUrl("Home")
          }),
          error:(err=>{
           if (err.status === 400 ) {
             this.tostar.error("This Email Already Exist");
           }
          })
       })
       this.Register.reset();
     }

   }
