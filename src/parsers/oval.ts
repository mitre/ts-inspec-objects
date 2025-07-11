import {convertEncodedXmlIntoJson} from '../utilities/xccdf'
import {OvalDefinitionValue, Oval, DefinitionCriterion, Test, Object, State} from '../types/oval'
import {createWinstonLogger} from '../utilities/logging';

/**
 * Search through all arrays of the tree to find a value from a property 
 * Code provided by:
 * https://stackoverflow.com/questions/9133500/how-to-find-a-node-in-a-tree-with-javascript
 * 
 * @param aTree : The tree array
 * @param fCompair : This function will receive each node. Define based on caller for specific 
                     condition necessary for the match. It must return true if the condition
                     is matched. Example:
                        function(oNode){ if(oNode["Name"] === "AA") return true; }
 * @param bGreedy? : Set to `true` to search all node and not stopping after the first match, default is false
 * @return An array with references to the nodes for which fCompair was true. In case no node was found an empty array
 *         will be returned
*/
function searchTree(aTree: Record<string, any>, fCompair: any, bGreedy: boolean) {
  let oNode;               // always the current node  
  const aInnerTree = [];   // will contain the inner children
  const aReturnNodes = []; // the nodes array which will returned

  // 1. loop through all root nodes, store tree content locally so we don't touch the tree structure
  for (const keysTree in aTree) {
    aInnerTree.push(aTree[keysTree]);
  }

  while (aInnerTree.length > 0) {
    oNode = aInnerTree.pop();
    // check current node
    if (fCompair(oNode)) {
      aReturnNodes.push(oNode);
      if (!bGreedy) {
        return aReturnNodes;
      }
    } else { // if (node.children && node.children.length) {
      // find other objects, 1. check all properties of the node if they are arrays
      for (const keysNode in oNode) {
        // true if the property is an array
        if (oNode[keysNode] instanceof Array) {
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

/**
 * Extracts all test references from a list of initial criteria.
 *
 * This function recursively traverses the provided criteria and extracts
 * all test references (`@_test_ref`) from each criterion. It returns an
 * array of all found test references.
 *
 * @param initialCriteria - An array of `DefinitionCriterion` objects to extract test references from.
 * @returns An array of strings containing all extracted test references.
 */
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

/**
 * Processes an OVAL (Open Vulnerability and Assessment Language) XML string and converts it into a JSON object.
 * Extracts definitions and their associated criteria references and resolved values.
 * The function performs the following steps:
 * 1. Converts the OVAL XML string into a JSON object.
 * 2. Iterates through the OVAL definitions and extracts each definition.
 * 3. For each definition, extracts criteria references and resolves the associated objects and states.
 * 4. Logs warnings if any objects or states cannot be found.
 *
 * The returned record contains:
 * - The original definition.
 * - An array of criteria references.
 * - An array of resolved values, each containing the original criteria, resolved objects, and resolved states.
 * 
 * @param {string} [oval] - The OVAL XML string to be processed. If not provided, the function returns `undefined`.
 * @returns {Record<string, OvalDefinitionValue> | undefined} - A record of extracted definitions with their
 *  criteria references and resolved values, or `undefined` if no OVAL string is provided.
 */
export function processOVAL(oval?: string): Record<string, OvalDefinitionValue> | undefined {
  const logger = createWinstonLogger('ts-inspec-objects')

  if (!oval) {
    return undefined
  }

  const parsed: Oval = convertEncodedXmlIntoJson(oval, 'withArrayNoEntitiesOption')
  
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
                  logger.warn(`Found object without object_ref in test ${criteriaRef}`)
                } else {
                  const objectRef = object['@_object_ref']
                  const foundObjectReference = searchTree(parsed.oval_definitions[0].objects, (oNode: any) => oNode['@_id'] === objectRef, false)[0]
                  if (foundObjectReference) {
                    foundObjects.push(foundObjectReference)
                  } else {
                    logger.warn(`Could not find object ${objectRef} for test ${criteriaRef}`)
                  }
                }
              })
            }
            if (foundCriteriaRefererence.state) {
              foundCriteriaRefererence.state.forEach((state) => {
                if (!state['@_state_ref']) {
                  logger.warn(`Found state without state_ref in test ${criteriaRef}`)
                } else {
                  const stateRef = state['@_state_ref']
                  const foundStateReference = searchTree(parsed.oval_definitions[0].states, (oNode: any) => oNode['@_id'] === stateRef, false)[0]
                  if (foundStateReference) {
                    foundStates.push(foundStateReference)
                  } else {
                    logger.warn(`Could not find state ${stateRef} for test ${criteriaRef}`)
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
