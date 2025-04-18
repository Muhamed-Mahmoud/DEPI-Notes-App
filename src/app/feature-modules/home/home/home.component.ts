import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../notes/note.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  names: string[] = ['Muhamed Mahmoud', 'Asmaa Mahmoud', 'Mai Gamal'];
  currentText: string = '';
  private nameIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  notes: any[] = [];

  constructor(private noteService: NoteService,private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.startTyping();
    const token = this.authService.getToken();
    if (token) {
      this.noteService.getNotes(token).subscribe((data) => {
        this.notes = data;
      });
    } else {
      console.log('User is not authenticated');
    }
  }
  startTyping() {
    const currentName = this.names[this.nameIndex];
    const typingSpeed = this.isDeleting ? 30 : 100; 
    const pauseBetween = 1500; 
  
    if (this.isDeleting) {
      this.currentText = currentName.substring(0, this.charIndex--);
    } else {
      this.currentText = currentName.substring(0, this.charIndex++);
    }
  
    if (!this.isDeleting && this.charIndex > currentName.length) {
      this.isDeleting = true;
      setTimeout(() => this.startTyping(), pauseBetween);
      return;
    } else if (this.isDeleting && this.charIndex < 0) {
      this.isDeleting = false;
      this.nameIndex = (this.nameIndex + 1) % this.names.length;
      setTimeout(() => this.startTyping(), 300); 
      return;
    }
  
    setTimeout(() => this.startTyping(), typingSpeed);
  }
}
