import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiLink } from '../types';
import { toSignal } from '@angular/core/rxjs-interop';

export class LinkApiService {
  // Using 'private' is typescript, but if we want this REALLY to be private we'd do #baseUrl
  // the hash making things private in js came in
  #baseUrl = 'https://links-api.fictionalcompany.com/api/links';
  #http = inject(HttpClient);

  getLinks() {
    return this.#http.get<ApiLink[]>(this.#baseUrl);
  }

  getLinksAsSignal() {
    return toSignal(this.#http.get<ApiLink[]>(this.#baseUrl));
  }
}
