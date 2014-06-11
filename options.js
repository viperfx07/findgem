var app = angular.module('app', []);

app.controller('controller', ['$scope',
    function($scope) {
        $scope.init = function() {
        	console.log('x');
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            var today = dd + '/' + mm + '/' + yyyy;


            // Use default value color = 'red' and likesColor = true.
            chrome.storage.sync.get(null, function(items) {
                $scope.name = items.name;
                $scope.email = items.email;
                $scope.phone = items.phone;
                $scope.today = items.today;
                $scope.tomorrow = items.tomorrow;
            });

        }

        $scope.save = function() {
            chrome.storage.sync.set({
                name: $scope.name,
                email: $scope.email,
                phone: $scope.phone,
                today: $scope.today,
                tomorrow: $scope.tomorrow
            }, function() {
                // Update status to let user know options were saved.
                var status = document.getElementById('status');
                status.textContent = 'Options saved.';
                setTimeout(function() {
                    status.textContent = '';
                }, 750);
            });
        }

        $scope.init();
    }
]);
