'use strict';

(function(){

class MoviemappingComponent {
  constructor($http, $scope, socket) {
    //this.message = 'Hello';
      this.$http = $http;
      this.socket = socket;
      this.$scope= $scope;

      this.theatre_arr =[];
      this.th_arr =[];
      this.MovieData=[];
      $scope.$on('$destroy', function() {
      socket.unsyncUpdates('moviemappingendpoint');
    });
  }


  $onInit(){
    this.$http.get('/api/moviemappingendpoint').then(response => {
      this.theatre_arr = response.data;
      this.socket.syncUpdates('moviemappingendpoint', this.theatre_arr);
    });
    this.$http.get('/api/theatreendpoint').then(response => {
      this.th_arr = response.data;
    });
    this.$http.get('/api/SearchMovieendpoint').then(response => {
      this.MovieData = response.data;
    });
  }




  addmapping(){
  this.$http.post('/api/moviemappingendpoint',{
    CITYNAME: this.cityname,
     AMPM: this.Am_Pm,
     MINUTE:this.Minute,
     HOUR: this.Hour,
     DATE:this.Date,
     THEATRENAME:this.theatrename,
     POSTER: this.poster,
     MOVIENAME:this.moviename

  });
  }





  removedata(theatre){
    this.$http.delete('/api/moviemappingendpoints/' +theatre._id);
  }
}

angular.module('yoTemplateApp')
  .component('moviemapping', {
    templateUrl: 'app/moviemapping/moviemapping.html',
    controller: MoviemappingComponent,
    controllerAs: 'moviemappingCtrl'
  });

})();
