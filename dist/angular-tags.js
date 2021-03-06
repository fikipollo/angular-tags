/*! Angular tags v0.1 | Rafael Hernandez <https://github.com/fikipollo> | MIT license */
(function () {
	var app = angular.module('ang-tags', []);

	app.directive("tagField", ['$compile', function ($compile) {
		return {
			restrict: 'E',
			require : 'ngModel',
			scope: {
				editable : "="
			},
			template :
			'<div class="tag-container" ng-click="focusInputTag()">'+
			'	<input type="text" name="{{name}}" ng-model="tags" style="display:none;">' +
			'	<span class="tag label label-{{tagClass}}" ng-repeat="tag in tags">'+
			'		{{tag}} '+
			'		<span ng-show="editable" class="removeTag" ng-click="removeTag(tag)"></span>'+
			'	</span>' +
			'	<input type="text" placeholder="New tag" ng-show="editable" class="newtag-input" list="{{optionsID}}" ng-model="newTag" ng-keypress="updateContent($event)">'+
			'	<a class="btn btn-sm btn-success" ng-show="editable" ng-click="updateContent(null,true)" style="padding:2px 5px;">+ Add</a>'+
			'	<datalist id="{{optionsID}}">'+
			'		<option value="{{option.value}}" ng-repeat="option in options">'+
			'	</datalist>'+
			'	<div class="popular-tag-container" ng-show="editable && popular !== null">'+
			'		<span>Popular tags: </span><span class="tag label label-{{tagClass}}" ng-repeat="tag in popular">'+
			'			<span ng-show="editable" class="addTag" ng-click="addTag(tag.value)"></span>'+
			'			{{tag.value}} '+
			'		</span>' +
			'	</div>'+
			'</div>',
			link: function ($scope, element, attrs, ngModel) {
				if(!ngModel){return}

				ngModel.$render = function(){
					$scope.tags = ngModel.$modelValue || [];
				};

				function updateModel(){
					ngModel.$setViewValue($scope.tags);
					ngModel.$render();
				}

				$scope.updateContent = function($event, force){
					if(force || $event.keyCode === 13) {
						$scope.tags = $scope.unique($scope.tags.concat($scope.newTag));;
						$scope.newTag = "";
						updateModel();
					}
				};

				$scope.addTag = function(tag){
					$scope.tags = $scope.unique($scope.tags.concat(tag));;
					updateModel();
				};

				$scope.removeTag = function(tag){
					var pos = $scope.tags.indexOf(tag);
					if(pos !== -1){
						$scope.tags.splice(pos,1);
						$scope.tags = $scope.tags.concat(); //force input updating
						updateModel();
					}
				};

				$scope.unique = function(array, ignore){
					var a = [];
					ignore = ignore || [];
					for (var i in array){
						if(array[i] && a.indexOf(array[i]) === -1 && ignore.indexOf(array[i]) === -1){
							a.push(array[i]);
						}
					}
					return a;
				};

				$scope.focusInputTag = function(){
					if($scope.editable){
						var inputs = element.find("input");
						for(var i in inputs){
							if(inputs[i].className.indexOf("newtag-input") !== -1){
								inputs[i].focus();
								return;
							}
						}
					}
				};

				try {
					$scope.options = JSON.parse(attrs.options.replace(/\'/g, "\"")) || [];
				} catch (e) {
					$scope.options = [];
				}
				try {
					$scope.popular = JSON.parse(attrs.popular.replace(/\'/g, "\"")) || [];
				} catch (e) {
					$scope.popular = null;
				}
				$scope.editable = $scope.editable || (attrs.editable === "true");
				$scope.newTag = "";

				$scope.tagClass = "primary";
				if(attrs.class && ["tag-default", "tag-primary", "tag-success", "tag-info", "tag-warning", "tag-danger"].indexOf(attrs.class) !== -1){
					$scope.tagClass = attrs.class.replace("tag-","");
				}
				$scope.name = (attrs.name || "tags");
				$scope.optionsID = Math.random().toString(36).substr(2, 16);
			}
		};
	}]);
})();
