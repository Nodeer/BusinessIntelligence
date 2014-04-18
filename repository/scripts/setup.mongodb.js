db.permissions.save({
    _id: ObjectId("532eec516bf6971c899129e5"),
    name: 'task.create',
    description: 'Capability to Create New Tasks.'
});
db.permissions.save({
    _id: ObjectId("532eebf66bf6971c899129e2"),
    name: 'task.read',
    description: 'Capability to View Tasks.'
});
db.permissions.save({
    _id: ObjectId("532eec1d6bf6971c899129e3"),
    name: 'task.update'
});
db.permissions.save({
    _id: ObjectId("532eed3b6bf6971c899129e9"),
    name: 'task.delete'
});

db.permissions.save({
    _id: ObjectId("534bd4066bf6971c89912a01"),
    name: 'management.read'
});

db.permissions.save({
    _id: ObjectId("534bd0f36bf6971c899129fe"),
    name: 'management.user.read'
});
db.permissions.save({
    _id: ObjectId("534bd12b6bf6971c899129ff"),
    name: 'management.user.update'
});


db.groups.save({
    _id: ObjectId("5346ba2f6bf6971c899129f9"),
    name: 'User',
    permissions: [ ObjectId("532eebf66bf6971c899129e2") ]
});
db.groups.save({
    _id: ObjectId("5346ba2f6bf6971c899129fa"),
    name: 'Business Analyst',
    permissions: [ ObjectId("532eec516bf6971c899129e5"), ObjectId("532eec1d6bf6971c899129e3"), ObjectId("532eed3b6bf6971c899129e9") ]
});
db.groups.save({
    _id: ObjectId("5346ba2f6bf6971c899129fb"),
    name: 'Developer',
    permissions: [  ]
});
db.groups.save({
    _id: ObjectId("5346ba2f6bf6971c899129fc"),
    name: 'Quality Assurance',
    permissions: [  ]
});
db.groups.save({
    _id: ObjectId("5346ba2f6bf6971c899129fd"),
    name: 'Project Manager',
    permissions: [  ]
});
db.groups.save({
    _id: ObjectId("534bd1646bf6971c89912a00"),
    name: 'Administrator',
    permissions: [ ObjectId("534bd0f36bf6971c899129fe"), ObjectId("534bd12b6bf6971c899129ff"), ObjectId("534bd4066bf6971c89912a01") ]
});
