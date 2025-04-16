import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NoteService } from 'src/app/notes/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notes: any[] = [];

  constructor(private noteService: NoteService,private authService: AuthService, private router: Router) {}

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
}