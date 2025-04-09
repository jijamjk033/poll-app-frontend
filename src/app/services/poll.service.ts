import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Poll, pollResponse } from '../models/pollResponse';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiKey = import.meta.env.NG_APP_POLL_API_URL;

  constructor(private http: HttpClient) { }

  createPoll(pollData:Object):Observable<ResponseModel<pollResponse>>{
    return this.http.post<ResponseModel<pollResponse>>(`${this.apiKey}/createPoll`,pollData);
  }
  getPolls():Observable<ResponseModel<Poll[]>>{
    return this.http.get<ResponseModel<Poll[]>>(`${this.apiKey}/getPolls`);
  }
  getPollById():Observable<ResponseModel<pollResponse>>{
    return this.http.get<ResponseModel<pollResponse>>(`${this.apiKey}/getPollsById`);
  }
  vote(pollId: string, selectedOption: string):Observable<ResponseModel<pollResponse>>{
    return this.http.post<ResponseModel<pollResponse>>(`${this.apiKey}/vote`, { pollId, selectedOption });
  }
}
