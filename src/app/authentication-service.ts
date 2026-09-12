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

    constructor(private http: HttpClient) {
        this.loggedIn.next(false);
        this.http.get('/api/auth/authenticated/', { withCredentials: true }).subscribe(() => {
            this.loggedIn.next(true);
            this.refreshAccessToken();
        });
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
        this.http.get('/api/auth/logout/', {}).subscribe(() => {
            this.loggedIn.next(false);
        });
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
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
