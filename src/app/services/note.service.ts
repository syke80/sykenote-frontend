import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConfigService } from './config.service';
import { NoteModel } from '../models/note.model';
import { NoteListResponseModel } from '../models/noteListResponse.model';
import { GetNoteResponseModel } from '../models/getNoteResponse.model';
import { AddNoteRequestModel } from '../models/addNoteRequest.model';
import { AddNoteResponseModel } from '../models/addNoteResponse.model';
import { NoteApiErrorModel } from '../models/noteApiError.model';
import { UpdateNoteResponseModel } from '../models/updateNoteResponse.model';
import { DeleteNoteResponseModel } from '../models/deleteNoteResponse.model';
import { AuthenticationService } from './authentication.service';

@Injectable()

export class NoteService {
    public itemCreated$: EventEmitter<NoteModel>;
    private serviceEndpoint: string;
    private endpointPostfix: String = '/notes';

    constructor(private http: Http, private configService: ConfigService, private authenticationService: AuthenticationService) {
        this.itemCreated$ = new EventEmitter();
    }

    private getServiceEndpoint(): string {
        if (!this.serviceEndpoint) {
            this.serviceEndpoint = this.configService.getOption('apiUrl') + this.endpointPostfix;
        }

        return this.serviceEndpoint;
    }

    private getHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer:' + this.authenticationService.getToken()
        });
    }

    getNotes(): Promise<NoteListResponseModel> {
        return this.http.get(this.getServiceEndpoint(), { headers: this.getHeaders() })
            .toPromise()
            .then( function(response: Response): NoteListResponseModel {
                return response.json();
            })
            .catch(this.handleError);
    }

    getNote(id: number): Promise<GetNoteResponseModel> {
        let currentNoteUrl: string = this.getServiceEndpoint() + '/' + id;

        return this.http.get(currentNoteUrl, { headers: this.getHeaders() })
            .toPromise()
            .then( function(response: Response): GetNoteResponseModel {
                return response.json();
            })
            .catch(this.handleError);
    }

    create(data: AddNoteRequestModel): Promise<AddNoteResponseModel> {
        let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });

        return this.http
            .post(this.getServiceEndpoint(), data, options)
            .toPromise()
            .then((response: Response) => {
                let responseContent: AddNoteResponseModel = response.json();
                this.itemCreated$.emit(responseContent.note);
                return responseContent;
            })
            .catch(this.handleError);
    }

    update(data: NoteModel): Promise<UpdateNoteResponseModel> {
        let currentNoteUrl: string = this.getServiceEndpoint() + '/' + data.id,
            options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });

        return this.http
            .put(currentNoteUrl, data, options)
            .toPromise()
            .then((response: Response) => {
                let responseContent: UpdateNoteResponseModel = response.json();
                return responseContent;
            })
            .catch(this.handleError);
    }

    delete(noteId: number): Promise<DeleteNoteResponseModel> {
        let currentNoteUrl: string = this.getServiceEndpoint() + '/' + noteId,
            options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });

        return this.http
            .delete(currentNoteUrl, options)
            .toPromise()
            .then((response: Response) => {
                let responseContent: DeleteNoteResponseModel = response.json();
                return responseContent;
            })
            .catch(this.handleError);
    }

    // TODO: use ApiResponse (abstract class: msg, error) instead of Any
    // TODO: response must be string instead of any
    private handleError(error: Response): Promise<any> {
        let data: NoteApiErrorModel = error.json();
        return Promise.reject(data.error || data.msg || error);
    }
}
