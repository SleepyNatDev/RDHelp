import { Service } from '@angular/core';

@Service()
export class LocalStorage {
    save(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key)??'';
    }
}
