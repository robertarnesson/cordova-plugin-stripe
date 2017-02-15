// injects Stripe.js into the browser
(function() {
    var s = document.createElement('script');
    s.src = 'https://js.stripe.com/v2/';
    s.type = 'text/javascript';
    s.async = true;
    s.onload = function() {
        Stripe.setPublishableKey("PUBLISHABLE_KEY");
    };
    document.getElementsByTagName('head')[0].appendChild(s);
})();

module.exports = {

    createCardToken: function(cardObject, successCallback, errorCallback){
        try {
            Stripe.card.createToken(cardObject,function(status,response){
                if(response.error){
                    errorCallback(response.error);
                } else {
                    successCallback(response.id);
                }
            })
        } catch (error) {
            errorCallback(error)
        }
    }

};

require('cordova/exec/proxy').add('CordovaStripe', module.exports);