import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Character } from 'src/models/character';
import { CharacterServiceService } from 'src/services/character-service.service';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  ITEMS_PER_PAGE: number = 60; // MCM of the different column numbers we can have on the UI depending on the size of the screen

  characters: Character[] = [];
  currentPage: number = 0;
  
  isLoading: boolean = false;
  noCharacters: boolean = false;
  serverEror: boolean = false;

  constructor(
    private characterService: CharacterServiceService
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters() {
    this.isLoading = true;
    this.characterService.getCharacters(this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE * this.currentPage).subscribe({
      next: characters => {
        this.characters = [...this.characters, ...characters];
        this.isLoading = false;
      },
      error: () => {
        this.serverEror = true;
      }
    });
  }

  appendData() {
    if (!this.searchInput.nativeElement.value) {
      this.characterService.getCharacters(this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE * this.currentPage).subscribe({
        next: characters => {
          this.characters = [...this.characters, ...characters];
          this.isLoading = false;
        },
        error: () => {
          this.serverEror = true;
        }
      });
    } else {
      this.searchCharacters(this.searchInput.nativeElement.value);
    }
  }

  onScroll= ()=>{
    this.isLoading = true;
    this.currentPage++;
    this.appendData();
   }

  searchCharacters(prompt: string) {
    if (prompt.length > 2) {
      this.isLoading = true;
      this.characters = [];
      this.resetErrors();
      this.characterService.searchCharactersByName(prompt, this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE * this.currentPage).subscribe({
        next: characters => {
          this.characters = [...this.characters, ...characters];
          this.isLoading = false;
        },
        error: () => {
          this.serverEror = true;
        }
      });
      this.characterService.searchCharactersByComicName(prompt, this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE * this.currentPage).subscribe({
        next: characters => {
          this.characters = [...this.characters, ...characters];
          this.isLoading = false;
        },
        error: () => {}
      });
      this.characterService.searchCharactersByEventName(prompt, this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE * this.currentPage).subscribe({
        next: characters => {
          this.characters = [...this.characters, ...characters];
          this.isLoading = false;
        },
        error: () => {}
      });
      if (this.characters.length == 0) {
        this.noCharacters = true;
      }
    } else  {
      this.resetSearch();
    }
  }

  resetSearch() {
    this.characters = [];
    this.currentPage = 0;
    this.loadCharacters();
  }

  resetErrors() {
    this.serverEror = false;
    this.noCharacters = false;
  }

}
