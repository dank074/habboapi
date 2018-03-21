export default class UserClientController
{
    constructor(AppConstants, Session, $localStorage, $translate, $state, $stateParams, $timeout, $scope)
    {
        'ngInject';

        this.AppConstants   = AppConstants;
        this.Session        = Session;
        this.$localStorage  = $localStorage;
        this.$translate     = $translate;
        this.$state         = $state;
        this.$stateParams   = $stateParams;
        this.$timeout       = $timeout;
        this.$scope         = $scope;

        this.$scope.roomId = (this.$stateParams.roomId == undefined || null || this.$stateParams.roomId == '0') ? 0 : this.$stateParams.roomId;

        this.loadClient();

        window.parent.HabboFlashClient = {
            started: false,
            flashInterface: document.getElementById("client"),
            init: () =>
            {
                document.getElementById("client") || console.error('Invalid FlashClient. Unable to initialize FlashInterface');
                window.parent.HabboFlashClient.started = true;
            }
        };

        this.loadFlashExternalInterface();
        window.addEventListener("message", this.processMessage);
        window.addEventListener("load", window.parent.HabboFlashClient.init());
    }

    loadClient()
    {
        this.Session.ping()

        .then(() =>
        {
            let flashVars = {
                "connection.info.host"          : this.AppConstants.client.clientHost,
                "connection.info.port"          : this.AppConstants.client.clientPort,
                "url.prefix"                    : this.AppConstants.siteLink + "/",
                "site.url"                      : this.AppConstants.siteLink + "/",
                "client.reload.url"             : this.AppConstants.siteLink + "/client",
                "client.fatal.error.url"        : this.AppConstants.siteLink + "/client",
                "client.connection.failed.url"  : this.AppConstants.siteLink + "/client",
                "external.variables.txt"        : this.AppConstants.client.clientVariables,
                "external.texts.txt"            : this.AppConstants.client.clientTexts,
                "productdata.load.url"          : this.AppConstants.client.clientProductData,
                "furnidata.load.url"            : this.AppConstants.client.clientFurniData,
                "external.figurepartlist.txt"   : this.AppConstants.client.clientFigureList,
                "client.starting.revolving"     : this.$translate.instant('client.revolving'),
                "use.sso.ticket"                : "1",
                "sso.ticket"                    : this.$localStorage.currentUser.habbo.auth_ticket,
                "processlog.enabled"            : "0",
                "flash.client.url"              : this.AppConstants.client.clientBase,
                "flash.client.origin"           : "popup",
                "client.allow.cross.domain"     : "1",
                "client.notify.cross.domain"    : "0",
                "has.identity"                  : "1",
                "spaweb"                        : "1",
                "unique_habbo_id"               : this.$localStorage.currentUser.id,
                "account_id"                    : this.$localStorage.currentUser.id,
            };
    
            let params = {
                "base"              : this.AppConstants.client.clientBase,
                "allowScriptAccess" : "always",
                "menu"              : "false"
            };
    
            swfobject.embedSWF(this.AppConstants.client.clientSwf, "client", "100%", "100%", "10.0.0", "", flashVars, params, null);    
        })

        .catch((err) =>
        {
            return err;
        })

    }

    loadFlashExternalInterface()
    {
        window.parent.FlashExternalInterface                = {};
        window.parent.FlashExternalInterface.disconnect     = () => this.loadClient();
        window.parent.FlashExternalInterface.logout         = () => document.getElementById("clientLogout").click();
        window.parent.FlashExternalInterface.openAvatars    = () => this.$state.go('home.settings.general');
        window.parent.FlashExternalInterface.openMinimail   = () => console.log('openMinimail');
        window.parent.FlashExternalInterface.openHabblet    = (page) => { if(page == 'avatars') this.$state.go('home.settings.general'); }
        window.parent.FlashExternalInterface.legacyTrack    = (action, label, value) => {
            if(action == 'authentication' && label == 'authok')
            {
                this.$localStorage.currentUser.habbo.online = '1';

                if(this.$scope.roomId == 0) return;

                this.$timeout(() =>
                {
                    document.getElementById("client").openlink('navigator/goto/' + this.$scope.roomId);
                }, 3000);
            }
        }


        //window.parent.FlashExternalInterface.heartBeat           = () => console.log('heartBeat');
        //window.parent.FlashExternalInterface.closeHabblet        = (n) => console.log(n);
        //window.parent.FlashExternalInterface.track               = (action, label, value) => console.log(action + ' ' + label + ' ' + value);
        //window.parent.FlashExternalInterface.logCrash            = (crash) => console.log('crash ' + crash);
        //window.parent.FlashExternalInterface.logDebug            = (debug) => console.log('debug ' + debug);
        //window.parent.FlashExternalInterface.logError            = (error) => console.log('error ' + error);
        //window.parent.FlashExternalInterface.logWarn             = (warn) => console.log('warn ' + warn);
        //window.parent.FlashExternalInterface.showInterstitial    = () => console.log('showInterstitial');
        //window.parent.FlashExternalInterface.updateFigure        = () => console.log('updateFigure');
        //window.parent.FlashExternalInterface.updateName          = () => console.log('updateName');
        //window.parent.FlashExternalInterface.openNews            = () => console.log('openNews');
        //window.parent.FlashExternalInterface.subscriptionUpdated = (subscription) => console.log('subscription ' + subscription);
        //window.parent.FlashExternalInterface.openExternalPage    = (page) => console.log(page);
        //window.parent.FlashExternalInterface.openPage            = (page) => console.log('go page' + page);
        //window.parent.FlashExternalInterface.openWebHabblet      = (page) => console.log('go web hablet' + page);
    }

    processMessage(data)
    {
        if(data.data == undefined || null) return;
        if(data.data.call == undefined || null) return;
        if(data.data.target == undefined || null) return;

        if(data.data.call == 'open-link') return document.getElementById("client").openlink(data.data.target);
        if(data.data.call == 'open-room') return document.getElementById("client").openlink('navigator/goto/' + data.data.target);
    }
}