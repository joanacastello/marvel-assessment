import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/models/character';
import { CharacterServiceService } from 'src/services/character-service.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  character: Character;
  isLoading: boolean = false;
  characterId: string | null;

  constructor(
    private characterService: CharacterServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.characterId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    if (this.characterId) {
      this.characterService.getCharacterData(this.characterId).subscribe({
        next: characters => {
          this.character = characters;
          this.isLoading = false;
        },
        error: error => {
          console.log(error);
        }
      });
    }
    else {
      console.error('Error')
    }
    
  }



}
