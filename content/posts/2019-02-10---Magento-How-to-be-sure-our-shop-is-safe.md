---
title: How to be sure that my Magento 1 shop is secure? 
date: "2019-02-04T20:27:37.121Z"
template: "post"
draft: false
slug: "/posts/how-to-be-sure-that-my-magento-1-shop-is-secure/"
category: "Magento 1"
tags:
  - "Magento 1"
  - "Security"
description: "Few things that you can do to be sure that shop you are running is safe."
---

## Look for vulnerable extensions

Most of our shops are using a lot of extensions bought from external partners. It looks like a lot of them if not updated regulary can contain vulnerabilities. 
To be sure that 3rd party extensions are safe you can use tool written by [Willem de Groot](https://twitter.com/gwillem) called [Magento Vulnerability Database](https://github.com/gwillem/magevulndb).

This is plugin for [n98magerun.phar](https://github.com/netz98/n98-magerun). After installation just run

```bash
n98-magerun.phar dev:module:security
```

Example output : 

```
Vulnerable module found: Amasty_Geoip
Installed:  1.1.3
Fixed In:   1.1.6
Update URL: https://amasty.com/
Credit:     pavel.barbarich@amasty.com to gwillem@gmail.com

Vulnerable module found: Amasty_Sorting
Installed:  1.2.4
Fixed In:   1.4.9
Update URL: https://amasty.com/improved-sorting.html
```

## Enable Magento Security Scanner

Some time ago Magento has released [tool](https://account.magento.com/scanner/) that is able to regulary scan your website looking for vulnerabilities. Below example output.

![Magento Security Sca](/media/security-1.png)

## Magento Malware Scanner

To be sure that your server was not compromised and any malware wasn't added to the project it's a good idea to scan project source for any suspicious code. For that you can use [Malware Magento Scanner](https://github.com/gwillem/magento-malware-scanner) written again by written by [Willem de Groot](https://twitter.com/gwillem).
You can run it manually with this commands 

```
wget https://mwscan.s3.amazonaws.com/mwscan.txt
grep -Erlf mwscan.txt /path/to/magento
```

Advanced usage can be found on the project page [here](https://github.com/gwillem/magento-malware-scanner/blob/master/docs/usage.md). 