var videoStore = new FS.Store.S3("videos", {
  accessKeyId: "AKIAI7XH62LZZT7QPFOQ", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "videocollectionfs", //required
  ACL: "", //optional, default is 'private', but you can allow public or secure access routed through your app URL
  folder: "videoproject/", //optional, which folder (key prefix) in the bucket to use
  // The rest are generic store options supported by all storage adapters
  maxTries: 1 //optional, default 5
});

Videos = new FS.Collection("videos", {
  stores: [videoStore]
});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    },
    videos:function(){
      return Videos.find();
    }
  });

  Template.hello.events({
    'change .fileInput':function(evt,tmpl){
      FS.Utility.eachFile(event,function(file){
        var fileObj = new FS.File(file);
        Videos.insert(fileObj),function(err){
          console.log(err);
        }
      })
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}