## Automatic Update: {{fromVersion}} -> {{toVersion}}

### New Controls:
{{#addedControls}}
+   {{id}} - {{title}}
{{/addedControls}}

{{#hasRenamedControls}}
### Updated Control IDs:
<details>
  <summary>Click to expand.</summary>
  
  {{#renamedControls}}
 -  {{oldId}} -> {{newId}}
  {{/renamedControls}} 
</details>
{{/hasRenamedControls}}

### Updated Check/Fixes:
#### Checks:
<details open>
  <summary>Click to expand.</summary>
{{#updatedChecks}}
{{id}}:
Old: 
```
{{{old}}}

```

Updated:
```
{{{new}}}

```
---
{{/updatedChecks}}
</details>

#### Fixes:
<details open>
  <summary>Click to expand.</summary>
{{#updatedFixes}}
{{id}}:
Old: 
```
{{{old}}}

```
New:
```
{{{new}}}

```
---
{{/updatedFixes}}
</details>

### Updated Impacts
<details open>
  <summary>Click to expand.</summary>
{{#updatedImpacts}}
{{id}}:
Old: {{old}}
New: {{new}}
---
{{/updatedImpacts}}
</details>

### Updated Titles
<details>
  <summary>Click to expand.</summary>
{{#updatedTitles}}
{{id}}:
Old: {{old}}
New: {{new}}
---
{{/updatedTitles}}
</details>

### Updated Descriptions
<details>
  <summary>Click to expand.</summary>
{{#updatedDescriptions}}
{{id}}:
Old:
```
{{{old}}}

```
New:
```
{{{new}}}

```
---
{{/updatedDescriptions}}
</details>