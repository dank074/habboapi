export default class UserSettingsGeneralController
{
    constructor(Utility, HotelUser, $scope)
    {
        'ngInject';

        this.Utility    = Utility;
        this.HotelUser  = HotelUser;
        this.$scope     = $scope;

        this.$scope.updateHotelUserSettings = () => this.updateHotelUserSettings();
    }
    
    updateHotelUserSettings()
    {
        return this.HotelUser.updateHotelUserSettings()
        
        .then(() =>
        {
            return;
        })

        .catch((err) =>
        {
            return this.Utility.alert('generic.messages.somethingWrong');
        });
    }
}