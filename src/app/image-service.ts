import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private http: HttpClient) { }

    addImage(fd: FormData) {
        return this.http.post('/api/images/add', fd);
    }
}
