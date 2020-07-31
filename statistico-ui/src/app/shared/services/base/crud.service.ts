import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IIdentity, ILifecycleTimestamps } from '../../models/base.model';
import { IHttpService } from '../../models/http-service.interface';

@Injectable()
export class CrudService<TModel extends IIdentity & ILifecycleTimestamps> {
    private rootUri = 'http://localhost:5000/';
    constructor(
        protected baseUri: string,
        protected httpService: IHttpService) {
    }

    // TODO: add generic function for query params when needed

    public create(item: TModel, customUri?: string, queryParams?: { [key: string]: string }): Observable<TModel> {
        const rawEndpoint = customUri || this.baseUri;
        return this.httpService.post<TModel>(`${this.rootUri}${rawEndpoint}`, item);
    }

    // createMultiple() is using the same endpoint as create(), with the difference that it gives an array of items.
    public createMultiple(items: TModel[], customUri?: string, queryParams?: { [key: string]: string }): Observable<TModel[]> {
        const rawEndpoint = customUri || this.baseUri;
        return this.httpService.post<TModel[]>(`${this.rootUri}${rawEndpoint}`, items);
    }

    public edit(item: TModel, customUri?: string, queryParams?: { [key: string]: string }): Observable<TModel> {
        const rawEndpoint = customUri || `${this.baseUri}/${item.id}`;
        return this.httpService.put<TModel>(`${this.rootUri}${rawEndpoint}`, item);
    }

    public delete(ids: string[], customUri?: string, queryParams?: { [key: string]: string }): Observable<TModel> {
        const rawEndpoint = customUri || `${this.baseUri}/${ids.join(',')}`;
        return this.httpService.delete<TModel>(`${this.rootUri}${rawEndpoint}`);
    }

    public getById(id: string, customUri?: string, queryParams?: { [key: string]: any }): Observable<TModel> {
        const rawEndpoint = customUri || `${this.baseUri}/${id}`;
        return this.httpService.get<TModel>(`${this.rootUri}${rawEndpoint}`);
    }

    public getAll(customUri?: string, queryParams?: { [key: string]: any }): Observable<TModel[]> {
        const rawEndpoint = customUri || this.baseUri;
        return this.httpService.get<TModel[]>(`${this.rootUri}${rawEndpoint}`);
    }

    public getCurrentUser(customUri?: string, queryParams?: { [key: string]: any }): Observable<TModel> {
        const rawEndpoint = customUri || `${this.baseUri}/current`;
        return this.httpService.get<TModel>(`${this.rootUri}${rawEndpoint}`);
    }
}
