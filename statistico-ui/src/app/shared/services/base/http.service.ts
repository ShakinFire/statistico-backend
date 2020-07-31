import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
    protected endpoint: string;
    private headers = new HttpHeaders();

    public constructor(private readonly http: HttpClient) {
    }

    // TODO: when needed add generic setHeader function

    public get<TModel>(endpoint: string, headers: { [key: string]: string } = {}, params: any = {}): Observable<TModel> {
        Object.keys(headers)
            .forEach((headerName) => {
                this.headers = this.headers.append(headerName, headers[headerName]);
            });

        return this.http.get<TModel>(endpoint, { headers: this.headers, params });
    }

    public post<TModel>(endpoint: string, content: any): Observable<TModel> {
        return this.http.post<TModel>(endpoint, content, { headers: this.headers });
    }

    public put<TModel>(endpoint: string, content: any): Observable<TModel> {
        return this.http.put<TModel>(endpoint, content, { headers: this.headers });
    }

    public delete<TModel>(endpoint: string): Observable<TModel> {
        return this.http.delete<TModel>(endpoint, { headers: this.headers });
    }
}
