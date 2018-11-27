# Building Loyalty Apps
[[toc]]
## Overview
PoyntOS SDK provides an easy way for third party apps to register as a loyalty service on the terminal by implementing IPoyntLoyaltyService interface. The solution will work with any POS application that deals with orders on the Poynt OS. 
## App Components

- Loyalty capability configuration *(loyalty_capability.xml)*
- Service implementing [IpoyntLoyaltyService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntLoyaltyService.html)
- Activity to input additional information such as PIN from merchant. *(if needed)*

### Loyalty Capability Configuration
This configuration file provides the necessary information for PoyntOS to discover and register this application as a loyalty provider when the app gets installed on the terminal. This config file should be located in res/xml directory of your app and referenced from your app’s manifest:

```xml
<?xml version="1.0" encoding="utf-8"?>
<capability>
    <!-- Use the package name as the capability identifier-->
    <appid>co.poynt.posapp</appid>
    <!-- capability supported by this app -->
    <type>LOYALTY</type>
    <!-- descriptive name of this capability. This name will show in Payment Fragment options menu-->
    <provider>POS Loyalty</provider>
    <!-- not used currently -->
    <logo>@mipmap/ic_launcher</logo>
    <!-- custom entry mode managed by capability  -->
    <entry_method type="CUSTOM" />
</capability>
```
Exporting your capability service and referencing the loyalty capability configuration:
```xml{11}
 <!-- Loyalty service and the activity needs to be exported-->
 <service
    android:name=".services.LoyaltyService"
    android:enabled="true"
    android:exported="true">
    <intent-filter>
        <action android:name="co.poynt.os.services.v1.IPoyntLoyaltyService"/>
    </intent-filter>
    <meta-data
         android:name="co.poynt.os.service.capability"
         android:resource="@xml/loyalty_capability"/>
 </service>
 <!-- Activity to fetch additional information from merchant or user -->
 <activity
    android:name=".activities.LoyaltyActivity"
    android:exported="true"/>
```
### Implementing IPoyntLoyaltyService interface
 Your Android Service class needs to implement IPoyntLoyaltyService interface’s process() method and after verifying that the Payment object has an Order perform one of the following steps:

1. Create a Discount object, update the Order object and call loyaltyApplied(payment, requestId) on the listener to return control back to the Payment Fragment
2. If discount cannot be applied call noLoyaltyApplied(requestId) on the listener
3. If additional input from merchant or customer is required (e.g. customer needs to check in, etc.), create an Intent and return it to the Payment Fragment using listener’s. onLaunchActivity(intent, requestId) callback. Payment Fragment will launch your activity using the intent provided. *(Highlighted code in the sample)*
```java{16-20}
public class LoyaltyService extends Service {
    public static final String TAG = LoyaltyService.class.getSimpleName();

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    private final IPoyntLoyaltyService.Stub mBinder = new IPoyntLoyaltyService.Stub() {
        @Override
        public void process(Payment payment, String requestId, IPoyntLoyaltyServiceListener iPoyntLoyaltyServiceListener) throws RemoteException {
            Log.d(TAG, "Process Payment");
            // Apply discount if there is an order associated with the payment
            if (payment.getOrder() != null) {

                /* Use this block of code to launch an activity to collect additional information
                Intent intent = new Intent(Intents.ACTION_PROCESS_LOYALTY);
                intent.setComponent(new ComponentName(getPackageName(), LoyaltyActivity.class.getName()));
                intent.putExtra("payment", payment);
                iPoyntLoyaltyServiceListener.onLaunchActivity(intent, requestId);*/


                Order order = payment.getOrder();

                // Create a Discount object
                Discount loyaltyDiscount = new Discount();
                loyaltyDiscount.setAmount(-200l); // discount is always negative
                loyaltyDiscount.setCustomName("Loyalty Discount");
                loyaltyDiscount.setProcessor(getPackageName());

                // Get the existing discounts from order and add the new discount to it
                List<Discount> orderDiscounts = order.getDiscounts() != null ? order.getDiscounts() : new ArrayList<>();
                orderDiscounts.add(loyaltyDiscount);
                order.setDiscounts(orderDiscounts);

                // Update the discount total in order amounts
                long discountAmount = order.getAmounts().getDiscountTotal();
                discountAmount += loyaltyDiscount.getAmount();
                order.getAmounts().setDiscountTotal(discountAmount);

                // Add the discount to net total to reflect in the order totals
                long orderTotalAmount = order.getAmounts().getNetTotal();
                orderTotalAmount += loyaltyDiscount.getAmount();
                order.getAmounts().setNetTotal(orderTotalAmount);

                payment.setOrder(order);
                payment.setAmount(orderTotalAmount);

                Log.d(TAG, "Applied discount to order");
                iPoyntLoyaltyServiceListener.loyaltyApplied(payment, requestId);
            } else {
                Log.d(TAG, "Order not found, no discount applied");
                iPoyntLoyaltyServiceListener.noLoyaltyApplied(requestId);
            }

        }
    };
}

```

