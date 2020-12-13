import { GameService } from './../../services/game.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import IResult from 'src/app/interfaces/IResult';

const time = [
    {
        name: '5 sec',
        value: 5
    },
    {
        name: '10 sec',
        value: 10
    },
    {
        name: '15 sec',
        value: 15
    }
];

@Component({
    selector: 'app-game-area',
    templateUrl: './game-area.component.html',
    styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {
    name: string;
    isGameStarted = false;
    clickCounter = 0;
    roundTime = 5;
    timeLeft = 5;
    result: IResult;
    timeList = time;
    radioSelected:string;


    constructor(private router: Router, private game: GameService) {}

    ngOnInit(): void {
        this.name = this.game.getName();
    }

    startGame() {
        if (!this.isGameStarted) {
            this.clickCounter = 0;
            this.isGameStarted = true;
            this.timeLeft = this.roundTime;
            const timer = setInterval(() => {
                if (this.timeLeft === 0) {
                    clearInterval(timer);
                    this.isGameStarted = false;
                    this.result = {
                        name: this.name,
                        result: this.clickCounter,
                        time: this.roundTime
                    };
                    this.game.updateResultTable(this.result);
                    console.log(this.result);
                    this.router.navigate(['result']);
                }
                --this.timeLeft;
            }, 1000);
        } else {
            ++this.clickCounter;
        }
    }

    setTime(time: number) {
        this.roundTime = time;
        this.timeLeft = time;
    }

}
