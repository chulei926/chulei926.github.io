# mathjax公式渲染

## 1. 引入 mathjax
```html
<script type="text/javascript" src="https://cdn.eiduo.com/assets/jquery/jquery.js"></script>
<script type="text/javascript" src="https://www.eiduo.com/formula-engine/static/mathjax/MathJax.js?config=TeX-AMS_CHTML"></script>

<script type="application/javascript">
	window._$_ = $;
	window.MathJax = MathJax;
</script>
```

## 2. 创建 global.service.ts

```javascript
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	constructor() {
	}

	nativeGlobal() {
		return window
	}
}

// 在需要用到 GlobalService 的组件所在的 module 中引入
// providers: [GlobalService]
```

## 3. 创建 mathjax 组件，实现双向绑定

## 3.1 mathjax.component.html
```html
<span id="mathContent" [innerHTML]="content"></span>
```

## 3.2 mathjax.component.scss
```css
/** 样式表 **/
```

## 3.3 mathjax.component.ts
```javascript
import {Component, ElementRef, forwardRef, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: 'res-plat-mathjax',
	templateUrl: './mathjax.component.html',
	styleUrls: ['./mathjax.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => MathjaxComponent),
		multi: true
	}]
})
export class MathjaxComponent implements OnInit, ControlValueAccessor {

	content: string;
	MathJax;
	el: any;

	constructor(public gs: GlobalService, private elementRef: ElementRef) {
	}

	ngOnInit(): void {
		this.el = this.elementRef.nativeElement.querySelector('span');
		this.loadMathConfig()
		this.renderMath();
	}

	writeValue(obj: any): void {
		if (obj) {
			this.content = obj;
		} else {
			this.content = '';
		}
		this.renderMath()
	}

	renderMath() {
		this.MathJax = this.gs.nativeGlobal()['MathJax'];
		this.MathJax.Hub.Queue(["Typeset", this.MathJax.Hub], this.el);
	}

	loadMathConfig() {
		this.MathJax = this.gs.nativeGlobal()['MathJax'];
		this.MathJax.Hub.Config({
			showMathMenu: false,
			tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]},
			CommonHTML: {linebreaks: {automatic: true}},
			"HTML-CSS": {linebreaks: {automatic: true}},
			SVG: {linebreaks: {automatic: true}}
		});
	}

	registerOnChange(fn: any): void {
		this.onModelChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onModelTouched = fn;
	}

	private onModelChange: Function = () => {

	};
	private onModelTouched: Function = () => {

	};
}

```


## 4. 使用 mathjax 组件
```html
<res-plat-mathjax [(ngModel)]="htmlContent"></res-plat-mathjax>
```

```javascript
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
	selector: 'res-plat-question-view',
	templateUrl: './question-view.component.html',
	styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit, OnChanges {

	htmlContent: string = '';

	constructor(private commonModelService: CommonModelService) {
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes && changes.htmlContent && changes.htmlContent.currentValue) {
			this.htmlContent = changes.htmlContent.currentValue;
		}
	}
}
```
