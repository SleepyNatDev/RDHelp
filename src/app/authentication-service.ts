import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private refreshTimer?: any;
    private refreshMilli: number = 60 * 60 * 1000; // 1 hour
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(private http: HttpClient) {
        this.loggedIn.next(false);
        this.refreshAccessToken();
    }

    authenticated() {
        return this.loggedIn.getValue();
    }

    login(fd: FormData) {
        this.http.post('/api/auth/login/', fd, { withCredentials: true }).subscribe({
            next: () => {
                this.loggedIn.next(true);
                this.scheduleRefresh();
            },
            error: () => {
                this.loggedIn.next(false);
            }
        });
    }

    logout() {
        this.http.get('/api/auth/logout/', { withCredentials: true }).subscribe(() => {
            this.loggedIn.next(false);
        });
    }

    private scheduleRefresh() {
        clearTimeout(this.refreshTimer);
        const refreshTime = this.refreshMilli - (60 * 1000);
        this.refreshTimer = setTimeout(() => {
            this.refreshAccessToken();
        }, refreshTime);
    }

    private refreshAccessToken() {
        this.http.get('/api/auth/refresh', { withCredentials: true }).subscribe({
            next: () => {
                this.loggedIn.next(true);
                this.scheduleRefresh();
            },
            error:  () => {
                this.loggedIn.next(false);
            }
        });
    }
}
