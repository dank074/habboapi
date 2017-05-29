class UserCardDirective
{
    constructor()
    {
        this.restrict       = 'E';
        this.replace        = true;
        this.templateUrl    = 'views/user.card.html';
        this.scope          = {
            userinfo: '=userinfo'
        };
    }
}

export default UserCardDirective;