---
title: How to process object relations in Magento 2
date: "2020-02-11T15:20:37.121Z"
template: "post"
draft: false
slug: "/posts/magento-2-save-object-relations/"
category: "Magento 2"
tags:
  - "Magento 2"
  - "Tips & Tricks"
description: "How to save object relations in Magento 2."
---

## How to save object relations in Magento 2

Let's say we have an entity which has some relation with other objects (like comments in order). We would like to save related objects on each parent save. To do this we will need to use `\Magento\Framework\Model\ResourceModel\Db\VersionControl\AbstractDb`

First create ResourceModel:

```
namespace Vendor\Module\Model\ResourceModel;

class Parent extends \Magento\Framework\Model\ResourceModel\Db\VersionControl\AbstractDb
{
    protected function _construct()
    {
        $this->_init('vendor_example_parent', 'entity_id');
    }
}
```

Then we have to let know Magento how to process relations. To do this we are creating `Relation` object that will process related objects on each object save

```
namespace Vendor\Module\Model\ResourceModel\Parent;

use Magento\Framework\Model\ResourceModel\Db\VersionControl\RelationInterface;

class Relation implements RelationInterface
{
    /**
     * @var \Vendor\Module\Api\ChildRepositoryInterface
     */
    protected $childRepository;

    public function __construct(
        \Vendor\Module\Api\ChildRepositoryInterface $childRepository
    ) {
        $this->childRepository = $childRepository;
    }

    /**
     * @inheritDoc
     */
    public function processRelation(\Magento\Framework\Model\AbstractModel $object)
    {
        /** @var \Vendor\Module\Model\Parent $object */

        if (null !== $object->getChilds()) {
            /** @var \Vendor\Module\Model\Child $child */
            foreach ($object->getChilds() as $child) {
                $child->setItemId($child->getId());
                $child->setItem($object);
                $this->childRepository->save($child);
            }
        }
    }
}
```

After that we are creating `virtualType` and inject our new created `Relation`.

```
<virtualType name="ParentRelationsComposite" type="Magento\Framework\Model\ResourceModel\Db\VersionControl\RelationComposite">
    <arguments>
        <argument name="relationProcessors" xsi:type="array">
            <item name="default" xsi:type="object">Vendor\Magento\Model\ResourceModel\Parent\Relation</item>
        </argument>
    </arguments>
</virtualType>
<type name="Vendor\Module\Model\ResourceModel\Parent">
    <arguments>
        <argument name="entityRelationComposite" xsi:type="object">ParentRelationsComposite</argument>
    </arguments>
</type>
```

Then we can easily process relations

```
$parent->addChild($childObject);
$parent->addChild($childObject);

$this->parentRepository->save($parent);
```
