---
title: "Authenticating Terminals"
lang: en-us
---
At Poynt we think of a merchant as an entity that can have multiple stores (or locations) with multiple payment terminal at each location. Therefore when we onboard a new merchant we create a **BUSINESS** object contains one or more **STORE** objects which in turn can contain 0 or more **STOREDEVICE** objects (another name for terminal):

![](https://d347164ulyc57y.cloudfront.net/2017/07/business_store_terminal_model.png)

With this in mind we wanted to give developer flexibility on setting pricing for their apps based on a per terminal, per store or per business basis.

If your application has it's own authentication mechanism (e.g. username and password) and multiple pricing tiers at some point you may need to ensure that the Poynt terminal your application runs has an active billing agreement for the right service tier.

To do that you would have to perform the following steps

1. Make a [getSubscriptions](http://poynt.github.io/developer/appstore/integrating-with-billing.html#in-app-changes) call on the terminal
2. Compare the **businessId** that you received in the getSubscriptions response to the **businessId** of the current terminal. (Pease note that if your subscription is at the store level or terminal level you would also have to make sure **storeId**s and **deviceId**s match)

There are a couple of ways your application can find out terminal's storeId and businessId:

#### Using IPoyntBusinesService

You can call `IPoyntBusinessService.getBusiness()` to get a **Business** object. The business object will contain an array of **Store** objects with only one element - the current store. The **Store** object will contain an array of **StoreDevice** objects again with only one element - the current terminal.

~~~json
{
   "mcc" : "5812",
   "sic" : "5812",
   "legalName" : "Dennis's Biz",
   "businessUrl" : "",
   "doingBusinessAs" : "the poynt shop",
   "timezone" : "America/Los_Angeles",
   "acquirer" : "CHASE_PAYMENTECH",
   "attributes" : {
      "tipScreenTimeoutInMilliSecs" : "4000",
      "automaticSettlementTime" : "2330",
      "validatePANForManualEntry" : "0",
      "merchantContactLastName" : "Smith",
      "customScreenBrightness" : "0",
      "purchaseAction" : "AUTHORIZE",
      "tipType2" : "P",
      "lodgingPromptTotalStayAmount" : "1",
      "maxOfflineTotal" : "10000",
      "receiptScreenTimeoutInMilliSecs" : "3000",
      "signoutAfterTransaction" : "0",
      "closingTime" : "",
      "defaultScreenBrightness" : "-1",
      "showCustomTipByDefault" : "0",
      "skipSignatureAmount" : "2500",
      "reportingContactEmail" : "dennis+joesfoodtruck2@poynt.co",
      "defaultScreenOffTimeoutInSecs" : "-1",
      "merchantBackgroundImageUrl" : "",
      "disableOrderAutoClose" : "0",
      "disableDebit" : "0",
      "stopAfterCardReadRecords" : "0",
      "tipPercent1" : "15",
      "disableEMVCT" : "0",
      "hideCustomerWelcomeMessage" : "0",
      "hideCustomerPaymentIcons" : "0",
      "verifySignature" : "0",
      "disablePaperReceipt" : "0",
      "autoCapture" : "0",
      "automaticReportsTypes" : "TRANSACTIONS,ITEMS",
      "merchantContactFirstName" : "Dennis",
      "tipType3" : "P",
      "settlementMode" : "HOST",
      "operatingHours" : "",
      "tipBeforeCardRead" : "0",
      "tipType1" : "P",
      "tipAmount1" : "100",
      "disableSMSReceipt" : "0",
      "supportContactEmail" : "",
      "viewScope" : "TERMINAL",
      "useVTForManualEntry" : "1",
      "distributorId" : "",
      "autoForwardReceiptScreen" : "0",
      "customerWelcomeMessage" : "",
      "customFooterText" : "",
      "autoSelectCommonDebitAID" : "0",
      "forceEnableVT" : "0",
      "supportContactPhone" : "",
      "localeCountry" : "US",
      "disableEmailReceipt" : "0",
      "signoutAfterSuspend" : "0",
      "productsDisabled" : "0",
      "tipAmount2" : "200",
      "customScreenOffTimeoutInSecs" : "0",
      "autoInventoryUpdate" : "0",
      "maxOfflineTransactions" : "5",
      "lodgingTaxRate" : "0",
      "transactionListLimitSize" : "1000",
      "disableWaitForCardRemoval" : "0",
      "secondScreenLanguages" : "",
      "tipAfterCardRead" : "0",
      "disableOrderInbox" : "0",
      "autoForwardTipScreen" : "0",
      "tipPercent3" : "20",
      "cashbackAmountLimit" : "30000",
      "webOnboarded" : "0",
      "supportedCustomFunding" : "",
      "parentMid" : "",
      "maxOfflineTransactionValue" : "2500",
      "distributorName" : "",
      "tipAmount3" : "300",
      "automaticReportsTime" : "0000",
      "tipPercent2" : "18",
      "customerBackgroundImageUrl" : "",
   },
   "externalMerchantId" : "dennis's933a",
   "address" : {
      "territoryType" : "STATE",
      "line1" : "15685 Business Drive",
      "status" : "ADDED",
      "countryCode" : "USA",
      "territory" : "California",
      "id" : 946,
      "postalCode" : "94301",
      "line2" : "Suite 302",
      "city" : "Palo Alto"
   },
   "activeSince" : {
      "year" : 2015,
      "dayOfMonth" : 20,
      "month" : 6,
      "minute" : 14,
      "hourOfDay" : 16,
      "second" : 35
   },
   "id" : "469e957c-57a7-4d54-a72a-9e8f3296adad",
   "emailAddress" : "dennis@domain.com",
   "phone" : {
      "ituCountryCode" : "1",
      "areaCode" : "999",
      "id" : 946,
      "type" : "BUSINESS",
      "status" : "ADDED",
      "localPhoneNumber" : "1550011",
      "extensionNumber" : "7398"
   },
   "industryType" : "Cafe",
   "description" : "Just another test merchant",
   "status" : "ACTIVATED",
   "type" : "TEST_MERCHANT",
   "stores" : [
      {
         "attributes" : {
            "disablePaperReceipt" : "0",
            "autoCapture" : "0",
            "supportContactEmail" : "",
            "disableEMVCL" : "0",
            "tipBeforeCardRead" : "1",
            "operatingHours" : "",
            "lodgingPromptTotalStayAmount" : "1",
            "hostSettlementTime" : "0000",
            "closingTime" : "",
            "tipScreenTimeoutInMilliSecs" : "4000",
            "validatePANForManualEntry" : "0",
            "purchaseAction" : "SALE",
            "stopAfterCardReadRecords" : "0",
            "disableDebit" : "0",
            "disableOrderAutoClose" : "0",
            "showCustomTipByDefault" : "1",
            "defaultScreenOffTimeoutInSecs" : "72000",
            "reportingContactEmail" : "dennis@domain.com",
            "parentMid" : "",
            "tipAfterCardRead" : "0",
            "disableOrderInbox" : "0",
            "customerBackgroundImageUrl" : "https://domain.com/background.jpg",
            "tipAmount3" : "300",
            "distributorName" : "",
            "localeCountry" : "US",
            "disableEmailReceipt" : "0",
            "customFooterText" : "",
            "viewScope" : "TERMINAL",
            "customerWelcomeMessage" : "",
            "distributorId" : "",
            "customScreenOffTimeoutInSecs" : "1",
            "tipAmount2" : "200",
            "productsDisabled" : "0",
            "tipType3" : "P",
            "automaticReportsTypes" : "TRANSACTIONS,ITEMS",
            "merchantContactFirstName" : "Dennis",
            "hideCustomerWelcomeMessage" : "0",
            "hideCustomerPaymentIcons" : "0",
            "verifySignature" : "0",
            "disableSMSReceipt" : "0",
            "tipAmount1" : "100",
            "tipType1" : "P",
            "settlementMode" : "TERMINAL",
            "signoutAfterTransaction" : "0",
            "receiptScreenTimeoutInMilliSecs" : "3000",
            "tipType2" : "P",
            "maxOfflineTotal" : "10000",
            "defaultScreenBrightness" : "-1",
            "merchantContactLastName" : "Smith",
            "automaticSettlementTime" : "2330",
            "customScreenBrightness" : "0",
            "merchantBackgroundImageUrl" : "",
            "tipPercent1" : "15",
            "skipSignatureAmount" : "100",
            "tipPercent3" : "20",
            "cashbackAmountLimit" : "30000",
            "webOnboarded" : "0",
            "autoForwardTipScreen" : "0",
            "maxOfflineTransactionValue" : "2500",
            "enableGratuity" : "1",
            "tipPercent2" : "18",
            "automaticReportsTime" : "0000",
            "supportContactPhone" : "",
            "autoSelectCommonDebitAID" : "0",
            "signoutAfterSuspend" : "0",
            "useVTForManualEntry" : "0",
            "autoForwardReceiptScreen" : "0",
            "transactionListLimitSize" : "1000",
            "lodgingTaxRate" : "0",
            "maxOfflineTransactions" : "5",
            "autoInventoryUpdate" : "0",
            "secondScreenLanguages" : "",
            "disableWaitForCardRemoval" : "0",
         },
         "currency" : "USD",
         "longitude" : -132.162,
         "acquirer" : "CHASE_PAYMENTECH",
         "fixedLocation" : true,
         "externalStoreId" : "dennis's71f3",
         "id" : "d1f94f81-6257-41ce-83a8-54bf233fc78d",
         "address" : {
            "territory" : "California",
            "countryCode" : "USA",
            "status" : "ADDED",
            "line1" : "15685 Business Drive",
            "territoryType" : "STATE",
            "line2" : "Suite 302",
            "postalCode" : "94301",
            "city" : "Palo Alto",
            "id" : 947
         },
         "displayName" : "Store 2",
         "latitude" : 37.4457,
         "phone" : {
            "localPhoneNumber" : "1550011",
            "status" : "ADDED",
            "type" : "BUSINESS",
            "id" : 947,
            "areaCode" : "180",
            "ituCountryCode" : "1",
            "extensionNumber" : "7398"
         },
         "storeDevices" : [
            {
               "name" : "counter 1",
               "externalTerminalId" : "941a",
               "catalogId" : "d657f867-aebd-4e90-997e-b04839fc027f",
               "status" : "ACTIVATED",
               "deviceId" : "urn:tid:d23eaeca-675f-3766-9c51-f6a0707e2587"
            }
         ],
         "timezone" : "America/Los_Angeles",
         "processor" : "CREDITCALL"
      }
   ],
   "processor" : "CREDITCALL"
}
~~~

To see this API in action please refer to the [sample app](http://bit.ly/2tOvKLk).

#### Using IPoyntTokenService

A second option is to use `IPoyntTokenService.grantToken` API which returns an access token with a set of custom claims which will include **poynt.biz** (or businessId), **poynt.str** (or storeId) and **poynt.did** (deviceId).

To see the usage of this API please refer to the [sample app](http://bit.ly/2gwIYdC).

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
