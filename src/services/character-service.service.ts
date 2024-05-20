import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from 'src/models/character';
import { environment } from 'src/environments/environment';

interface characterListWrapper {
  data: {
    results: Character[]
  }
}

interface characterDataWrapper {
  data: {
    results: Character
  }
}

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {

  private baseUrl = 'http://gateway.marvel.com/v1/public';
  apiKey = environment.publicApiKey;

  constructor(
    private http: HttpClient
  ) { } 

  getCharacters(offset?: number): Observable<Character[]> {
    if (this.apiKey) {
      const options = { params: new HttpParams()
        .set('apikey', this.apiKey)
        .set('limit', 60)
        .set('offset', offset ?? 0)
      };
      return this.http.get<characterListWrapper>(`${this.baseUrl}/characters`, options).pipe(
        map(res => res.data.results)
      );
    } else {
      throw new Error('Public API key is not defined in environment variables');
    }
  }

  getCharacterData(characterId: string): Observable<Character> {
    if (this.apiKey) {
      const options = { params: new HttpParams()
        .set('apikey', this.apiKey)
      };
      return this.http.get<characterDataWrapper>(`${this.baseUrl}/characters/${characterId}`, options).pipe(
        map(res => res.data.results)
      );
    } else {
      throw new Error('Public API key is not defined in environment variables');
    }
  }
}
