import { Component, OnInit } from '@angular/core';
import { Character } from 'src/models/character';
import { CharacterServiceService } from 'src/services/character-service.service';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent implements OnInit {

  ITEMS_PER_PAGE: number = 12; // MCM of the different column numbers we can have on the UI depending on the size of the screen

  characters: Character[] = [];
  isLoading = false;
  currentPage: number = 0;

  constructor(
    private characterService: CharacterServiceService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.characterService.getCharacters().subscribe({
      next: characters => {
        this.characters = characters;
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  appendData() {
    this.characterService.getCharacters(this.ITEMS_PER_PAGE * this.currentPage).subscribe({
      next: characters => {
        this.characters = [...this.characters, ...characters];
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onScroll= ()=>{
    this.isLoading = true;
    this.currentPage++;
    this.appendData();
   }

}
