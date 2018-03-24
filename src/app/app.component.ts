import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  home_devices: Observable<any[]>;
  constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
      this.afAuth.auth.signInAnonymously();
      this.user = this.afAuth.authState;
      this.home_devices = db.collection('home_devices').valueChanges();
    }
}
