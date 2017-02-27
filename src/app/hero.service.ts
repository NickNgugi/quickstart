import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService{
    private heroesUrl = 'api/heroes'; //URL to web api

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }
    
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    // getHeroesSlow(): Promise<Hero[]> {
    //     return new Promise(resolve => {
    //         setTimeout(() => resolve(this.getHeroes()), 2000)
    //     });
    // }

    private handleError(error: any) {
        console.error('An error occured', error); //for demo purposes only
        return Promise.reject(error.message || error);
    }
}