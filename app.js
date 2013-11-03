var myApp = angular.module('MyApp', []);

myApp.controller('MainController', function ($scope) {
    $scope.result = [];
    $scope.totalMiles = 0;
    
	$scope.sum = function(data) {
    var result = 0;
    
    for (var i = 0; i < data.length; i++) {
      result += parseFloat(data[i].miles);
    }
    
    $scope.totalMiles = result;
	};

	$scope.parse = function(data) {
    if (data === undefined)
        return;
        
		// regex 
		var exp = /(\S*)\smiles.*\sin\s([A-Z]{2})\sto/;
		
		// break down into each line
		var lines = data.split("\n");

		// result 
		// structure = { "miles" : 10, "state" : "LA" }
		var result = [];

		for (var i = 0; i < lines.length; i++) {
      var exists = false;
			var parse = lines[i].match(exp);
			
			if (parse !== null) {
				// lookup state
				// if state already exists, add the miles
				// otherwise, push this data to the result array
				for (var j = 0; j < result.length; j++) {
					if (result[j].state.substring(0, 2) === parse[2]) {
						var oldMiles = parseFloat(result[j].miles);
						var newMiles = parseFloat(parse[1]);
						result[j].miles = (oldMiles + newMiles).toFixed(2);
						exists = true;
						break;
					}
				}
				
				if (!exists) {
          var miles = parse[1];
          var stateAbbrev = parse[2];
          // push to result array
          result.push ({ "miles" : miles, "state" : stateAbbrev + " - " + convert_state(stateAbbrev, "name") });
				}
			}
		}
		
    if (result !== null)
        $scope.sum(result);
            
		$scope.result = result;
	};
});


function convert_state(name, to) {
    var states = new Array(                         {'name':'Alabama', 'abbrev':'AL'},          {'name':'Alaska', 'abbrev':'AK'},
        {'name':'Arizona', 'abbrev':'AZ'},          {'name':'Arkansas', 'abbrev':'AR'},         {'name':'California', 'abbrev':'CA'},
        {'name':'Colorado', 'abbrev':'CO'},         {'name':'Connecticut', 'abbrev':'CT'},      {'name':'Delaware', 'abbrev':'DE'},
        {'name':'Florida', 'abbrev':'FL'},          {'name':'Georgia', 'abbrev':'GA'},          {'name':'Hawaii', 'abbrev':'HI'},
        {'name':'Idaho', 'abbrev':'ID'},            {'name':'Illinois', 'abbrev':'IL'},         {'name':'Indiana', 'abbrev':'IN'},
        {'name':'Iowa', 'abbrev':'IA'},             {'name':'Kansas', 'abbrev':'KS'},           {'name':'Kentucky', 'abbrev':'KY'},
        {'name':'Louisiana', 'abbrev':'LA'},        {'name':'Maine', 'abbrev':'ME'},            {'name':'Maryland', 'abbrev':'MD'},
        {'name':'Massachusetts', 'abbrev':'MA'},    {'name':'Michigan', 'abbrev':'MI'},         {'name':'Minnesota', 'abbrev':'MN'},
        {'name':'Mississippi', 'abbrev':'MS'},      {'name':'Missouri', 'abbrev':'MO'},         {'name':'Montana', 'abbrev':'MT'},
        {'name':'Nebraska', 'abbrev':'NE'},         {'name':'Nevada', 'abbrev':'NV'},           {'name':'New Hampshire', 'abbrev':'NH'},
        {'name':'New Jersey', 'abbrev':'NJ'},       {'name':'New Mexico', 'abbrev':'NM'},       {'name':'New York', 'abbrev':'NY'},
        {'name':'North Carolina', 'abbrev':'NC'},   {'name':'North Dakota', 'abbrev':'ND'},     {'name':'Ohio', 'abbrev':'OH'},
        {'name':'Oklahoma', 'abbrev':'OK'},         {'name':'Oregon', 'abbrev':'OR'},           {'name':'Pennsylvania', 'abbrev':'PA'},
        {'name':'Rhode Island', 'abbrev':'RI'},     {'name':'South Carolina', 'abbrev':'SC'},   {'name':'South Dakota', 'abbrev':'SD'},
        {'name':'Tennessee', 'abbrev':'TN'},        {'name':'Texas', 'abbrev':'TX'},            {'name':'Utah', 'abbrev':'UT'},
        {'name':'Vermont', 'abbrev':'VT'},          {'name':'Virginia', 'abbrev':'VA'},         {'name':'Washington', 'abbrev':'WA'},
        {'name':'West Virginia', 'abbrev':'WV'},    {'name':'Wisconsin', 'abbrev':'WI'},        {'name':'Wyoming', 'abbrev':'WY'},
        {'name':'District of Columbia', 'abbrev' : 'DC'}
        );
    var returnthis = false;
    $.each(states, function(index, value){
        if (to == 'name') {
            if (value.abbrev.toLowerCase() == name.toLowerCase()){
                returnthis = value.name;
                return false;
            }
        } else if (to == 'abbrev') {
            if (value.name.toLowerCase() == name.toLowerCase()){
                returnthis = value.abbrev.toUpperCase();
                return false;
            }
        }
    });
    return returnthis;
}