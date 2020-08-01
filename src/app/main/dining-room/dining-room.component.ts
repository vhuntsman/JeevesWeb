import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ColourConverter } from 'src/util/colour-converter';

@Component({
    selector: 'app-dining-room',
    templateUrl: './dining-room.component.html',
    styleUrls: ['./dining-room.component.scss']
})
export class DiningRoomComponent implements OnInit {
    public hueDiningOn: boolean;
    public hueDiningBriValue = 128;
    public hueDiningCtValue = 447;
    public hueDiningRgbValue = 0;

    constructor(private socket: Socket) { }

    ngOnInit(): void {
        // Socket  rx
        this.socket.on('hue-dining', (data) => {
            this.hueDiningOn = !!data;
        });

        this.socket.on('hue-dining-brightness', (data) => {
            this.hueDiningBriValue = data;
        });

        this.socket.on('hue-dining-ct', (data) => {
            this.hueDiningCtValue = data;
        });

        this.socket.on('hue-dining-rgb', (data) => {
            // tslint:disable-next-line: no-bitwise
            const rValue = (parseInt(data, 16) >> 16) / 255;
            // tslint:disable-next-line: no-bitwise
            const gValue = ((parseInt(data, 16) & 0xff00) >> 8) / 255;
            // tslint:disable-next-line: no-bitwise
            const bValue = (parseInt(data, 16) & 0xff) / 255;
            const hValue = ColourConverter.rgbToHsl(rValue, gValue, bValue)[0];
            this.hueDiningRgbValue = Math.round(hValue * 360);
        });
    }

    public onToggleHueDining(ev): void {
        this.hueDiningOn = ev.checked;
        this.socket.emit('hue-dining', +ev.checked);
    }

    public onSlideHueDiningBri(ev): void {
        this.hueDiningBriValue = ev.value;
        this.socket.emit('hue-dining-brightness', ev.value);
    }

    public onSlideHueDiningBriDone(ev): void {
        this.hueDiningBriValue = ev.value;
        this.socket.emit('hue-dining-bri-done', ev.value);
    }

    public onSlideHueDiningCt(ev): void {
        this.hueDiningCtValue = ev.value;
        this.socket.emit('hue-dining-ct', ev.value);
    }

    public onSlideHueDiningCtDone(ev): void {
        this.hueDiningCtValue = ev.value;
        this.socket.emit('hue-dining-ct-done', ev.value);
    }

    public onSlideHueDiningRgb(ev): void {
        if (ev.value === 360) {
            this.hueDiningRgbValue = 359;
        } else {
            this.hueDiningRgbValue = ev.value;
        }
        const rNormalized = this.hueDiningRgbValue / 360;
        const rgbString = ColourConverter.hslToRgb(rNormalized, 1.0, 0.5);
        this.socket.emit('hue-dining-rgb', rgbString);
    }

    public onSlideHueDiningRgbDone(ev): void {
        if (ev.value === 360) {
            this.hueDiningRgbValue = 359;
        } else {
            this.hueDiningRgbValue = ev.value;
        }
        const rNormalized = this.hueDiningRgbValue / 360;
        const rgbString = ColourConverter.hslToRgb(rNormalized, 1.0, 0.5);
        this.socket.emit('hue-dining-rgb-done', rgbString);
    }
}
