import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: Observable<firebase.User>;
  home_devices: Observable<any[]>;
  color = 'green';
  checked: number = 1;
  disabled = false;
  db: AngularFirestore;
  constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
      this.db = db;
      this.afAuth.auth.signInAnonymously();
      this.user = this.afAuth.authState;
      this.home_devices = db.collection('home_devices').valueChanges();
    }
    deviceSwitch(value, device) {
        if (value === true) {
          this.checked = 1;
          this.db.collection('home_device').doc(device.id).update({is_on : value.checked});
          console.log(device);
        } else {
          this.checked = 0;
          this.db.collection('home_device').doc(device.id).update({is_on : value.checked});
          console.log(device);
        }
    }
}

