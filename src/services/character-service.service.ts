import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from 'src/models/character';
import { environment } from 'src/environments/environment';

interface wrapper {
  data: {
    results: Character[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {

  private baseUrl = 'http://gateway.marvel.com/v1/public';

  constructor(
    private http: HttpClient
  ) { } 

  getCharacters(): Observable<Character[]> {
    const apiKey = environment.publicApiKey;
    if (apiKey) {
      const options = { params: new HttpParams().set('apikey', apiKey) };
      return this.http.get<wrapper>(`${this.baseUrl}/characters`, options).pipe(
        map(res => res.data.results)
      );
    } else {
      throw new Error('Public API key is not defined in environment variables');
    }
  }
}
