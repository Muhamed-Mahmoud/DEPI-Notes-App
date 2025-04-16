import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  noteForm

  noteToEdit: any = null;
  currentId:number

  //profileData
  adressData
  returnToView = false;
  constructor(private builder:FormBuilder,private noteservice:NoteService,private router: Router,private toastr: ToastrService) { }
   isflag=false;
  ngOnInit(): void {
    this.initForm();
    const state = history.state;
    if (state && state.noteToEdit) {
      this.noteToEdit = state.noteToEdit;
      this.returnToView = state.returnToView || false; // ⬅️ add this line
      this.isflag = false;
      this.fillFormWithNoteData();
    } else {
      this.isflag = true;
       /* navigate to create */
    }
    ///
  }
  initForm() {
    this.noteForm = this.builder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });

  }
  errorMessage = '';
  isLoading = false;

  onSubmit() {
    if (this.noteForm.valid) {
      this.isLoading = true;
     // console.log(this.noteForm);
      //console.log(this.profileData.value);
      this.noteservice.createNotes(this.noteForm.value).subscribe((res)=>{
        this.isLoading = false;
        console.log('Response',res);
        this.showSuccess();
        //this.noteForm.reset();///remove the form data
        //navigate to notes page
          setTimeout(() => {
            this.router.navigate(['/notes']);
          }, 1000);
      },(err)=>{
        this.isLoading = false;
        //errors from backend handling on status code 401,403
        this.errorMessage = "Something went wrong. Please try again later.";
        console.log('Error',err.error.errors);//error from backend

        //navigate to login page and remove token from local storage////////////
      }
    );
    }
  }
  showSuccess() {
    this.toastr.success('success', 'Created Successfully');
  }



/*   updatenotes() {
    this.noteForm.patchValue({
      title: 'John',
      content: 'Doe',
      category: 'Doe',
      priority: 'Doe',
      tags: 'Doe',
    });
  } */

  fillFormWithNoteData() {
    if (this.noteToEdit) {
      this.noteForm.patchValue({
        title: this.noteToEdit.title,
        content: this.noteToEdit.content,
        category: this.noteToEdit.category,
        priority: this.noteToEdit.priority,
        tags: this.noteToEdit.tags,
      });
    }
  }

  // Method to confirm before updating or saving
 // Method to confirm before updating or saving
confirmAction(action: string) {
const confirmation = window.confirm(`Are you sure you want to ${action}?`);
  if (!confirmation) return;
  switch (action) {
    case 'save':
      this.onSubmit();
      break;
    case 'update':
      this.updateNote();
      if (this.returnToView) {
        this.router.navigate(['/notes/view', this.noteToEdit.id]);
      } else {
        this.router.navigate(['/notes']);
      }
      break;
    case 'cancel':
      this.noteForm.reset();
      if (this.returnToView) {
        this.router.navigate(['/notes/view', this.noteToEdit.id]);
      } else {
        this.router.navigate(['/notes']);
      }
      break;
  }
}
updateNote() {
  this.isflag = false;
  if (this.noteForm.valid && this.noteToEdit) {
    this.isLoading = true;
    const updatedNote = this.noteForm.value;
    this.noteservice.updateNote(this.noteToEdit.id, updatedNote).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastr.success('Note updated successfully');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Something went wrong during update.';
        console.error(err);
      }
    });
  }
}
}
