---
title: Quick log for local debugging
date: "2020-04-07T15:05:37.121Z"
template: "post"
draft: false
slug: "/posts/magento-2-quick-log-for-local-debugging/"
category: "Magento 2"
tags:
  - "Magento 2"
  - "Tips & Tricks"
description: "How to do quick log for local debugging."
---

## How to do quick logs for local debugging in Magento 2

In Magento 1 we were able to easily log data using `Mage::log('Test log')`. In Magento 2 it is more complicated. Below solution shouldn't be used on production enviroment:

```
$logger = new \Monolog\Logger('logger', [new \Monolog\Handler\StreamHandler(BP.'/var/log/example.log')]);
$logger->info('Debug Message', ['context' => ['customKey' => 'customValue']]);
```

For production environment please use this method https://devdocs.magento.com/guides/v2.3/config-guide/log/custom-logger-handler.html
