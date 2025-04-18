// import { Component, OnInit } from '@angular/core';
// import { NoteService } from './note.service';
// import { AuthService } from '../auth/auth.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs';
// import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

// @Component({
//   selector: 'app-notes',
//   templateUrl: './notes.component.html',
//   styleUrls: ['./notes.component.scss'],
//   animations: [
//     trigger('fadeInUp', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(20px)' }),
//         animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ])
//     ]),
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('0.3s ease-out', style({ opacity: 1 }))
//       ]),
//       transition(':leave', [
//         animate('0.2s ease-in', style({ opacity: 0 }))
//       ])
//     ])
//   ]
// })
// export class NotesComponent implements OnInit{
//   animateCards = true;

//   notes: any[] = [];

//   noteToDelete: any = null;

//   constructor(private noteService: NoteService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

//   ngOnInit() {
//     const token = this.authService.getToken();
//     if (token) {
//       this.noteService.getNotes(token).subscribe((data) => {
//         this.notes = data;
//       });
//     } else {
//       console.log('User is not authenticated');
//     }
//   }

// viewNote(note: any) {
//   setTimeout((token:string)=>{
//     const id = this.route.snapshot.paramMap.get('id');
//     this.noteService.getNotes(note).pipe(
//       map(res => Object.values(res))
//     ).subscribe((notes:any) => {
//       this.noteService = notes.find(n => n.id == id);
//     });
//   })
//   setTimeout((token:string) => {
//     this.FetchNotes(note);
//   });
// }
// FetchNotes(note:any) {
//   this.noteService.getNotes(note).pipe(
//     map((res) => Object.values(res))
//   ).subscribe(res => {
//     this.notes = res;
//   });
// }

// editNote(note: any) {
//   console.log("Editing note", note);
//   this.router.navigate(['/notes/create'], { state: { noteToEdit: note } });
// }

// confirmDelete(note: any) {
//   this.noteToDelete = note;
// }

// cancelDelete() {
//   this.noteToDelete = null;
// }

// deleteNote(note: any) {
//   this.noteService.deleteNote(note.id).subscribe({
//     next: () => {
//       this.notes = this.notes.filter(n => n.id !== note.id);
//       this.noteToDelete = null;
//     },
//     error: (err) => {
//       console.error('Error deleting note:', err);
//       alert('There is an error.');
// }
// });
// }
// }


import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { AuthService } from 'src/app/feature-modules/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { Notes } from 'src/app/feature-modules/notes/model-create/notes';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.note-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NotesComponent implements OnInit {
  animateCards = true;
  notes: Notes[] = [];
  noteToDelete: Notes | null = null;
  isLoading = true;

  constructor(
    private noteService: NoteService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    const token = this.authService.getToken();
    if (token) {
      this.noteService.getNotes(token).subscribe({
        next: (data) => {
          this.notes = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading notes:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.log('User is not authenticated');
      this.isLoading = false;
    }
  }

  viewNote(noteId: string) {
    this.router.navigate(['/notes/view', noteId]);
  }

  editNote(note: Notes) {
    this.router.navigate(['/notes/create'], { state: { noteToEdit: note } });
  }

  confirmDelete(note: Notes) {
    this.noteToDelete = note;
  }

  cancelDelete() {
    this.noteToDelete = null;
  }

  deleteNote(note: Notes) {
    this.noteService.deleteNote(note.id).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== note.id);
        this.noteToDelete = null;
      },
      error: (err) => {
        console.error('Error deleting note:', err);
        alert('Failed to delete note. Please try again.');
      }
    });
  }
}