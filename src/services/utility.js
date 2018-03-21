export default class Utility
{
    constructor($mdDialog, $mdToast, $translate)
    {
        'ngInject';

        this.$mdDialog  = $mdDialog;
        this.$mdToast   = $mdToast;
        this.$translate = $translate;
    }

    alert(message)
    {
        if(message == '' || null) return;

        return this.$translate([message, 'generic.messages.alertTitle', 'generic.buttons.ok'])
        
        .then((text) =>
        {
            return this.$mdDialog.show(
                this.$mdDialog.alert({
                    title: text['generic.messages.alertTitle'],
                    textContent: text[message],
                    ok: text['generic.buttons.ok']
                }));
        });
    }

    toast(message)
    {
        if(message == '' || null) return;

        return this.$translate(message)
        
        .then((text) =>
        {
            return this.$mdToast.show(
                this.$mdToast.simple({
                    hideDelay: 3000,
                    textContent: text
                }));
        });
    }
}