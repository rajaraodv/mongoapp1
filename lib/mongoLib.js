var dbUtil = require('./cloudFoundryUtil');
var conn;

module.exports = {
    connect: function(dbServiceName) {
        dbUtil.connect('mongodb', dbServiceName,
        function(err, connection) {
            if (err || !connection) {
                console.log('Cannot start app without MongoDB');
            } else {
                conn = connection;
            }
        })
    },

	addUser: function(body, callback) {
        conn.collection('users',
        function(err, coll) {
            if (err) {
                callback(err);
                return;
            }

            /* Simple object to insert: ip address and date */
            object_to_insert = {
                'name': body.name,
                'email': body.email,
				'company': body.company
            };

            /* Insert the object then print in response */
            /* Note the _id has been created */
            coll.insert(object_to_insert, {
                safe: true
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, JSON.stringify(object_to_insert));
            });
        });		
	}, 

    record_visit: function(remoteAddress, callback) {
        conn.collection('ips',
        function(err, coll) {
            if (err) {
                callback(err);
                return;
            }

            /* Simple object to insert: ip address and date */
            object_to_insert = {
                'ip': remoteAddress,
                'ts': new Date()
            };

            /* Insert the object then print in response */
            /* Note the _id has been created */
            coll.insert(object_to_insert, {
                safe: true
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, JSON.stringify(object_to_insert));
            });
        });
    },

    existingUsers: function(callback) {
        conn.collection('users',
        function(err, coll) {
            if (err) {
                callback(err);
                return;
            }
            coll.find({},
            {
                limit: 10,
                sort: [['_id', 'desc']]
            },
            function(err, cursor) {
                cursor.toArray(callback);
            });
        });
    }
}

