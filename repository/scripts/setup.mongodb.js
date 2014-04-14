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



db.groups.save({
    name: 'User',
    permissions: [ ObjectId("532eebf66bf6971c899129e2") ]
});
db.groups.save({
    name: 'Business Analyst',
    permissions: [ ObjectId("532eec516bf6971c899129e5"), ObjectId("532eec1d6bf6971c899129e3"), ObjectId("532eed3b6bf6971c899129e9") ]
});
db.groups.save({
    name: 'Developer',
    permissions: [  ]
});
db.groups.save({
    name: 'Quality Assurance',
    permissions: [  ]
});
db.groups.save({
    name: 'Project Manager',
    permissions: [  ]
});
