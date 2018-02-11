angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController(hotelDataFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response.data;
        vm.stars = _getStarRating(response.data.stars);
        console.log("the " +vm.hotel.name + " has " + vm.stars.length + " stars");
    });
    
    function _getStarRating(stars){
        return new Array (stars)
    }
}