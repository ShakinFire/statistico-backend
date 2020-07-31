import { Observable } from 'rxjs';

export interface IHttpService {
    get<T>(endpoint: string): Observable<T>;

    post<T>(endpoint: string, content: any): Observable<T>;

    put<T>(endpoint: string, content: any): Observable<T>;

    delete<T>(endpoint: string): Observable<T>;
}
