#import <Cordova/CDV.h>

@interface CordovaStripe : CDVPlugin

- (void) createCardToken:(CDVInvokedUrlCommand*)command;

@end
