import { convertEncodedXmlIntoJson } from '../utilities/xccdf'
import { OvalDefinitionValue, Oval, DefinitionCriterion, Test, Object, State } from '../types/oval'
import _ from 'lodash';

// https://stackoverflow.com/questions/9133500/how-to-find-a-node-in-a-tree-with-javascript

function searchTree(aTree: Record<string, any>, fCompair: any, bGreedy: boolean){
  const aInnerTree = []; // will contain the inner children
  let oNode; // always the current node
  const aReturnNodes = []; // the nodes array which will returned

  // 1. loop through all root nodes so we don't touch the tree structure
  for(const keysTree in aTree) {
    aInnerTree.push(aTree[keysTree]);
  }
  while(aInnerTree.length > 0) {
    oNode = aInnerTree.pop();
    // check current node
    if( fCompair(oNode) ){
      aReturnNodes.push(oNode);
      if(!bGreedy){
        return aReturnNodes;
      }
    } else { // if (node.children && node.children.length) {
      // find other objects, 1. check all properties of the node if they are arrays
      for(const keysNode in oNode){
        // true if the property is an array
        if(oNode[keysNode] instanceof Array){
          // 2. push all array object to aInnerTree to search in those later
          for (let i = 0; i < oNode[keysNode].length; i++) {
            aInnerTree.push(oNode[keysNode][i]);
          }
        }
      }
    }
  }
  return aReturnNodes;
}

export function extractAllCriteriaRefs(initialCriteria: DefinitionCriterion[]): string[] {
  const criteriaRefs: string[] = []
  initialCriteria.forEach(criteria => {
    criteria.criterion?.forEach((criterion) => {
      if (criterion['@_test_ref']) {
        criteriaRefs.push(criterion['@_test_ref'])
      }
    })
    if (criteria.criteria) {
      criteriaRefs.push(...extractAllCriteriaRefs(criteria.criteria))
    }
  })
  return criteriaRefs
}

export function processOVAL(oval?: string): Record<string, OvalDefinitionValue> | undefined {
  if (!oval) {
    return undefined
  }

  const parsed: Oval = convertEncodedXmlIntoJson(oval)

  const extractedDefinitions: Record<string, OvalDefinitionValue & { criteriaRefs?: string[]; resolvedValues?: any }> = {}

  for (const ovalDefinitions of parsed.oval_definitions) {
    for (const definitionList of ovalDefinitions.definitions) {
      for (const definition of definitionList.definition) {
        extractedDefinitions[definition['@_id']] = definition
        extractedDefinitions[definition['@_id']].criteriaRefs = extractAllCriteriaRefs(definition.criteria)

        extractedDefinitions[definition['@_id']].resolvedValues = extractedDefinitions[definition['@_id']].criteriaRefs?.map((criteriaRef) => {
          // Extract the original criteria from the oval file
          const foundCriteriaRefererence: Test = searchTree(parsed.oval_definitions[0].tests, (oNode: any) => oNode['@_id'] === criteriaRef, false)[0]

          const foundObjects: Object[] = []
          const foundStates: State[] = []
                    
          if (foundCriteriaRefererence) {
            if (foundCriteriaRefererence.object) {
              foundCriteriaRefererence.object.forEach((object) => {
                if (!object['@_object_ref']) {
                  console.warn(`Found object without object_ref in test ${criteriaRef}`)
                } else {
                  const objectRef = object['@_object_ref']
                  const foundObjectReference = searchTree(parsed.oval_definitions[0].objects, (oNode: any) => oNode['@_id'] === objectRef, false)[0]
                  if (foundObjectReference) {
                    foundObjects.push(foundObjectReference)
                  } else {
                    console.warn(`Could not find object ${objectRef} for test ${criteriaRef}`)
                  }
                }
              })
            }
            if (foundCriteriaRefererence.state) {
              foundCriteriaRefererence.state.forEach((state) => {
                if (!state['@_state_ref']) {
                  console.warn(`Found state without state_ref in test ${criteriaRef}`)
                } else {
                  const stateRef = state['@_state_ref']
                  const foundStateReference = searchTree(parsed.oval_definitions[0].states, (oNode: any) => oNode['@_id'] === stateRef, false)[0]
                  if (foundStateReference) {
                    foundStates.push(foundStateReference)
                  } else {
                    console.warn(`Could not find state ${stateRef} for test ${criteriaRef}`)
                  }
                }
              })
            }
          }

          return {...foundCriteriaRefererence, resolvedObjects: foundObjects, resolvedStates: foundStates}


        }).filter((value) => value)
      }
    }
  }

  return extractedDefinitions
}