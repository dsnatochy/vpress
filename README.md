---
title: Poynt OS Architecture
lang: en-US
---

## Overview

![Poynt Logo](./assets/poynt-logo.png)

PoyntOS is the world’s first payment terminal operating system, empowers developers with amazing tools to build applications for merchants. Small merchants today use a multitude of solutions running on various devices including outdated terminals, tablets, PCs, and phones. This not only creates a fragmented experience and security issues, but also adds up to additional costs in order to acquire the necessary hardware in addition to the apps.

Developing solutions for small merchants is hard. Developers are forced to integrate with proprietary systems and outdated technology that not only limits what you can do, but also restricts the reach to a limited number of merchants using that specific technology.

With PoyntOS all such solutions can be made available on the same payment terminal that every merchant uses on their counter. While we take care of the core payment processing for the merchant with the acquirer of their choice, you can focus on building the rest of the solutions that makes the merchant more productive and run a successful business, while providing an integrated and one-stop experience for them.

Unlike a traditional payment terminal which requires merchant or an ISV to build a payment application, Poynt comes with it’s own payment application called Poynt Services. Poynt Services abstracts a lot of low-level details required to communicate with the card reader and instead provides a higher level interface which applications (like Terminal, Register) can use to process transactions. Additionally, Poynt Services provides a payment UI (Payment Fragment) which provides the status of transaction processing and result. This architecture allows apps running on Poynt to be outside of PA-DSS scope and enables rapid integration.

SDK Apps running on the terminal use Poynt SDK which is freely available to developers and which can be downloaded automatically from Poynt’s Maven repository by Android Studio IDE. For detailed instructions please refer to [On-Terminal Apps](/guides/posapp)

::: tip Awesome tip
For a more detailed overview of PoyntOS architecture please refer to this [InfoQ article](http://bit.ly/2mC53vg)
:::


## Get Started

With PoyntOS SDK, you can now bring the capabilities of large merchants down to the small businesses countertop. These solutions can range from loyalty and CRM, to inventory and employee management.

PoyntOS consists of an Android-based application platform and RESTful Cloud APIs for integration over cloud. Depending on your app’s use case, you might need to integrate with one or both of them.

![Poynt OS Architecture](./assets/poyntOS-cloud.png)
