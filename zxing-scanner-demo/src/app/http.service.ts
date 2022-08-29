import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
	
	text: string;
    postData(result: string, id: any, conv: any, channel:string){
          
        const myHeaders = new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'https://dev-ngx-scanner.eva.ua/'});
        const body={resultString: result, id: id, conv: conv, channel: channel,}
        return this.http.post('https://nodered6.eva.ua/devngx', body,{headers:myHeaders}).subscribe((res) => {this.text=JSON.stringify(res)},
                    error => this.text=JSON.stringify(error));
    }
}

