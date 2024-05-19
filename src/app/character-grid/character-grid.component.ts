import { Component, OnInit } from '@angular/core';
import { Character } from 'src/models/character';
import { CharacterServiceService } from 'src/services/character-service.service';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent implements OnInit {

  characters: Character[] = [];

  constructor(
    private characterService: CharacterServiceService
  ) { }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe({
      next: characters => {
        this.characters = characters;
        console.log(this.characters);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
