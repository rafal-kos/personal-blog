---
title: Missing required argument $encoder of MSP\TwoFactorAuth\Model\UserConfigManager.
date: "2019-06-26T12:02:37.121Z"
template: "post"
draft: false
slug: "/posts/m-2-3-2-how-to-fix-error-missing-required-argument-encode/"
category: "Magento 2"
tags:
  - "Magento 2"
  - "Tips & Tricks"
description: "How to fix 'Missing required argument $encode'."
---
 
## How to fix error "Missing required argument ```$encoder``` of ```MSP\TwoFactorAuth\Model\UserConfigManager```".

On June 25, 2019, the Magento version 2.3.2 was released. Improvements to Magento 2.3.2 require installing libsodium cryptographic library version **1.0.13** or higher. Without this you will get an error in the **MSP_TwoFactorAuth** module.
 
```
Missing required argument $encoder of MSP\TwoFactorAuth\Model\UserConfigManager.
```

So for the successful upgrade, follow these steps:
* install **libsodium**
```
 cd /opt/ 
 wget -c https://download.libsodium.org/libsodium/releases/libsodium-1.0.18.tar.gz 
 tar -xzvf libsodium-1.0.18.tar.gz 
 rm libsodium-1.0.18.tar.gz 
 cd libsodium-1.0.18 
 ./configure 
 make && make check 
 make install 
```
* update magento
```
composer require magento/product-community-edition 2.3.2 --no-update 
composer update 
rm -rf var/cache/* var/page_cache/* var/generation/* 
php bin/magento setup:upgrade 
```

Links :
* https://devdocs.magento.com/guides/v2.3/release-notes/ReleaseNotes2.3.2OpenSource.html#known-issues
* https://download.libsodium.org/doc/installation