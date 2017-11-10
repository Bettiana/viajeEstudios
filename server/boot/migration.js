'use strict';

module.exports = function(app) {
    //data sources
    var mysqlDs = app.dataSources.mysqlDs;
    var Usuario = app.models.Usuario;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    
    if(process.env.AUTOMIGRATE) {
        mysqlDs.automigrate(null, function (err) {
            if (err) console.log(err);
            console.log('> Models migrated to tables');
            Usuario.create(
                    {
                        nombre: 'Administrador',
                        apellidos: 'Viajes Educativos',
                        email: process.env.ADMIN_EMAIL,
                        password: process.env.ADMIN_PASSWORD
                    }
            , function (err, user) {
                if (err)
                    throw err;

                //create the admin role
                Role.create({
                    name: 'administrador'
                }, function (err, role) {
                    if (err)
                        throw err;

                    //make bob an admin
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: user.id
                    }, function (err, principal) {
                        if (err)
                            throw err;
                    });
                });
            });

            app.loadFixtures()
            .then(function() {
              console.log('Done!');
            })
            .catch(function(err) {
              console.log('Errors:', err);
            });
        });
    }
}