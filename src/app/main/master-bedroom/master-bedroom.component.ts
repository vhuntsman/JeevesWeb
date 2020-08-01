import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ColourConverter } from 'src/util/colour-converter';

@Component({
    selector: 'app-master-bedroom',
    templateUrl: './master-bedroom.component.html',
    styleUrls: ['./master-bedroom.component.scss']
})
export class MasterBedroomComponent implements OnInit {
    public hueBedroomOn: boolean;
    public hueBedroomBriValue = 128;
    public hueBedroomCtValue = 447;
    public hueBedroomRgbValue = 0;

    constructor(private socket: Socket) { }

    ngOnInit(): void {
        // Socket  rx
        this.socket.on('hue-bedroom', (data) => {
            this.hueBedroomOn = !!data;
        });

        this.socket.on('hue-bedroom-brightness', (data) => {
            this.hueBedroomBriValue = data;
        });

        this.socket.on('hue-bedroom-ct', (data) => {
            this.hueBedroomCtValue = data;
        });

        this.socket.on('hue-bedroom-rgb', (data) => {
            // tslint:disable-next-line: no-bitwise
            const rValue = (parseInt(data, 16) >> 16) / 255;
            // tslint:disable-next-line: no-bitwise
            const gValue = ((parseInt(data, 16) & 0xff00) >> 8) / 255;
            // tslint:disable-next-line: no-bitwise
            const bValue = (parseInt(data, 16) & 0xff) / 255;
            const hValue = ColourConverter.rgbToHsl(rValue, gValue, bValue)[0];
            this.hueBedroomRgbValue = Math.round(hValue * 360);
        });
    }

    public onToggleHueBedroom(ev): void {
        this.hueBedroomOn = ev.checked;
        this.socket.emit('hue-bedroom', +ev.checked);
    }

    public onSlideHueBedroomBri(ev): void {
        this.hueBedroomBriValue = ev.value;
        this.socket.emit('hue-bedroom-brightness', ev.value);
    }

    public onSlideHueBedroomBriDone(ev): void {
        this.hueBedroomBriValue = ev.value;
        this.socket.emit('hue-bedroom-bri-done', ev.value);
    }

    public onSlideHueBedroomCt(ev): void {
        this.hueBedroomCtValue = ev.value;
        this.socket.emit('hue-bedroom-ct', ev.value);
    }

    public onSlideHueBedroomCtDone(ev): void {
        this.hueBedroomCtValue = ev.value;
        this.socket.emit('hue-bedroom-ct-done', ev.value);
    }

    public onSlideHueBedroomRgb(ev): void {
        if (ev.value === 360) {
            this.hueBedroomRgbValue = 359;
        } else {
            this.hueBedroomRgbValue = ev.value;
        }
        const rNormalized = this.hueBedroomRgbValue / 360;
        const rgbString = ColourConverter.hslToRgb(rNormalized, 1.0, 0.5);
        this.socket.emit('hue-bedroom-rgb', rgbString);
    }

    public onSlideHueBedroomRgbDone(ev): void {
        if (ev.value === 360) {
            this.hueBedroomRgbValue = 359;
        } else {
            this.hueBedroomRgbValue = ev.value;
        }
        const rNormalized = this.hueBedroomRgbValue / 360;
        const rgbString = ColourConverter.hslToRgb(rNormalized, 1.0, 0.5);
        this.socket.emit('hue-bedroom-rgb-done', rgbString);
    }
}
