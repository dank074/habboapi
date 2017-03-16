class UserCard
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            userid: '=userid',
            userinfo: '=userinfo'
        };
		this.templateUrl = 'user-card.directive.html';
    }
}

export default UserCard;