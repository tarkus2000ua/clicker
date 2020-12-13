import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private game: GameService) {}

    ngOnInit(): void {}

    onSubmit(event) {
        event.preventDefault();
        const name = event.target.querySelector('input').value;
        this.game.saveName(name);
        this.router.navigate(['game']);
    }
}
