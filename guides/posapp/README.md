---
title: Building a POS App
sidebar: true
---

# Building your first POS App

[[toc]]

## Getting Started

1. Create an Android studio project with target SDK 19.
2. Add [Poynt SDK](/info/poynt-sdk.md) to your app 


## Onboarding and Authentication

### Onboarding a Merchant

#### Sign-up from Website
In case you have a web component in your application or if you would like to sign up the merchant on your website then using Poynt Merchant login URL makes the flow streamlined.

[Sign-up with poynt](https://poynt.net/applications/authorize?client_id=urn:aid:f6a97531-d772-40a8-916e-4503bf188043&redirect_uri=https%3A%2F%2Fpoynt.com)

The response url looks something like this 
```
{URL}?businessId=e3038712-3a08-4a85-859e-c8e0c4b4509d&code=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3BveW50Lm5ldCIsImlhdCI6MTU0NjYyNzE5MiwiZXhwIjoxNTQ2NjI4MDkyLCJzdWIiOiJ1cm46YWlkOmY2YTk3NTMxLWQ3NzItNDBhOC05MTZlLTQ1MDNiZjE4ODA0MyIsInBveW50LmJpeiI6ImUzMDM4NzEyLTNhMDgtNGE4NS04NTllLWM4ZTBjNGI0NTA5ZCIsInBveW50LnVpZCI6MzQ0MTUwODN9.LKX6dSg5hf-xtz0M0uvFtZSOgGKfd90re9z3GouIAkLQo2Yo1AlvAm2Gz43ZvCGyczGDwf7Ja49RE4I4p1iLI75oyhDxn9CRblpDH-HVEoAFVQKmwWFCImwByziKGCwJakCG2KeiZqBISHrqBngMYmIdJCm4PB-znhxBUEXM9X6Ce6UWR7oqcpqwki7majb1Z7rsNEq2Lkj6ORMTqbapsAi2TwuyxSccEnIDvc3RZhF-btPZ5779CrqJz_6ipfHLH5DSo9wQ1fgA9vN_TaVGvZCz7lJV3V2Cvk6iUe3AUOyZk-iN-xHz1DoNt6K2pXhSTPGh_Gj_fjjGk6pBEvkXOA&status=success
```
- **businessId(Deprecated)** : The business ID that was authorized <br>
- **code** : Encoded JWT with info
- **status** : _success_ or _fail_

The code is an Encoded JWT, decoding it gives you 
```JSON
{
  "iss": "https://poynt.net",
  "iat": 1546627192,
  "exp": 1546628092,
  "sub": "urn:aid:f6a97531-d772-40a8-916e-4503bf188043",
  "poynt.biz": "e3038712-3a08-4a85-859e-c8e0c4b4509d",
  "poynt.uid": 34415083
}
```
- **sub** : The appId that is authorized(in case you have mutiple apps this can come in handy) <br>
- **poynt.biz** : The business ID that was authorized <br>
- **poynt.uid** : Poynt user that performed authentication


### How to get business info after loggig in?

#### Sign-up on Terminal

If you choose to sign-up the merchant on the terminal, cheer the merchant by pre-filling the infromation that you can obtain from Poynt Business Service




### Authentication

#### Fetch the current logged in user
``` JAVA {1}
    sessionService.getCurrentUser(listener);

    private IPoyntSessionServiceListener listener = new IPoyntSessionServiceListener.Stub() {
        @Override
        public void onResponse(Account account, PoyntError poyntError) throws RemoteException {
            Log.d(TAG, account.name);
        }
    };
```
#### Prompt for login
``` JAVA
    private View.OnClickListener loginClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            Log.d(TAG, "Login clicked");
            accountManager.getAuthToken(Constants.Accounts.POYNT_UNKNOWN_ACCOUNT,
                    Constants.Accounts.POYNT_AUTH_TOKEN, null, IntroActivity.this,
                    new OnUserLoginAttempt() , null);
        }
    };
```

``` JAVA
    public class OnUserLoginAttempt implements AccountManagerCallback<Bundle>{
        public void run(AccountManagerFuture<Bundle> accountManagerFuture) {
            try {
                Bundle bundle = accountManagerFuture.getResult();
                String user = (String) bundle.get(AccountManager.KEY_ACCOUNT_NAME);
                String authToken = (String) bundle.get(AccountManager.KEY_AUTHTOKEN);
                if (authToken != null) {
                    Toast.makeText(IntroActivity.this, user + " successfully logged in", Toast.LENGTH_LONG).show();
                    Intent loginIntent = new Intent(IntroActivity.this, MainActivity.class);
                    startActivity(loginIntent);
                } else {
                    Toast.makeText(IntroActivity.this, "Login failed", Toast.LENGTH_SHORT).show();
                }
            } catch (OperationCanceledException e) {
                e.printStackTrace();
                Toast.makeText(IntroActivity.this, "Login cancelled", Toast.LENGTH_SHORT).show();
            } catch (IOException | AuthenticatorException e) {
                e.printStackTrace();
            }
        }
    }
```


## Taking Payments
Poynt Payment Fragment provides a secure and consistent payment experience for merchants and consumers across all applications running on Poynt Smart Terminals. Payment Fragments securely process payment transactions at the Poynt OS level, so your apps do not need to worry about handling the variety of payment methods, the payment process and compliance (e.g. PCI).

:::warning Making payments
All apps on Poynt terminals need to use payment fragment for all transactions including cash.
:::
### Simple payment
Receiving a payment can be as simple as creating a payment object and starting the intent to launch payment fragment. Once the payment is complete you get the result on onActivityResult.

```JAVA
    Payment payment = new Payment();
    payment.setAmount(amount);
    payment.setCurrency(currencyCode);

    // start Payment activity for result
    try {
        Intent collectPaymentIntent = new Intent(Intents.ACTION_COLLECT_PAYMENT);
        collectPaymentIntent.putExtra(Intents.INTENT_EXTRAS_PAYMENT, payment);
        startActivityForResult(collectPaymentIntent, COLLECT_PAYMENT_REQUEST);
    } catch (ActivityNotFoundException ex) {
        Log.e(TAG, "Poynt payment activity not found - did you install PoyntServices?", ex);
    }
```

Payment result contains the transaction information, there might be more than once transaction for the same payment.

```JAVA
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == COLLECT_PAYMENT_REQUEST){
            if (resultCode == Activity.RESULT_OK){
                final Payment payment = data.getParcelableExtra(Intents.INTENT_EXTRAS_PAYMENT);
                Log.d(TAG, "Received onPaymentAction from PaymentFragment w/ Status("
                        + payment.getStatus() + ")");
                // We just need to look at the payment status, the rest of the information is in the transaction object
                switch (payment.getStatus()) {
                    case COMPLETED:
                        if (payment.getTransactions() != null &&  payment.getTransactions().size() > 0) {
                            // Payment object has a list of transactions 
                        }
                        break;
                    case CANCELED:
                            // Payment was cancelled
                        break;
                        ...
                        ...
                        ...
                }
            } else if(resultCode == Activity.RESULT_CANCELED){
                // Payment was cancelled by the user
            }
        }
    }
```

### Customizing the payment
The payment can be customized according to the requirements. Let's say you would like to pre-set the Tip or accept payment with debit cards only, then these can be done by setting additional parameters available on payment object.

##### Disable payment options
- **disableDebit  (boolean)** - disables debit card option <br>
- **disableCheck  (boolean)** - disables check option <br>
- **disableOther  (boolean)** - disables “other” option (Gift cards or - custom payment providers) <br>
- **disableManual (boolean)** - disables manual entry <br>
- **disableEMVCT  (boolean)** - disables EMV (chip card) payment <br>
- **disableEMVCL  (boolean)** - disables contactless payments <br>
- **disableMSR    (boolean)** - disables payments with magstripe cards <br>
- **disableCash   (boolean)** - disables cash option <br>

##### Restict to a certain funding source

- **cashOnly (boolean)**    - launches Payment Fragment directly into the cash flow <br>
- **debitOnly (boolean)**   - only allow debit card payment <br>
- **creditOnly (boolean)**  - only allow payment by credit <br>
- **manualEntry (boolean)** - launch Payment Fragment into manual card entry flow <br>

##### Skip screens in the payment flow
- **disableTip (boolean)**          - disables tip if the merchant account is configured to present tip screen. <br>
- **skipReceiptScreen (boolean)**   - do not show the receipt screen <br>
- **skipSignatureScreen (boolean)** - do not show signature screen <br>
- **skipPaymentConfirmationScreen (boolean)** - Displays processing screen as opposed to Thank you screen after a payment is complete. <br>

##### Additional options
- **readCardDataOnly (boolean)** - do not process transaction just return some information about the card (e.g. last 4, first 6, name) <br>
- **offlineAuth (boolean)** - process offline transaction. Can be used if there is no network connectivity. Merchant will be prompted to provide an approval code they obtained from the issuing bank. <br>
- **offlineApprovalCode (String)** - optionally the approval code can be passed in the request to launch Payment Fragment. <br>
- **disablePaymentOptions (boolean)** - hide the “Summary”, “Notes” and “Receipt” options from the Payment Fragment. <br>
- **disableChangeAmount (boolean)** - if the payment fragment is invoked to perform refund or capture, setting this flag to “true” will not allow the merchant to edit the amount, i.e. no partial capture or partial refund. <br>
- **notes (String)** - custom notes which will be added to the transaction <br>
- **setReferences (List\<TransactionReference\> references)** - Pass custom references that will be applied to transactions <br>
## Catalog & Inventory
Poynt OS has support for catalog and inventory out of the box. [Poynt product service](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntProductService.html) provides a way to access the catalog from the terminal. 

:::tip
[Catalog model](https://poynt.com/docs/api/#model-catalog)
[Product model](https://poynt.com/docs/api/#model-product)
:::
### Fetching catalog
Product service provides multiple ways of accesing the catalog. You could either get all products alone or get the complete catalog with the categories and metadata.
The following code shows fetching the entire catalog from the local content provider or from the cloud.
```JAVA
try {
    productService.getRegisterCatalogWithProducts(catalogWithProductListener);
    // Limit the use of this method since it fetches from the cloud, it is data intensive
    // productService.getRegisterCatalogWithProductsFromCloud(catalogWithProductListener);
} catch (RemoteException e) {
    e.printStackTrace();
}

private IPoyntProductCatalogWithProductListener catalogWithProductListener = new IPoyntProductCatalogWithProductListener.Stub() {
    @Override
    public void onResponse(CatalogWithProduct catalogWithProduct, PoyntError poyntError) throws RemoteException {
        if (poyntError == null) {
            try {
                // CatalogWithProduct has a list of CategoryWithProduct
                // CategoryWithProduct has a list of CatalogItemWithProduct
                // CatalogItemWithProduct has the actual Product
            } catch (Exception e) {
                Log.d(TAG, e.toString());
            }
        } else {
            Log.e(TAG, poyntError.toString())
        }
    });
};
```

### Updating product information
Updating a product can be done from a terminal app.
Here is how to update the product in 3 steps,
1. Create a json patch for the fields that need to be updated
```JAVA

public static String getProductPatch(Product product) {
        List<JsonPatchElement> patchElements = new ArrayList<JsonPatchElement>();
        JsonArray patchArray = new JsonArray();
        if (product!= null) {
            // price
            if (product.getPrice() != null) {
                // update
                JsonPatchElement<Long> priceElement = new JsonPatchElement<>();
                priceElement.setOp("add");
                priceElement.setPath("/price/amount");
                priceElement.setValue(product.getPrice().getAmount());
                patchElements.add(priceElement);
            } else {
                // remove
                JsonPatchElement<Long> priceElement = new JsonPatchElement<>();
                priceElement.setOp("remove");
                priceElement.setPath("/price/amount");
                patchElements.add(priceElement);
            }
        }
        JsonElement patch = new Gson().toJsonTree(patchElements);
        return patch.toString();
    }
```
2. Send the json patch to update the product.
```JAVA
productService.updateProduct(product.getId(), getProductPatch(product), productServiceListener);
```

3. Refresh the local catalog by fetching from the cloud

## Orders

## Scanning Products

## Collecting Customer Info

## Processing Payments

## Printing Receipts

## Post Sale Operations

## Settlements

## Offline Mode

## Poynt Cloud Messaging
