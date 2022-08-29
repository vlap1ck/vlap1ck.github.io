import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { HttpService} from './http.service';
import { ActivatedRoute} from '@angular/router';
import { IdComponent} from './id.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  
  providers: [HttpService]
})
export class AppComponent  {
	
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
  BarcodeFormat.CODE_128,
  BarcodeFormat.DATA_MATRIX,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.ITF,
  BarcodeFormat.QR_CODE,
  BarcodeFormat.RSS_14,
  ];
  querySubscription: Subscription;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;
  id: any;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  

  constructor(private readonly _dialog: MatDialog, private httpService: HttpService) {}
  
  
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
		}

  onCodeResult(resultString: string) {
	    
	    this.qrResultString = resultString;
     /*   this.httpService.postData(resultString);
		this.qrResultString = this.httpService.text;*/
		  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onCameraSwitch2() {
      const device = this.availableDevices[0];
      this.currentDevice = device || null;
      document.getElementById("switch_cam1").hidden = true;
      document.getElementById("switch_cam2").hidden = false;
  }

  onCameraSwitch1() {
      const device = this.availableDevices[1];
      this.currentDevice = device || null;
      document.getElementById("switch_cam1").hidden = false;
      document.getElementById("switch_cam2").hidden = true;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
	  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
	
      }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
  
 
}
