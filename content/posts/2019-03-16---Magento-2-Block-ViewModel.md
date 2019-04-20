---
title: Using ViewModel in Magento 2.2 
date: "2019-03-16T22:21:37.121Z"
template: "post"
draft: false
slug: "/posts/magento2-using-viewmodels/"
category: "Magento 2"
tags:
  - "Magento 2"
  - "Tips & Tricks"
  - "Certification"
description: "Correct way of access custom data in templates with ViewModel."
---

## Using ViewModels in Magento 2.2

Magento 2.2 added concept of ViewModel, offloading features from Block classes into separate ViewModel. Using it is quite simple. This might look like that :
```xml
<block class="Vendor\Module\Block\Example" name="example">
  <arguments>
    <argument name="view_model" xsi:type="object">Vendor\Module\ViewModel\Example</argument>
  </arguments>
</block>
```

New created class could be used as follows :
```php
namespace Vendor\Module\ViewModel;

class Example impletements \Magento\Framework\View\Element\Block\ArgumentInterface
{
  public function __construct()
  {

  }

  public function getItems()
  {
    // load here some data from db for example
  }
}
```

Finally, you can insert the new ViewModel class in your existing PHTML templates as follows :
```php
/** @var \Vendor\Module\ViewModel\Example **/
$viewModel = $block->getViewModel();

$items = $viewModel->getItems();
```
