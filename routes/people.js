exports.list = function(req, res){
	
  var sql = require('node-sqlserver');
  
  var connectionString = "Driver={SQL Server Native Client 11.0};Server={(local)};Database={BusinessIntelligence};User Id={bi};Password={dajklhjklmdas02};"
  
  sql.open(connectionString, function(err, conn) {
	var command = 'SELECT * FROM [dbo].[Task]';
	conn.queryRaw(command, function(err, results) {
		alert(results);
	});
  });

  res.render('./people.html', {});
};