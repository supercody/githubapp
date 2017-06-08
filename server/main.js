import { Meteor } from 'meteor/meteor';

const gh = new GitHub({
  version: "3.0.0",
  debug: true,
  timeout: 5000,
});
gh.authenticate({
  type: 'oauth',
  key: '2c1e3d345e1e5115d994',
  secret: '3b0d455160ebf5fcf949031b420789e875ba05ac'
});

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({

  'findUser'(user){
    // var result = gh.user.getFollowingFromUser({
    //   user: user
    // });
    // return JSON.stringify(result);

    var result;
    var nextPage;
    gh.user.getFollowingFromUser({
      user: user
    }, function(err, res){
      result = res;
      if(gh.hasNextPage(res)){
        console.log("Has another Page");
        nextPage = true
      }
    });
    result = JSON.stringify(result);
    return  [result, nextPage];
  }
});
