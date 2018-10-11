# intelliDivideBase
HOMAG angular intelli Style

## Getting Started

### Installation

```shell
npm install @homag/intelli-style --save
```

### Register module

```ts
import { IntelliStyleModule } from "@homag/intelli.divide.base";

@NgModule({
    imports: [IntelliStyleModule]
})
export class AppModule {

}
```

### Usage
```ts
import { BarService } from "@homag/intelli-style";

@Injectable()
constructor(
	private barSvc: BarService
) {
}
```