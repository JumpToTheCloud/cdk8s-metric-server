# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MetricServer <a name="MetricServer" id="@jttc/cdk8s-metric-server.MetricServer"></a>

#### Initializers <a name="Initializers" id="@jttc/cdk8s-metric-server.MetricServer.Initializer"></a>

```typescript
import { MetricServer } from '@jttc/cdk8s-metric-server'

new MetricServer(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@jttc/cdk8s-metric-server.MetricServer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@jttc/cdk8s-metric-server.MetricServer.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.addDependency">addDependency</a></code> | Create a dependency between this Chart and other constructs. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.generateObjectName">generateObjectName</a></code> | Generates a app-unique name for an object given it's construct node path. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.toJson">toJson</a></code> | Renders this chart to a set of Kubernetes JSON resources. |

---

##### `toString` <a name="toString" id="@jttc/cdk8s-metric-server.MetricServer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@jttc/cdk8s-metric-server.MetricServer.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@jttc/cdk8s-metric-server.MetricServer.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addDependency` <a name="addDependency" id="@jttc/cdk8s-metric-server.MetricServer.addDependency"></a>

```typescript
public addDependency(dependencies: ...IConstruct[]): void
```

Create a dependency between this Chart and other constructs.

These can be other ApiObjects, Charts, or custom.

###### `dependencies`<sup>Required</sup> <a name="dependencies" id="@jttc/cdk8s-metric-server.MetricServer.addDependency.parameter.dependencies"></a>

- *Type:* ...constructs.IConstruct[]

the dependencies to add.

---

##### `generateObjectName` <a name="generateObjectName" id="@jttc/cdk8s-metric-server.MetricServer.generateObjectName"></a>

```typescript
public generateObjectName(apiObject: ApiObject): string
```

Generates a app-unique name for an object given it's construct node path.

Different resource types may have different constraints on names
(`metadata.name`). The previous version of the name generator was
compatible with DNS_SUBDOMAIN but not with DNS_LABEL.

For example, `Deployment` names must comply with DNS_SUBDOMAIN while
`Service` names must comply with DNS_LABEL.

Since there is no formal specification for this, the default name
generation scheme for kubernetes objects in cdk8s was changed to DNS_LABEL,
since it’s the common denominator for all kubernetes resources
(supposedly).

You can override this method if you wish to customize object names at the
chart level.

###### `apiObject`<sup>Required</sup> <a name="apiObject" id="@jttc/cdk8s-metric-server.MetricServer.generateObjectName.parameter.apiObject"></a>

- *Type:* cdk8s.ApiObject

The API object to generate a name for.

---

##### `toJson` <a name="toJson" id="@jttc/cdk8s-metric-server.MetricServer.toJson"></a>

```typescript
public toJson(): any[]
```

Renders this chart to a set of Kubernetes JSON resources.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.isChart">isChart</a></code> | Return whether the given object is a Chart. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.of">of</a></code> | Finds the chart in which a node is defined. |

---

##### `isConstruct` <a name="isConstruct" id="@jttc/cdk8s-metric-server.MetricServer.isConstruct"></a>

```typescript
import { MetricServer } from '@jttc/cdk8s-metric-server'

MetricServer.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@jttc/cdk8s-metric-server.MetricServer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isChart` <a name="isChart" id="@jttc/cdk8s-metric-server.MetricServer.isChart"></a>

```typescript
import { MetricServer } from '@jttc/cdk8s-metric-server'

MetricServer.isChart(x: any)
```

Return whether the given object is a Chart.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@jttc/cdk8s-metric-server.MetricServer.isChart.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@jttc/cdk8s-metric-server.MetricServer.of"></a>

```typescript
import { MetricServer } from '@jttc/cdk8s-metric-server'

MetricServer.of(c: IConstruct)
```

Finds the chart in which a node is defined.

###### `c`<sup>Required</sup> <a name="c" id="@jttc/cdk8s-metric-server.MetricServer.of.parameter.c"></a>

- *Type:* constructs.IConstruct

a construct node.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.property.apiObjects">apiObjects</a></code> | <code>cdk8s.ApiObject[]</code> | Returns all the included API objects. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels applied to all resources in this chart. |
| <code><a href="#@jttc/cdk8s-metric-server.MetricServer.property.namespace">namespace</a></code> | <code>string</code> | The default namespace for all objects in this chart. |

---

##### `node`<sup>Required</sup> <a name="node" id="@jttc/cdk8s-metric-server.MetricServer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `apiObjects`<sup>Required</sup> <a name="apiObjects" id="@jttc/cdk8s-metric-server.MetricServer.property.apiObjects"></a>

```typescript
public readonly apiObjects: ApiObject[];
```

- *Type:* cdk8s.ApiObject[]

Returns all the included API objects.

---

##### `labels`<sup>Required</sup> <a name="labels" id="@jttc/cdk8s-metric-server.MetricServer.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Labels applied to all resources in this chart.

This is an immutable copy.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="@jttc/cdk8s-metric-server.MetricServer.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string

The default namespace for all objects in this chart.

---





