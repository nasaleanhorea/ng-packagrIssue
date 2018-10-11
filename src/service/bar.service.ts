import { Injectable } from '@angular/core';

@Injectable()
export class BarService {

	get value(): string {
		return 'some value';
	}
}
