exports.findOrCreate = function (data, done) {
    var self = this;

    /* Facebook */
    if (data.facebookId) {
        self.all({
            where: {
                facebookId: data.facebookId
            }, limit: 1
        }, function (err, user) {
            if(user[0]) return done(err, user[0]);
            self.create({
                facebookId: data.facebookId,
                profile: data.profile
            }, done);
        });
    } else

    /* GITHUB */
    if (data.githubId) {
        self.all({
            where: {
                githubId: data.githubId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            self.create({
                githubId: data.githubId,
                displayName: data.profile.displayName || data.profile.username
            }, done);
        });
    } else

    /* GOOGLE OPENID */
    if (data.openId) {
        self.all({
            where: {
                googleId: data.openId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            self.create({
                displayName: data.profile.displayName,
                email: data.profile.emails[0].value,
                googleId: data.openId
            }, done);
        });
    } else

    /* LINKEDIN */
    if (data.linkedinId) {
        self.all({
            where: {
                linkedinId: data.linkedinId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            self.create({
                displayName: data.profile.displayName,
                linkedinId: data.linkedinId
            }, done);
        });
    } else

    /* LOCAL */
    if (data.email) {
        User.all({
            where: {
                email: data.email
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            if (!user[0]) return done(err);
        });
    } else

    /* SOMETHING NOT KNOWN YET */
    {
        console.log(data.profile);
    }
};

/** Example user schema (jugglingdb + railwayjs):
 *
 * define('User', function () {
 *     property('displayName', String);
 *     property('email', String, { index: true });
 *     property('googleId', String, { index: true });
 *     property('githubId', String, { index: true });
 *     property('linkedinId', String, { index: true });
 * });
 */

