import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../note.service';
import { map } from 'rxjs';
import { Notes } from 'src/app/feature-modules/notes/model-create/notes';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
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
export class ViewComponent implements OnInit  {
animateCards = true;
 constructor(  private route: ActivatedRoute,
  private notesService: NoteService,
  private router: Router,
  private tostar:ToastrService) {}
  loading = true
  note: Notes;
  allNotes:Notes[];
  noteToDelete: any = null;
  ngOnInit(): void {
    setTimeout(()=>{
      const id = this.route.snapshot.paramMap.get('id');
      this.notesService.getNotes(id).pipe(
        map(res => Object.values(res))
      ).subscribe((notes) => {
        this.note = notes.find(n => n.id == id);
        this.loading = false;
      });
    })
    setTimeout((toke:string) => {
      this.fetchNoteById(toke);
    });
  }

  fetchNoteById(id: string) {
    this.notesService.getNotes(id).subscribe((note) => {
      this.allNotes = note;
    });
  }
  editNote(note: Notes) {
    // console.log("Editing note", note.id);
    {
      this.router.navigate(['/notes/create'], {
        state: {
          noteToEdit: note,
          returnToView: true   // flag to know we should go back to view page
        }
      });
  }
  }
  confirmDelete(note: any) {
    this.noteToDelete = note;
  }

  cancelDelete() {
    this.noteToDelete = null;
  }

  deleteNote(note: Notes) {
    this.notesService.deleteNote(note.id).subscribe({
      next: () => {
        this.allNotes = this.allNotes.filter(n => n.id !== note.id);
        this.noteToDelete = null;
        this.tostar.success("Deleted successfully");
        this.router.navigate(['/notes'])

      },
      error: (err) => {
        console.error('Error deleting note:', err);
        alert('There is an error.');
   }
  });
  }

  selectedNote: Notes | null = null;

viewNote(note: Notes) {
  this.selectedNote = note;
}

closeViewPopup() {
  this.selectedNote = null;
}

}
