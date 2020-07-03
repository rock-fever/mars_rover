var findShortestPath = function(startCoordinates, grid) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };

  // Initialize the queue with the start location already inside
  var queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();

    // Explore North
    var newLocation = exploreInDirection(currentLocation, 'North', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore East
    var newLocation = exploreInDirection(currentLocation, 'East', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    var newLocation = exploreInDirection(currentLocation, 'South', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    var newLocation = exploreInDirection(currentLocation, 'West', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
    
    //these are the cases for the diagonal movement
    var newLocation = exploreInDirection(currentLocation, 'North East', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
    
    var newLocation = exploreInDirection(currentLocation, 'South East', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
    
    var newLocation = exploreInDirection(currentLocation, 'North West', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
    
     var newLocation = exploreInDirection(currentLocation, 'South West', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;

};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function(location, grid) {
  var gridSize = grid.length;
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (grid[dft][dfl] === 'Goal') {
    return 'Goal';
  } else if (grid[dft][dfl] !== 'Empty') {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else {
    return 'Valid';
  }
};


// Explores the grid from the given location in the given
// direction
//here for the diagonal movements we will add the mixed directions 
var exploreInDirection = function(currentLocation, direction, grid) {
  var newPath = currentLocation.path.slice();
  //newPath.push(direction);
	if(direction==="East")
		{
			newPath.push([currentLocation.distanceFromTop,currentLocation.distanceFromLeft+1]);
		}
	else if(direction==="West")
		{
			newPath.push([currentLocation.distanceFromTop,currentLocation.distanceFromLeft-1]);
		}
	else if(direction==="South")
		{
			newPath.push([currentLocation.distanceFromTop+1,currentLocation.distanceFromLeft]);
		}
	else if(direction==="North")
		{
			newPath.push([currentLocation.distanceFromTop-1,currentLocation.distanceFromLeft]);
		}
	//these are for the diagonal cases
	
	else if(direction==="North East")
		{
			newPath.push([currentLocation.distanceFromTop-1,currentLocation.distanceFromLeft+1]);
		}
	else if(direction==="North West")
		{
			newPath.push([currentLocation.distanceFromTop-1,currentLocation.distanceFromLeft-1]);
		}
	else if(direction==="South West")
		{
			newPath.push([currentLocation.distanceFromTop+1,currentLocation.distanceFromLeft-1]);
		}
	else if(direction==="South East")
		{
			newPath.push([currentLocation.distanceFromTop+1,currentLocation.distanceFromLeft+1]);
		}
  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }
  //these are the cases for the diagonal movement
  else if (direction === 'North East') {
      dfl+=1;
      dft-=1;
  } else if (direction === 'South East') {
      dfl+=1;
      dft+=1;
  } else if (direction === 'North West') {
      dfl-=1;
      dft-=1;
  } else if (direction === 'South West') {
      dfl-=1;
      dft+=1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, grid);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }
  return newLocation;
};


//here i have considered the example test case 
var gridSize = 6;       //we can change this to the gridsize of our grid
var grid = [];
for (var i=0; i<gridSize; i++) {
  grid[i] = [];
  for (var j=0; j<gridSize; j++) {
    grid[i][j] = 'Empty';
  }
}

var startX=1;           // we'll manipulate them according to the coordinates we receive after the user drags the red and green buttons.
var startY=0;  
var goalX=5;
var goalY=4;

grid[startX][startY] = "Start";
grid[goalX][goalY] = "Goal";

var obstacles=[[1,2],[1,3],[3,2],[4,1],[4,4],[5,1],[5,2]]; 
for(var i=0;i<obstacles.length;i++)
{
    grid[obstacles[i][0]][obstacles[i][1]]="obstacle";
}

var finalpath=findShortestPath([startX,startY], grid);
for(var i=0;i<finalpath.length;i++)
	{
		console.log(finalpath[i][0]+" "+finalpath[i][1]+" ");
	}