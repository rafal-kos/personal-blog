---
title: How to be disable module per environment? 
date: "2019-02-10T10:27:37.121Z"
template: "post"
draft: false
slug: "/posts/magento2-how-to-disable-module-per-environment/"
category: "Magento 2"
tags:
  - "Magento 2"
  - "Tips & Tricks"
description: "Small trick that allows to disable module on staging or production environment."
---

Sometime we are using modules that are useful only for local developments. For example [Ho_Templatehints](https://github.com/ho-nl/magento2-Ho_Templatehints) or [MSP_DevTools](https://github.com/magespecialist/m2-MSP_DevTools). 

Most of the time we are installing them with composer running this command 

```composer require --dev module/name```

On production environment we don't want to have any dev packages so during our deployment process we install all required packages with ```composer install --no-dev```. Problem with this solution 
is that if we have some modules enabled in [config.php](https://devdocs.magento.com/guides/v2.3/config-guide/config/config-php.html) command ```bin/magento setup:upgrade``` will fail.

To avoid problems on production we can simply ```modules``` key to ```env.php```.

Original ```config.php```

```php
return [
    'modules' => [
        ...,
        'MSP_DevTools' => 1,
        ...
    ]
]
```

and our ```env.php```

```php
...
'install' => [
    'date' => 'Thu, 11 Oct 2018 18:21:31 +0000'
],
'modules' => [
    ...,
    'MSP_DevTools' => 0,
    ...
]
...
```

I would like to end with one **important** remark : after running ```bin/magento setup:upgrade``` file ```config.php``` will be updated with value from ```env.php```. 
So in our example at the end in both files we will have 
```php
'MSP_DevTools' => 0
```

There is open ticket in [community features](https://github.com/magento/community-features/issues/126) so we can expect that at some point someone will add this feature to Magento functionality.