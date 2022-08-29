import { Component, EventEmitter, Output, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpService} from './http.service';

 
@Component({  
  selector: 'id-app',
  template: `<div [ngSwitch]="channel" hidden> 
               
				<a *ngSwitchCase="1Viber_eva" href="viber://pa?chatURI=boteva&context=/prodInfo" #elemURL>EvaBotViber</a>
				<a *ngSwitchCase="2Tg_eva" href="https://t.me/EVAofficialBot" #elemURL>EvaBotTelegram</a>
		
			</div>`,
  
  providers: [HttpService]
 })
 
export class IdComponent implements OnChanges{ 

     id: any;
	 channel: any;
	 conv: any =0;
	 urlBot: string;
	 @Input() qrResultString: string;
	 @ViewChild('elemURL') elemURL: ElementRef;
	 
	constructor(private route: ActivatedRoute, private httpService: HttpService){
		
		route.queryParams.subscribe(
			(queryParam: any) => {
				this.id = queryParam['id'];
				this.conv = queryParam['conv'];
				this.channel = queryParam['channel'];
								
			}
		);
		

	}
	ngOnChanges(changes){
	if (this.qrResultString){
		this.httpService.postData(this.qrResultString, this.id, this.conv, this.channel);
		this.elemURL.nativeElement.click();
	}
		
		/*	if(this.conv==5240)	this.urlBot='viber://pa?chatURI=evahelp&context=/scanner';
			else if(this.conv==5382) this.urlBot='viber://pa?chatURI=evaemployeesbot&context=registr';
			else this.urlBot='viber://pa?chatURI=evahelp&context=/scanner';*/
				
		
	}
		
		
	
	
}