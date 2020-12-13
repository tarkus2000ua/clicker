import { CommonModule } from '@angular/common';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IResult from 'src/app/interfaces/IResult';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
    result: IResult;
    resultTable: IResult[];
    isSuccess: boolean;
    isNewRecord: boolean;

    constructor(private router: Router, private game: GameService) {}

    ngOnInit() {
        const results = this.game.getResults();
        this.resultTable = results.resultTable.sort((a,b) => b.result-a.result);
        this.result = results.result;
        this.isNewRecord = results.isNewRecord;
        this.isSuccess = results.isSuccess;
    }

    playAgain() {
        this.router.navigate(['game']);
    }
}
