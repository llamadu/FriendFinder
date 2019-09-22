var friends = require("../data/friends.js")

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });
  
  // Create friend / take in JSON
  app.post("/api/friends", function(req, res) {
    var totalDifference = 0;
    var bestFriend = {
      name: "",
      photo: "",
      friendDifference: 1000
    };
    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };
    
    console.log("Name: " + userName);
    console.log("User score: " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);
    console.log("Sum of user's score: " + sum);
    console.log("Best match: " + bestFriend.friendDifference);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;
      console.log("Total difference: " + totalDifference);
      console.log("Best match of friend difference: " + bestFriend.friendDifference);
      
      var bestFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      console.log("Total friend score: " + bestFriendScore);
      totalDifference += Math.abs(sum - bestFriendScore);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>" + totalDifference);

      if (totalDifference <= bestFriend.friendDifference) {
        bestFriend.name = friends[i].name;
        bestFriend.photo = friends[i].photo;
        bestFriend.friendDifference = totalDifference;
      }
      console.log(totalDifference + " Total Difference"); 
    }
    console.log(bestFriend);
    friends.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(bestFriend); 
  }); 
}; 


  