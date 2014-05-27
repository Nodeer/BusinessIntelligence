db.users.save({
    _id: ObjectId("5363b245e512039025564423"),
    email: "admin@host.com",
    avatar: "uploads/unknown_user.png",
    password : "91c54916c8b6fa06a009556033c0b6a8165a43dc74e92b9bfc113e7d7f0f3705",
    groups : [ 
        ObjectId("5346ba2f6bf6971c899129f9"), 
        ObjectId("534bd1646bf6971c89912a00")
    ]
});
db.users.save({
    _id: ObjectId("5369a77fa505b604ec7a1c7a"),
    email: "businessanalyst@host.com",
    avatar: "uploads/unknown_user.png",
    password : "91c54916c8b6fa06a009556033c0b6a8165a43dc74e92b9bfc113e7d7f0f3705",
    groups : [ 
        ObjectId("5346ba2f6bf6971c899129f9"), 
        ObjectId("5346ba2f6bf6971c899129fa")
    ]
});