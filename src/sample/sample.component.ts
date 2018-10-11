import { Component } from '@angular/core';

@Component({
	selector: 'hmg-sample',
	templateUrl: './sample.component.html',
	styleUrls: ['./sample.component.scss']
})
export class SampleComponent {

	iClickedYou() {
		console.log(this);
	}
}
