angular.module('ui-leaflet').factory('nominatimService', function ($q, $http, leafletHelpers, leafletMapDefaults) {
    var isDefined = leafletHelpers.isDefined;

    return {
        query: function(address, mapId) {
            var defaults = leafletMapDefaults.getDefaults(mapId);
            var url = defaults.nominatim.server;
            var df = $q.defer();

            $http.get(url, { params: { format: 'json', limit: 1, q: address } }).then(function(response) {
                if (response.data.length > 0 && isDefined(response.data[0].boundingbox)) {
                    df.resolve(response.data[0]);
                } else {
                    df.reject('[Nominatim] Invalid address');
                }
            });

            return df.promise;
        }
    };
});
