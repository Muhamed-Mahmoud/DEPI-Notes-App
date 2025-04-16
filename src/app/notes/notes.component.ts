import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{
  notes: any[] = [];

  constructor(private noteService: NoteService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.noteService.getNotes(token).subscribe((data) => {
        this.notes = data;
      });
    } else {
      console.log('User is not authenticated');
    }
  }

  noteToDelete: any = null;

viewNote(note: any) {
  setTimeout((token:string)=>{
    const id = this.route.snapshot.paramMap.get('id');
    this.noteService.getNotes(note).pipe(
      map(res => Object.values(res))
    ).subscribe((notes:any) => {
      this.noteService = notes.find(n => n.id == id);
    });
  })
  setTimeout((token:string) => {
    this.FetchNotes(note);
  });
}
FetchNotes(note:any) {
  this.noteService.getNotes(note).pipe(
    map((res) => Object.values(res))
  ).subscribe(res => {
    this.notes = res;
  });
}

editNote(note: any) {
  console.log("Editing note", note);
  this.router.navigate(['/notes/create'], { state: { noteToEdit: note } });
}

confirmDelete(note: any) {
  this.noteToDelete = note;
}

cancelDelete() {
  this.noteToDelete = null;
}

deleteNote(note: any) {
  this.noteService.deleteNote(note.id).subscribe({
    next: () => {
      this.notes = this.notes.filter(n => n.id !== note.id);
      this.noteToDelete = null;
    },
    error: (err) => {
      console.error('Error deleting note:', err);
      alert('There is an error.');
}
});
}
}
