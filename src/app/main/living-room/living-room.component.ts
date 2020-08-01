import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ColourConverter } from 'src/util/colour-converter';

@Component({
    selector: 'app-living-room',
    templateUrl: './living-room.component.html',
    styleUrls: ['./living-room.component.scss']
})
export class LivingRoomComponent implements OnInit {
    public entLightOn: boolean;
    public hueGoOn: boolean;
    public hueGoBriValue = 128;
    public hueGoCtValue = 447;
    public airconOn: boolean;
    public hueGoRgbValue = 0;

    constructor(private socket: Socket) { }

    ngOnInit(): void {
        // Socket  rx
        this.socket.on('diamond-light', (data) => {
            this.entLightOn = !!data;
        });

        this.socket.on('hue-go', (data) => {
            this.hueGoOn = !!data;
        });

        this.socket.on('hue-go-brightness', (data) => {
            this.hueGoBriValue = data;
        });

        this.socket.on('hue-go-ct', (data) => {
            this.hueGoCtValue = data;
        });

        this.socket.on('ac-living', (data) => {
            this.airconOn = !!data;
        });

        this.socket.on('hue-go-rgb', (data) => {
            // tslint:disable-next-line: no-bitwise
            const rValue = (parseInt(data, 16) >> 16) / 255;
            // tslint:disable-next-line: no-bitwise
            const gValue = ((parseInt(data, 16) & 0xff00) >> 8) / 255;
            // tslint:disable-next-line: no-bitwise
            const bValue = (parseInt(data, 16) & 0xff) / 255;
            const hValue = ColourConverter.rgbToHsl(rValue, gValue, bValue)[0];
            this.hueGoRgbValue = Math.round(hValue * 360);
        });
    }

    public onToggleEntLight(ev): void {
        this.entLightOn = ev.checked;
        this.socket.emit('diamond-light', +ev.checked);
    }

    public onToggleHueGo(ev): void {
        this.hueGoOn = ev.checked;
        this.socket.emit('hue-go', +ev.checked);
    }

    public onSlideHueGoBri(ev): void {
        this.hueGoBriValue = ev.value;
        this.socket.emit('hue-go-brightness', ev.value);
    }

    public onSlideHueGoBriDone(ev): void {
        this.hueGoBriValue = ev.value;
        this.socket.emit('hue-go-bri-done', ev.value);
    }

    public onSlideHueGoCt(ev): void {
        this.hueGoCtValue = ev.value;
        this.socket.emit('hue-go-ct', ev.value);
    }

    public onSlideHueGoCtDone(ev): void {
        this.hueGoCtValue = ev.value;
        this.socket.emit('hue-go-ct-done', ev.value);
    }

    public onToggleAircon(ev): void {
        this.airconOn = ev.checked;
        this.socket.emit('ac-living', +ev.checked);
    }

    public onFanToggle(): void {
        this.socket.emit('fan-living', 0);
    }

    public onFanSpeedChange(ev): void {
        this.socket.emit('fan-living', ev.value);
    }

    public onFanLightToggle(): void {
        this.socket.emit('fan-living', 5);
    }

    public onSlideHueGoRgb(ev): void {
        if (ev.value === 360) {
            this.hueGoRgbValue = 359;
        } else {
            this.hueGoRgbValue = ev.value;
        }
        const rNormalized = this.hueGoRgbValue / 360;
        const rgbString = ColourConverter.hslToRgb(rNormalized, 1.0, 0.5);
        this.socket.emit('hue-go-rgb', rgbString);
    }

    public onSlideHueGoRgbDone(ev): void {
        if (ev.value === 360) {
            this.hueGoRgbValue = 359;
        } else {
            this.hueGoRgbValue = ev.value;
        }
        const rNormalized = this.hueGoRgbValue / 360;
        const rgbString = ColourConverter.hslToRgb(rNormalized, 1.0, 0.5);
        this.socket.emit('hue-go-rgb-done', rgbString);
    }
}
