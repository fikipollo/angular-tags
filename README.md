# Angular tags input
## An easy to use AngularJS directive that creates a simple input for managing tags in your forms.
This service requires Twitter Bootstrap for the styles (tested with 3.3.5) and AngularJS (tested with 1.5.5).

## Usage
```html
<tag-field
	editable=true
	name="mytags2"
	ng-model="mytags2"
	class="tag-danger"
	options="[{'key':1, 'value':'Madrid'},{'key':2, 'value':'Barcelona'},{'key':3, 'value':'Valencia'}]"
	popular="[{'key':1, 'value':'Madrid'},{'key':2, 'value':'Barcelona'}]" >
</tag-field>

```

A more complete example can be found at JSFiddle: [https://jsfiddle.net/0rwc8oez/](https://jsfiddle.net/0rwc8oez/)

## Changelog
### v0.1
* First public version.
