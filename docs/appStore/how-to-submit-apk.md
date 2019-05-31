---
title: "How to Submit an apk through Developer portal"
lang: en-us
---
# Submitting app through developer portal

1. [Create a New developer](https://poynt.net)</a> account or Sign-In to your existing one

2. Create an new App
![](../assets/AppSubmit_Screenshot1.png)

Enter the app name as you want it to show in Poynt Store.<br/>
![](../assets/AppSubmit_Screenshot3.png)

3. Download the Public-Private keypair
The private key is used to generate self-sign JWT required to obtain an access token. You need this key if you plan to use Poynt Cloud API. <br/>
::: warning
Poynt does not store your private key. If you lose your private key you will neeed to reset and download new key in Developer Portal.
::: 
![](../assets/AppSubmit_Screenshot4.png)

4. Go to App details
![](../assets/AppSubmit_Screenshot5.png)

5. Edit App details
![](../assets/AppSubmit_Screenshot6.png)
![](../assets/AppSubmit_Screenshot8.png)

If you need to reset your API private key, you can go to `App Keys` tab:<br/>
![](../assets/AppSubmit_Screenshot9.png)

6. Upload an Apk
The package name of your app has to be unique in the Poynt Store. The best practice is to have the package name start with the domain name of your site (e.g. If you own domain name `awesomedeveloper.com` your apps package name should start with `com.awesomedeveloper`). Apps with package names starting with `co.poynt` or `com.poynt` will be rejected.

::: tip NOTE: 
Make sure that you are uploading a signed release version of your apk (If you are uploading a dev variant to test billing integration it can be signed by Android Studio debug key)
:::
::: warning 
Make sure you **don't lose the key** used to sign your apk. If you do, you will not be able to push updates to merchants who use your app and will need to create a new app with a different package name
:::

![](../assets/AppSubmit_Screenshot10.png)
![](../assets/AppSubmit_Screenshot11.png)
![](../assets/AppSubmit_Screenshot12.png)

You are not done yet. Uploading your apk does not submit your app for review!

7. Provide additional information needed for your app to be listed in Poynt Store
![](../assets/AppSubmit_Screenshot13.png)

* `Tagline` is a short description for your app when it's displayed as a recommended app. 
* `Region` determines in which country your app will be available

![](../assets/AppSubmit_Screenshot14.png)

Based on the country you select you will be promted to accept the Distribution Agreement.

![](../assets/AppSubmit_Screenshot15.png)

::: tip 
MCCs, or Merchant category codes, classify businesses by what they sell or the service they provide. These four-digit codes are assigned by payment card organizations — Visa, MasterCard, American Express and Discover — when the business first starts accepting these methods of payment. Please provide the **(MCC)** codes of merchants (in a comma-delimited format) your app is best suited for. More information on (**MCCs**)</strong> codes can be found [here](https://www.dm.usda.gov/procurement/card/card_x/mcc.pdf)
:::

![](../assets/AppSubmit_Screenshot16.png)

If you are uploading a new version of your app provide the list of changes in the Change Log.

![](../assets/AppSubmit_Screenshot17.png)

Upload a minimum of two screenshots (for best results use 800x1280px resolution). You can also upload a video (up to 10MB).

![](../assets/AppSubmit_Screenshot18.png)
![](../assets/AppSubmit_Screenshot19.png)

Save the submission

![](../assets/AppSubmit_Screenshot20.png)

8. Create Billing plans
![](../assets/AppSubmit_Screenshot21.png)
![](../assets/AppSubmit_Screenshot22.png)

`Cancelation Policy` determines if the subscription will be canceled immediatey or will remain to be active until the end of the current billing cycle.

9. Submit the apk for Poynt Review
![](../assets/AppSubmit_Screenshot24.png)
![](../assets/AppSubmit_Screenshot25.png)

The app has now been successfully Submitted.

![](../assets/AppSubmit_Screenshot26.png)

### Next Steps:
After a Poynt agent approves the Plans, plan status changes from `Pending` to `Approved`.

![](../assets/AppSubmit_Screenshot27.png)

After a Poynt agent approves the Apk for Beta-Testing, status changes to APPROVED.

![](../assets/AppSubmit_Screenshot28.png)

After a Poynt agent approves the Apk for the Poynt App Marketplace, status changes to `LIVE`.

![](../assets/AppSubmit_Screenshot29.png)

