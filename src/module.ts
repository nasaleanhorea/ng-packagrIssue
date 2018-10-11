import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample/sample.component';
import { BarService } from './service/bar.service';

@NgModule({
	imports: [ CommonModule ],
	declarations: [SampleComponent],
	exports: [SampleComponent]
})
export class IntelliStyleModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: IntelliStyleModule,
			providers: [
				BarService
			]
		};
	}
}
