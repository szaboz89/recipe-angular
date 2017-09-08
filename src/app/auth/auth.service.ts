import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
    token: string;
    loggedUser: string;

    constructor(private router: Router) {
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.router.navigate(['/']);
            })
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);
                    this.loggedUser = email;
                    firebase.auth().currentUser.getToken()
                        .then(
                            (token: string) => this.token = token
                        );
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    getLoggedUser() {
        return this.loggedUser;
    }
}
