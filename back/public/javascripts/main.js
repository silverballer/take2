var frostbite = angular.module('frostbite', ['ngResource', 'ui.listview']);

frostbite.factory('FileMetricsAPI', ['$resource', function($resource){
		return $resource('api/metrics/all/:file', {}, {
			getInfo: {method:'GET'}
		});
	}
]);

frostbite.factory('GitRepoAPI', ['$resource', function($resource){
		return $resource('repo/:file', {}, {
			getFile: {method:'GET'}
		});
	}
]);

frostbite.directive('frostbiteHeader', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: "/assets/directives/header.partial.html"
	}
});

frostbite.controller('FileController', ['$scope', 'FileMetricsAPI', function($scope, FileMetricsAPI) {
	FileMetricsAPI.getInfo({file: "testfile.txt"}, function(data) {
		console.log(data);
		$scope.fileMetrics = data;
	});
}])

frostbite.directive('timeSpent', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: "/assets/directives/timeSpent.partial.html"
	}
});

frostbite.filter('breadcrumbsFilter', function() {
    return function(input, index) {
    	var pathString = "";
    	for (var i = 0; i <= index; i++) {
    	 	pathString = pathString + "/" + input[i];
    	};
        return pathString;  
    }
})


frostbite.directive('breadcrumbs', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: "/assets/directives/breadcrumbs.partial.html"
	}
});