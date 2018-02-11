angular.module('meanhotel').directive('hotelRating', hotelRating);//hotel-rating in html

function hotelRating(){
    return{
     restrict: "E",
     template: '<span ng-repeat="star in vm.stars track by $index" class="fas fa-star">{{ star }}</span>',
     bindtoController: true,
     controller: 'HotelController',
     controllerAs: 'vm',
     scope:{
         stars: '@'
     }
    }
}


//works same as above

// angular.module('meanhotel').component('hotelRating', {
//   bindings: {
//     stars: '='
//   },
//   template: '<span ng-repeat="star in vm.stars track by $index" class="fas fa-star">{{ star }}</span>',
//   controller: 'HotelController',
//   controllerAs: 'vm'
// });