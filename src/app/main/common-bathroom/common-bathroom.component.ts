import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
    selector: 'app-common-bathroom',
    templateUrl: './common-bathroom.component.html',
    styleUrls: ['./common-bathroom.component.scss']
})
export class CommonBathroomComponent implements OnInit {
    public bathroomLightOn: boolean;

    constructor(private socket: Socket) { }

    ngOnInit(): void {
        // Socket  rx
        this.socket.on('common-bathroom', (data) => {
            this.bathroomLightOn = !!data;
        });
    }

    public onToggleBathroomLight(ev): void {
        this.bathroomLightOn = ev.checked;
        this.socket.emit('common-bathroom', +ev.checked);
    }
}
