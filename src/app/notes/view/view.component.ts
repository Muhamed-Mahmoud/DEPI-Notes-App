import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../note.service';
import { map } from 'rxjs';
import { Notes } from 'src/app/model/notes';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit  {
 constructor(  private route: ActivatedRoute,
  private notesService: NoteService,
  private router: Router,
  private tostar:ToastrService) {}
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
}
