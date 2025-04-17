// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { AuthService } from '../auth/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class NoteService {

//   constructor(private http:HttpClient, private auth: AuthService) { }
//   /*  userToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE3NDMwMzc2NTAsImV4cCI6MTc0MzA4MDg1MH0.BgL5QiZyAes_qCeAL91JnxgqJ_oFSgCtb0NWNfmVxCM'

//    httpoptins={
//      headers:new HttpHeaders({
//        'Authorization':`Bearer ${this.userToken}`
//      })
//    } */
//    ctreateNotes(note: any) {
//      console.log('Create notes', note);
//      const url=environment.apiUrl;
//      return this.http.post(url,note);
//    }
//    private baseUrl = 'http://localhost:8000';


//    getNotes() {
//     const token = this.auth.getToken();
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     return this.http.get<any[]>(`${this.baseUrl}/notes`, { headers });
//   }

//   deleteNote(noteId: string) {
//     const token = this.auth.getToken();
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     return this.http.delete(`${this.baseUrl}/notes/${noteId}`, { headers });
//   }



// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient, private auth: AuthService) { }
  /*  userToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE3NDMwMzc2NTAsImV4cCI6MTc0MzA4MDg1MH0.BgL5QiZyAes_qCeAL91JnxgqJ_oFSgCtb0NWNfmVxCM'

   httpoptins={
     headers:new HttpHeaders({
       'Authorization':Bearer ${this.userToken}
     })
   } */
   createNotes(note: any) {
     console.log('Create notes', note);
     const url=environment.apiUrl;
     return this.http.post(url,note);
   }
   private baseUrl = 'http://localhost:8000';


   getNotes(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/notes`, { headers });
  }
  updateNote(noteId: string, noteData: any) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.baseUrl}/notes/${noteId}`, noteData, { headers });
  }


  deleteNote(noteId: string) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/notes/${noteId}`, { headers });

  }
  

}