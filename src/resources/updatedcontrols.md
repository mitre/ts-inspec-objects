## Automattic Update: {{fromVersion}} -> {{toVersion}}

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

{{#checks}}
{{id}}:
```
{{{check}}}
```


{{/checks}}