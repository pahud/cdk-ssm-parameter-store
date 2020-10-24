# API Reference

**Classes**

Name|Description
----|-----------
[Provider](#cdk-ssm-paramter-store-provider)|Parameter Provider.



## class Provider  <a id="cdk-ssm-paramter-store-provider"></a>

Parameter Provider.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Provider(scope: Construct, id: string)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*


### Methods


#### get(name) <a id="cdk-ssm-paramter-store-provider-get"></a>

return the parameter resource.

```ts
get(name: string): CustomResource
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[CustomResource](#aws-cdk-core-customresource)</code>



