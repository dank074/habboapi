class ClientDirective
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            habboswf: '=habboswf',
            habbobase: '=habbobase',
            flashvars: '=flashvars'
        }
    }

    link(scope, element, attrs)
    {
        element.replaceWith('<object id="flash-container" type="application/x-shockwave-flash" data="' + scope.habboswf + '" width="100%" height="100%"><param name="base" value="' + scope.habbobase + '"><param name="allowScriptAccess" value="always"><param name="menu" value="false"><param name="wmode" value="opaque"><param name="flashvars" value="' + scope.flashvars + '"></object>');
    }
}

export default ClientDirective;