### Launching Activity to Collect Additional Input

If your loyalty app needs to perform an additional action such as collecting additional input from the customer or merchant, allowing merchant to select specific reward, etc, your service class should create an explicit Intent for Payment Fragment to launch your activity. You have to make sure you also pass the Payment object as an extra in the intent.

Below is a sample Activity which is launched by the Payment Fragment and just presents a button which applies a “$2 Discount” to the order.
::: warning Important
You always have to set the result before exiting an activity and in the case when you apply a discount create Intent with the action **Intents.ACTION_PROCESS_LOYALTY_RESULT**
:::
```java
public class LoyaltyActivity extends Activity {
    public static final String TAG = LoyaltyService.class.getSimpleName();
    public static final String WATER_SKU = "082011500013";
    @BindView(R.id.pinEditText)
    EditText pinText;

    Payment payment;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "Creating Loyalty Activity");
        setContentView(R.layout.activity_loyalty);
        ButterKnife.bind(this);

        // Get the intent that launched the activity
        Intent receivedIntent = getIntent();
        if (receivedIntent == null) {
            Log.e(TAG, "Loyalty activity launched with no intent");
            setResult(Activity.RESULT_CANCELED);
            finish();
        } else {
            handleIntent(receivedIntent);
        }
    }

    // Handle all the negative cases
    private void handleIntent(Intent intent) {
        String action = intent.getAction();
        // If the action is to process loyalty proceed further
        if (Intents.ACTION_PROCESS_LOYALTY.equals(action)) {
            // Get the payment object from intent extras
            this.payment = intent.getParcelableExtra("payment");
            // If payment object is null close the activity
            if (payment == null) {
                Log.e(TAG, "launched with no payment object");
                Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
                setResult(Activity.RESULT_CANCELED, result);
                finish();
            } else {
                // If the payment has no valid order finish the activity
                if (payment.getOrder() == null) {
                    Log.e(TAG, "launched with no order object");
                    Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
                    setResult(Activity.RESULT_CANCELED, result);
                    finish();
                } else {
                    // wait till the Add discount is clicked
                }
            }
        }
        // If the action is not to process loyalty quit the activity
        else {
            Log.e(TAG, "launched with unknown intent action");
            Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
            setResult(Activity.RESULT_CANCELED, result);
            finish();
        }
    }
    // Button that is clicked after entering PIN
    @OnClick(R.id.enterLoyaltyButton)
    public void onEnterLoyaltyButton(View view) {
        // Check the pin and do necessary operations
        long pin = Long.valueOf(pinText.getText().toString());

        if (pin == 123456) {
            Order order = payment.getOrder();
            
            // Create a Discount object for the order
            Discount loyaltyDiscount = new Discount();
            loyaltyDiscount.setAmount(-200l); // discount is always negative
            loyaltyDiscount.setCustomName("Loyalty Discount");
            loyaltyDiscount.setProcessor(getPackageName());

            // Get the existing discounts from order and add the new discount to it
            List<Discount> orderDiscounts = order.getDiscounts() != null ? order.getDiscounts() : new ArrayList<>();
            orderDiscounts.add(loyaltyDiscount);
            order.setDiscounts(orderDiscounts);

            // Update the discount total in order amounts
            long discountAmount = order.getAmounts().getDiscountTotal();
            discountAmount += loyaltyDiscount.getAmount();
            order.getAmounts().setDiscountTotal(discountAmount);

            long orderTotalAmount = order.getAmounts().getNetTotal();
            // Check if the discount exceeds order total
            if (orderTotalAmount >= Math.abs(discountAmount)) {

                // Add the discount to net total to reflect in the order totals
                orderTotalAmount += loyaltyDiscount.getAmount();
                order.getAmounts().setNetTotal(orderTotalAmount);

                payment.setOrder(order);
                payment.setAmount(orderTotalAmount);

                Log.d(TAG, "Applied discount to order");
                Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
                result.putExtra("payment", payment);
                setResult(Activity.RESULT_OK, result);
                finish();
            } else {
                finishWithToast("Discount amount is larger than total order amount", Toast.LENGTH_LONG);
            }
        } else {
            Toast.makeText(LoyaltyActivity.this, "Incorrect pin entered", Toast.LENGTH_SHORT).show();
            pinText.setText("");
        }
    }

    private void finishWithToast(String toastMessage, int toastLength) {
        Toast.makeText(LoyaltyActivity.this, toastMessage, toastLength).show();
        // It is important to set activity result before exiting
        Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
        setResult(Activity.RESULT_CANCELED, result);
        finish();
    }
}
```
::: tip Receiving Transaction Notification
If your loyalty application needs to get notified if the transaction was completed or canceled you can create a _BroadcastReceiver_ and register to listen to **Intents.ACTION_TRANSACTION_COMPLETED** and **Intents.ACTION_PAYMENT_CANCELED**.
:::
### Applying Item Discount
Discounts can also be applied to a specific product in the order, the following snippet applies discount to an order item.
:::warning Product Identifier
The SKU and product Id's can change from merchant to merchant, use this with caution. 
:::
```java
if (order.getItems() != null) {
    // Get the list of items in the order and apply the discount to item if the order has it
    List<OrderItem> orderItems = order.getItems();
    for (int i=0; i<orderItems.size(); i++){
        OrderItem item = orderItems.get(i);
        if (item.getSku() != null && item.getSku().equals(WATER_SKU)) {
            // Create a discount object
            Discount itemDiscount = new Discount();
            itemDiscount.setProcessor(getPackageName());
            itemDiscount.setAmount(50l);
            itemDiscount.setCustomName("Loyalty Discount");

            // Add discount object to the item Discounts
            List<Discount> itemDiscounts = item.getDiscounts() != null ? item.getDiscounts() : new ArrayList<>();
            itemDiscounts.add(itemDiscount);
            item.setDiscounts(itemDiscounts);
            item.setDiscount(item.getDiscount() + itemDiscount.getAmount());
            orderItems.set(i, item);
            order.setItems(orderItems);

            // Update order total discount
            long discountAmount = order.getAmounts().getDiscountTotal();
            discountAmount -= itemDiscount.getAmount();
            order.getAmounts().setDiscountTotal(discountAmount);

            // Add up the item discount to the total order discount
            long orderTotalAmount = order.getAmounts().getNetTotal();
            orderTotalAmount -= itemDiscount.getAmount();
            order.getAmounts().setNetTotal(orderTotalAmount);

            payment.setOrder(order);
            payment.setAmount(orderTotalAmount);
            Log.d(TAG, "Applied discount to item with sku: " + WATER_SKU);
            Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
            result.putExtra("payment", payment);
            setResult(Activity.RESULT_OK, result);
            finish();
        }
    }
} else {
    Log.d(TAG, "No items in order");
    finishWithToast("No order items in the order", Toast.LENGTH_SHORT);
}