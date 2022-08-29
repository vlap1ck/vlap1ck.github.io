import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
	
	text: string;
    postData(result: string, id:any){
          
        const myHeaders = new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'https://ngx-scanner.eva.ua/'});
        const body={resultString: result, id: id}
        return this.http.post('https://nodered.eva.ua/ngx', body,{headers:myHeaders}).subscribe((res) => {this.text=JSON.stringify(res)},
                    error => this.text=JSON.stringify(error));
    }
}

