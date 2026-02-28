/**
 * Represents an Oval object which contains an array of OvalDefinition objects.
 */
export type Oval = {
  oval_definitions: OvalDefinition[];
};

/**
 * Represents an OVAL (Open Vulnerability and Assessment Language) definition.
 *
 * @property {'@_schemaLocation'} _schemaLocation - The schema location for the OVAL definition.
 * @property {Generator[]} generator - An array of generator objects that provide metadata about the OVAL definition.
 * @property {OvalOvalDefinitionValue[]} definitions - An array of OVAL definition values.
 * @property {{ [key: string]: Test[] }[]} tests - An array of test objects, indexed by a string key.
 * @property {OvalDefinitionObject[]} objects - An array of OVAL definition objects.
 * @property {OvalDefinitionState[]} states - An array of OVAL definition states.
 * @property {Variable[]} variables - An array of variables used in the OVAL definition.
 */
export type OvalDefinition = {
  '@_schemaLocation': string;
  generator: Generator[];
  definitions: OvalOvalDefinitionValue[];
  tests: Record<string, Test[]>[];
  objects: OvalDefinitionObject[];
  states: OvalDefinitionState[];
  variables: Variable[];
};

/**
 * Represents a collection of OVAL (Open Vulnerability and Assessment Language) definitions.
 *
 * @interface OvalOvalDefinitionValue
 * @property {OvalDefinitionValue[]} definition - An array of OVAL definitions.
 */
export type OvalOvalDefinitionValue = {
  definition: OvalDefinitionValue[];
};

/**
 * Represents an OVAL (Open Vulnerability and Assessment Language) definition value.
 *
 * @property {'@_class'} class - The class of the OVAL definition.
 * @property {'@_id'} id - The unique identifier of the OVAL definition.
 * @property {'@_version'} version - The version of the OVAL definition.
 * @property {Metadatum[]} metadata - An array of metadata associated with the OVAL definition.
 * @property {DefinitionCriterion[]} criteria - An array of criteria that define the OVAL definition.
 */
export type OvalDefinitionValue = {
  '@_class': Class;
  '@_id': string;
  '@_version': string;
  metadata: Metadatum[];
  criteria: DefinitionCriterion[];
};

/**
 * Enum representing different classes of OVAL (Open Vulnerability and Assessment Language) definitions.
 *
 * @enum {string}
 * @readonly
 */
export enum Class {
  Compliance = 'compliance',
  Inventory = 'inventory',
}

/**
 * Represents a criterion definition in an OVAL (Open Vulnerability and Assessment Language) document.
 *
 * @property {'@_comment'} [@_comment] - An optional comment associated with the criterion.
 * @property {'@_operator'} [@_operator] - An optional operator that defines the logical relationship between criteria.
 * @property {IndigoCriterion[]} [criterion] - An optional array of individual criteria.
 * @property {PurpleCriterion[]} [criteria] - An optional array of grouped criteria.
 * @property {ExtendDefinition[]} [extend_definition] - An optional array of extended definitions.
 */
export type DefinitionCriterion = {
  '@_comment'?: string;
  '@_operator'?: Operator;
  criterion?: IndigoCriterion[];
  criteria?: PurpleCriterion[];
  extend_definition?: ExtendDefinition[];
};

/**
 * Enum representing logical operators.
 *
 * @enum {string}
 * @property {string} And - Represents the logical AND operator.
 * @property {string} Or - Represents the logical OR operator.
 */
export enum Operator {
  And = 'AND',
  Or = 'OR',
}

/**
 * Represents a criterion with various properties and nested criteria.
 *
 * @property {'@_operator'} operator - The operator used in the criterion.
 * @property {IndigoCriterion[]} [criterion] - An optional array of nested criteria.
 * @property {string} [@_comment] - An optional comment associated with the criterion.
 * @property {ExtendDefinition[]} [extend_definition] - An optional array of extended definitions.
 * @property {FluffyCriterion[]} [criteria] - An optional array of additional nested criteria.
 */
export type PurpleCriterion = {
  '@_operator': Operator;
  criterion?: IndigoCriterion[];
  '@_comment'?: string;
  extend_definition?: ExtendDefinition[];
  criteria?: FluffyCriterion[];
};

/**
 * Represents a criterion with optional nested criteria and definitions.
 *
 * @property {'@_comment'} [@_comment] - An optional comment for the criterion.
 * @property {'@_operator'} @_operator - The operator used for the criterion.
 * @property {ExtendDefinition[]} [extend_definition] - An optional array of extended definitions.
 * @property {IndigoCriterion[]} [criterion] - An optional array of nested criteria.
 * @property {TentacledCriterion[]} [criteria] - An optional array of nested criteria groups.
 */
export type FluffyCriterion = {
  '@_comment'?: string;
  '@_operator': Operator;
  extend_definition?: ExtendDefinition[];
  criterion?: IndigoCriterion[];
  criteria?: TentacledCriterion[];
};

/**
 * Represents a criterion with an operator and a list of sticky criteria.
 *
 * @interface TentacledCriterion
 *
 * @property {'@_operator'} operator - The operator to be applied to the criteria.
 * @property {StickyCriterion[]} criterion - An array of sticky criteria.
 * @property {'@_comment'} [comment] - An optional comment for the criterion.
 */
export type TentacledCriterion = {
  '@_operator': Operator;
  criterion: StickyCriterion[];
  '@_comment'?: string;
};

/**
 * Represents a sticky criterion in an OVAL (Open Vulnerability and Assessment Language) definition.
 *
 * @property {'@_comment'} @_comment - A comment or note associated with the criterion.
 * @property {'@_test_ref'} @_test_ref - A reference to the test associated with the criterion.
 */
export type StickyCriterion = {
  '@_comment': string;
  '@_test_ref': string;
};

/**
 * Represents a criterion used in the Indigo system.
 *
 * @property [@_comment] - An optional comment associated with the criterion.
 * @property @_test_ref - A reference to the test associated with the criterion.
 * @property [@_negate] - An optional flag indicating whether the criterion should be negated.
 */
export type IndigoCriterion = {
  '@_comment'?: string;
  '@_test_ref': string;
  '@_negate'?: string;
};

/**
 * Represents an extension of a definition in OVAL (Open Vulnerability and Assessment Language).
 *
 * @property [@_comment] - An optional comment about the definition extension.
 * @property @_definition_ref - A reference to the definition being extended.
 * @property [@_negate] - An optional attribute to indicate if the definition should be negated.
 */
export type ExtendDefinition = {
  '@_comment'?: string;
  '@_definition_ref': string;
  '@_negate'?: string;
};

/**
 * Represents metadata information.
 */
export type Metadatum = {
  title: string;
  affected: Affected[];
  description: string;
  reference: Reference[];
};

/**
 * Represents an object that indicates the affected family and platform.
 *
 * @property {'@_family'} family - The family affected.
 * @property {Platform} platform - The platform affected.
 */
export type Affected = {
  '@_family': Family;
  platform: Platform;
};

/**
 * Enum representing different operating system families.
 */
export enum Family {
  Unix = 'unix',
}

/**
 * Enum representing supported platforms.
 */
export enum Platform {
  Ubuntu2004 = 'Ubuntu 20.04',
}

/**
 * Represents a reference to an external source.
 *
 * @interface Reference
 *
 * @property {'@_ref_id'} - The unique identifier for the reference.
 * @property {'@_source'} - The source of the reference.
 */
export type Reference = {
  '@_ref_id': string;
  '@_source': Source;
};

export enum Source {
  Cpe = 'CPE',
  Ssg = 'ssg',
}

/**
 * Represents a generator object with details about the product and schema versions.
 */
export type Generator = {
  product_name: string;
  product_version: string;
  schema_version: number;
  timestamp: Date;
};

/**
 * Represents an OVAL (Open Vulnerability and Assessment Language) definition object.
 * This interface defines the structure of various objects that can be part of an OVAL definition.
 *
 * @property {Textfilecontent54Object[]} textfilecontent54_object - Array of text file content objects.
 * @property {FileObject[]} file_object - Array of file objects.
 * @property {VariableObject[]} variable_object - Array of variable objects.
 * @property {SymlinkObject[]} symlink_object - Array of symbolic link objects.
 * @property {PasswordObject[]} password_object - Array of password objects.
 * @property {ShadowObject[]} shadow_object - Array of shadow objects.
 * @property {Object[]} environmentvariable58_object - Array of environment variable objects.
 * @property {RpminfoObject[]} rpminfo_object - Array of RPM info objects.
 * @property {SystemdunitpropertyObject[]} systemdunitproperty_object - Array of systemd unit property objects.
 * @property {SymlinkObject[]} systemdunitdependency_object - Array of systemd unit dependency objects.
 * @property {Object[]} dpkginfo_object - Array of dpkg info objects.
 * @property {PartitionObject[]} partition_object - Array of partition objects.
 * @property {Object[]} sysctl_object - Array of sysctl objects.
 * @property {FamilyObject[]} family_object - Array of family objects.
 * @property {SymlinkObject[]} uname_object - Array of uname objects.
 */
export type OvalDefinitionObject = {
  textfilecontent54_object: Textfilecontent54Object[];
  file_object: FileObject[];
  variable_object: VariableObject[];
  symlink_object: SymlinkObject[];
  password_object: PasswordObject[];
  shadow_object: ShadowObject[];
  environmentvariable58_object: Object[];
  rpminfo_object: RpminfoObject[];
  systemdunitproperty_object: SystemdunitpropertyObject[];
  systemdunitdependency_object: SymlinkObject[];
  dpkginfo_object: Object[];
  partition_object: PartitionObject[];
  sysctl_object: Object[];
  family_object: FamilyObject[];
  uname_object: SymlinkObject[];
};

/**
 * Represents an object with specific attributes and optional PID array.
 *
 * @property {'@_id'} id - The unique identifier for the object.
 * @property {'@_version'} version - The version of the object.
 * @property {string} name - The name of the object.
 * @property {PID[]} [pid] - An optional array of PID objects.
 */
export type Object = {
  '@_id': string;
  '@_version': string;
  name: string;
  pid?: PID[];
};

/**
 * Represents a Process ID (PID) object.
 *
 * @property {'@_datatype'} - The datatype of the PID.
 * @property {'@_nil'} - A string indicating if the PID is nil.
 */
export type PID = {
  '@_datatype': PIDDatatype;
  '@_nil': string;
};

export enum PIDDatatype {
  Int = 'int',
  String = 'string',
}

/**
 * Represents a FamilyObject with an ID and version.
 *
 * @property {'@_id'} id - The unique identifier for the FamilyObject.
 * @property {'@_version'} version - The version of the FamilyObject.
 */
export type FamilyObject = {
  '@_id': string;
  '@_version': string;
};

/**
 * Represents a file object with various attributes and optional properties.
 *
 * @interface FileObject
 * @property {string} [@_comment] - An optional comment about the file object.
 * @property {string} @_id - The unique identifier for the file object.
 * @property {string} @_version - The version of the file object.
 * @property {Pattern[] | string} [filepath] - An optional filepath pattern or string.
 * @property {Pattern[] | string} [path] - An optional path pattern or string.
 * @property {FilenameElement[] | string} [filename] - An optional filename pattern or string.
 * @property {FileObjectBehavior[]} [behaviors] - An optional array of file object behaviors.
 * @property {Filter[]} [filter] - An optional array of filters.
 */
export type FileObject = {
  '@_comment'?: string;
  '@_id': string;
  '@_version': string;
  filepath?: Pattern[] | string;
  path?: Pattern[] | string;
  filename?: FilenameElement[] | string;
  behaviors?: FileObjectBehavior[];
  filter?: Filter[];
};

/**
 * Represents the behavior of a file object in an OVAL (Open Vulnerability and Assessment Language) definition.
 *
 * @property [@_max_depth] - Optional. Specifies the maximum depth for recursion.
 * @property @_recurse - Specifies whether recursion is enabled.
 * @property @_recurse_direction - Specifies the direction of recursion.
 * @property @_recurse_file_system - Specifies the file system to be used for recursion.
 */
export type FileObjectBehavior = {
  '@_max_depth'?: string;
  '@_recurse': Recurse;
  '@_recurse_direction': RecurseDirection;
  '@_recurse_file_system': RecurseFileSystem;
};

/**
 * Enum representing the types of recursion that can be performed.
 */
export enum Recurse {
  Directories = 'directories',
}

export enum RecurseDirection {
  Down = 'down',
}

export enum RecurseFileSystem {
  All = 'all',
  Local = 'local',
}

/**
 * Represents a filename element with optional text and attributes.
 *
 * @property '#text' - The text content of the filename element.
 * @property '@_operation' - The operation to be performed on the filename element.
 * @property '@_nil' - Indicates whether the filename element is nil.
 */
export type FilenameElement = {
  '#text'?: string;
  '@_operation'?: Operation;
  '@_nil'?: string;
};

export enum Operation {
  BitwiseAnd = 'bitwise and',
  CaseInsensitiveEquals = 'case insensitive equals',
  Equals = 'equals',
  GreaterThan = 'greater than',
  GreaterThanOrEqual = 'greater than or equal',
  LessThan = 'less than',
  LessThanOrEqual = 'less than or equal',
  NotEqual = 'not equal',
  PatternMatch = 'pattern match',
}

/**
 * Represents a pattern with optional text and various attributes.
 *
 * @property {string} [#text] - The text content of the pattern.
 * @property {Operation} [@_operation] - The operation attribute of the pattern.
 * @property {PIDDatatype} [@_datatype] - The datatype attribute of the pattern.
 * @property {Check} [@_var_check] - The variable check attribute of the pattern.
 * @property {string} [@_var_ref] - The variable reference attribute of the pattern.
 */
export type Pattern = {
  '#text'?: string;
  '@_operation'?: Operation;
  '@_datatype'?: PIDDatatype;
  '@_var_check'?: Check;
  '@_var_ref'?: string;
};

export enum Check {
  All = 'all',
  AtLeastOne = 'at least one',
  NoneSatisfy = 'none satisfy',
}

/**
 * Represents a filter with text and an action.
 *
 * @interface Filter
 * @property {string} '#text' - The text content of the filter.
 * @property {Action} '@_action' - The action associated with the filter.
 */
export type Filter = {
  '#text': string;
  '@_action': Action;
};

export enum Action {
  Exclude = 'exclude',
  Include = 'include',
}

/**
 * Represents a partition object with its associated properties.
 *
 * @property {'@_id'} id - The unique identifier for the partition.
 * @property {'@_version'} version - The version of the partition object.
 * @property {string} mount_point - The mount point of the partition.
 */
export type PartitionObject = {
  '@_id': string;
  '@_version': string;
  mount_point: string;
};

/**
 * Represents a password object in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @property {'@_id'} id - The unique identifier for the password object.
 * @property {'@_version'} version - The version of the password object.
 * @property {EvrElement[]} username - An array of `EvrElement` representing the usernames associated with the password object.
 */
export type PasswordObject = {
  '@_id': string;
  '@_version': string;
  username: EvrElement[];
};

/**
 * Represents an EVR (Epoch, Version, Release) element in an OVAL (Open Vulnerability and Assessment Language) definition.
 *
 * @property {string} '#text' - The text content of the EVR element.
 * @property {Operation} '@_operation' - The operation to be performed on the EVR element.
 * @property {string} [@_datatype] - Optional. The data type of the EVR element.
 * @property {Check} [@_entity_check] - Optional. The check to be performed on the EVR element.
 */
export type EvrElement = {
  '#text': string;
  '@_operation': Operation;
  '@_datatype'?: string;
  '@_entity_check'?: Check;
};

/**
 * Represents an RPM information object.
 *
 * @interface RpminfoObject
 *
 * @property {string} @id - The unique identifier for the RPM information object.
 * @property {string} @version - The version of the RPM information object.
 * @property {ProcessorTypeElement[] | string} name - The name of the RPM package, which can be either an array of ProcessorTypeElement or a string.
 */
export type RpminfoObject = {
  '@_id': string;
  '@_version': string;
  name: ProcessorTypeElement[] | string;
};

/**
 * Represents a processor type element with text content and an operation attribute.
 *
 * @interface ProcessorTypeElement
 *
 * @property {string} '#text' - The text content of the processor type element.
 * @property {Operation} '@_operation' - The operation attribute associated with the processor type element.
 */
export type ProcessorTypeElement = {
  '#text': string;
  '@_operation': Operation;
};

/**
 * Represents a ShadowObject with specific properties.
 *
 * @property {'@_id'} id - The unique identifier for the ShadowObject.
 * @property {'@_version'} version - The version of the ShadowObject.
 * @property {ProcessorTypeElement[]} username - An array of ProcessorTypeElement associated with the username.
 * @property {Filter[]} filter - An array of Filter objects.
 */
export type ShadowObject = {
  '@_id': string;
  '@_version': string;
  username: ProcessorTypeElement[];
  filter: Filter[];
};

/**
 * Represents a symbolic link object in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @property [@_comment] - An optional comment for the symbolic link object.
 * @property @_id - A unique identifier for the symbolic link object.
 * @property @_version - The version of the symbolic link object.
 * @property [filepath] - The file path of the symbolic link.
 * @property [unit] - The unit associated with the symbolic link.
 * @property [value] - The value(s) associated with the symbolic link, which can be an array of ValueElement or a single ValueEnum.
 * @property [canonical_path] - The canonical path of the symbolic link, which can be an array of ProcessorTypeElement or a string.
 * @property [dependency] - An array of dependencies for the symbolic link.
 * @property [processor_type] - An array of processor types associated with the symbolic link.
 */
export type SymlinkObject = {
  '@_comment'?: string;
  '@_id': string;
  '@_version': string;
  filepath?: string;
  unit?: Unit;
  value?: ValueElement[] | ValueEnum;
  canonical_path?: ProcessorTypeElement[] | string;
  dependency?: Dependency[];
  processor_type?: ProcessorTypeElement[];
};

export type Dependency = {
  '#text': string;
  '@_entity_check': Check;
};

export enum Unit {
  MultiUserTarget = 'multi-user.target',
}

export type ValueElement = {
  '#text'?: number | string;
  '@_operation': Operation;
  '@_datatype'?: PIDDatatype;
  '@_var_check'?: Check;
  '@_var_ref'?: string;
};

export enum ValueEnum {
  Active = 'active',
  Enabled = 'enabled',
  Inactive = 'inactive',
  Masked = 'masked',
}

export type SystemdunitpropertyObject = {
  '@_id': string;
  '@_version': string;
  unit: ProcessorTypeElement[] | string;
  property: Property;
  '@_comment'?: string;
};

export enum Property {
  ActiveState = 'ActiveState',
  LoadState = 'LoadState',
  UnitFileState = 'UnitFileState',
}

export type Textfilecontent54Object = {
  '@_id': string;
  '@_version': string;
  filepath?: Pattern[] | string;
  pattern: Pattern[];
  instance: Instance[];
  '@_comment'?: string;
  path?: ProcessorTypeElement[] | string;
  filename?: ProcessorTypeElement[];
  behaviors?: Textfilecontent54ObjectBehavior[];
  filter?: Filter[];
};

export type Textfilecontent54ObjectBehavior = {
  '@_singleline': string;
  '@_multiline'?: string;
};

export type Instance = {
  '#text'?: number;
  '@_datatype': PIDDatatype;
  '@_operation'?: Operation;
  '@_var_ref'?: string;
};

export type VariableObject = {
  '@_id': string;
  '@_version': string;
  var_ref?: string;
  '@_comment'?: string;
  set?: Set[];
};

export type Set = {
  object_reference: string[];
};

/**
 * Represents the state of an OVAL (Open Vulnerability and Assessment Language) definition.
 * This interface includes various states related to system configurations and properties.
 *
 * @property {Textfilecontent54State[]} textfilecontent54_state - Array of states for text file content.
 * @property {SymlinkObject[]} variable_state - Array of states for variables.
 * @property {SymlinkObject[]} symlink_state - Array of states for symbolic links.
 * @property {State[]} password_state - Array of states for passwords.
 * @property {State[]} shadow_state - Array of states for shadow passwords.
 * @property {FileState[]} file_state - Array of states for files.
 * @property {SymlinkObject[]} environmentvariable58_state - Array of states for environment variables.
 * @property {SymlinkObject[]} systemdunitproperty_state - Array of states for systemd unit properties.
 * @property {SymlinkObject[]} systemdunitdependency_state - Array of states for systemd unit dependencies.
 * @property {PartitionState[]} partition_state - Array of states for partitions.
 * @property {SysctlState[]} sysctl_state - Array of states for sysctl configurations.
 * @property {RpminfoState[]} rpminfo_state - Array of states for RPM package information.
 * @property {FamilyState[]} family_state - Array of states for system family information.
 * @property {DpkginfoState[]} dpkginfo_state - Array of states for DPKG package information.
 * @property {SymlinkObject[]} uname_state - Array of states for uname information.
 */
export type OvalDefinitionState = {
  textfilecontent54_state: Textfilecontent54State[];
  variable_state: SymlinkObject[];
  symlink_state: SymlinkObject[];
  password_state: State[];
  shadow_state: State[];
  file_state: FileState[];
  environmentvariable58_state: SymlinkObject[];
  systemdunitproperty_state: SymlinkObject[];
  systemdunitdependency_state: SymlinkObject[];
  partition_state: PartitionState[];
  sysctl_state: SysctlState[];
  rpminfo_state: RpminfoState[];
  family_state: FamilyState[];
  dpkginfo_state: DpkginfoState[];
  uname_state: SymlinkObject[];
};

export type DpkginfoState = {
  '@_id': string;
  '@_version': string;
  evr: EvrElement[];
};

export type FamilyState = {
  '@_id': string;
  '@_version': string;
  family: Family;
};

/**
 * Represents the state of a file in the system.
 *
 * @property {'@_id'} id - The unique identifier for the file state.
 * @property {'@_version'} version - The version of the file state.
 * @property {ProcessorTypeElement[] | string} [type] - The type of the processor or a string representation.
 * @property {Gexec[]} [uread] - User read permissions.
 * @property {Gexec[]} [uwrite] - User write permissions.
 * @property {Gexec[]} [uexec] - User execute permissions.
 * @property {Gexec[]} [gread] - Group read permissions.
 * @property {Gexec[]} [gwrite] - Group write permissions.
 * @property {Gexec[]} [gexec] - Group execute permissions.
 * @property {Gexec[]} [oread] - Other read permissions.
 * @property {Gexec[]} [owrite] - Other write permissions.
 * @property {Gexec[]} [oexec] - Other execute permissions.
 * @property {ProcessorTypeElement[]} [path] - The path of the file.
 * @property {Operator} [operator] - The operator associated with the file state.
 * @property {Gexec[]} [suid] - Set user ID permissions.
 * @property {Gexec[]} [sgid] - Set group ID permissions.
 * @property {Gexec[]} [sticky] - Sticky bit permissions.
 * @property {string} [comment] - A comment associated with the file state.
 * @property {Instance[]} [group_id] - The group ID instances.
 * @property {UserID[]} [user_id] - The user ID instances.
 * @property {ProcessorTypeElement[]} [filepath] - The file path elements.
 */
export type FileState = {
  '@_id': string;
  '@_version': string;
  type?: ProcessorTypeElement[] | string;
  uread?: Gexec[];
  uwrite?: Gexec[];
  uexec?: Gexec[];
  gread?: Gexec[];
  gwrite?: Gexec[];
  gexec?: Gexec[];
  oread?: Gexec[];
  owrite?: Gexec[];
  oexec?: Gexec[];
  path?: ProcessorTypeElement[];
  '@_operator'?: Operator;
  suid?: Gexec[];
  sgid?: Gexec[];
  sticky?: Gexec[];
  '@_comment'?: string;
  group_id?: Instance[];
  user_id?: UserID[];
  filepath?: ProcessorTypeElement[];
};

/**
 * Represents an execution object with text and datatype properties.
 *
 * @interface Gexec
 * @property {boolean} '#text' - Indicates whether the text is present.
 * @property {GexecDatatype} '@_datatype' - Specifies the datatype of the execution object.
 */
export type Gexec = {
  '#text': boolean;
  '@_datatype': GexecDatatype;
};

export enum GexecDatatype {
  Boolean = 'boolean',
}

/**
 * Represents a user ID with various attributes.
 *
 * @property {number} [#text] - The numeric value of the user ID.
 * @property {PIDDatatype} @_datatype - The datatype of the user ID.
 * @property {Operation} [@_operation] - The operation associated with the user ID.
 * @property {Check} [@_var_check] - The variable check associated with the user ID.
 * @property {string} [@_var_ref] - The variable reference associated with the user ID.
 */
export type UserID = {
  '#text'?: number;
  '@_datatype': PIDDatatype;
  '@_operation'?: Operation;
  '@_var_check'?: Check;
  '@_var_ref'?: string;
};

/**
 * Represents the state of a partition.
 *
 * @property {'@_id'} id - The unique identifier for the partition state.
 * @property {'@_version'} version - The version of the partition state.
 * @property {EvrElement[]} mount_options - The list of mount options associated with the partition.
 */
export type PartitionState = {
  '@_id': string;
  '@_version': string;
  mount_options: EvrElement[];
};

/**
 * Represents the state of an object with optional password and encryption method properties.
 *
 * @property {'@_id'} id - The unique identifier for the state.
 * @property {'@_version'} version - The version of the state.
 * @property {ProcessorTypeElement[]} [password] - An optional array of password processor type elements.
 * @property {ProcessorTypeElement[]} [encrypt_method] - An optional array of encryption method processor type elements.
 */
export type State = {
  '@_id': string;
  '@_version': string;
  password?: ProcessorTypeElement[];
  encrypt_method?: ProcessorTypeElement[];
};

/**
 * Represents the state information for an RPM package.
 *
 * @interface RpminfoState
 *
 * @property {string} @id - The unique identifier for the RPM state.
 * @property {string} @version - The version of the RPM state.
 * @property {ProcessorTypeElement[]} [version] - An optional array of version elements.
 * @property {ProcessorTypeElement[]} [name] - An optional array of name elements.
 * @property {EvrElement[]} [evr] - An optional array of EVR (Epoch:Version-Release) elements.
 */
export type RpminfoState = {
  '@_id': string;
  '@_version': string;
  version?: ProcessorTypeElement[];
  name?: ProcessorTypeElement[];
  evr?: EvrElement[];
};

/**
 * Represents the state of a sysctl configuration.
 *
 * @property {'@_id'} id - The unique identifier for the sysctl state.
 * @property {'@_version'} version - The version of the sysctl state.
 * @property {Instance[]} value - An array of instances representing the sysctl values.
 */
export type SysctlState = {
  '@_id': string;
  '@_version': string;
  value: Instance[];
};

/**
 * Represents the state of a text file content in OVAL (Open Vulnerability and Assessment Language) version 5.4.
 *
 * @property {'@_comment'} [@_comment] - An optional comment for the state.
 * @property {'@_id'} @_id - The unique identifier for the state.
 * @property {'@_version'} @_version - The version of the state.
 * @property {ValueElement[] | number | string} [subexpression] - An optional subexpression which can be an array of ValueElement, a number, or a string.
 * @property {Text[]} [text] - An optional array of text elements.
 */
export type Textfilecontent54State = {
  '@_comment'?: string;
  '@_id': string;
  '@_version': string;
  subexpression?: ValueElement[] | number | string;
  text?: Text[];
};

/**
 * Represents a text object with an associated operation.
 *
 * @property {'#text'} - The text content, which can be either a number or a string.
 * @property {'@_operation'} - The operation associated with the text, defined by the `Operation` type.
 */
export type Text = {
  '#text': number | string;
  '@_operation': Operation;
};

/**
 * Represents a test in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @interface Test
 *
 * @property {'@_check'} @required The check type to be performed.
 * @property {'@_check_existence'} [@optional] The existence check type, if applicable.
 * @property {'@_comment'} @required A comment describing the test.
 * @property {'@_id'} @required The unique identifier for the test.
 * @property {'@_version'} @required The version of the test.
 * @property {TestObject[]} @required The objects to be tested.
 * @property {TestState[]} [@optional] The states to be tested, if applicable.
 * @property {'@_state_operator'} [@optional] The operator to be used for state evaluation.
 */
export type Test = {
  '@_check': Check;
  '@_check_existence'?: CheckExistence;
  '@_comment': string;
  '@_id': string;
  '@_version': string;
  object: TestObject[];
  state?: TestState[];
  '@_state_operator'?: Operator;
};

/**
 * Enum representing the different conditions for checking the existence of items.
 */
export enum CheckExistence {
  AllExist = 'all_exist',
  AnyExist = 'any_exist',
  AtLeastOneExists = 'at_least_one_exists',
  NoneExist = 'none_exist',
  OnlyOneExists = 'only_one_exists',
}

/**
 * Represents a test object with a reference to another object.
 *
 * @property {'@_object_ref'} @_object_ref - A string that references another object.
 */
export type TestObject = {
  '@_object_ref': string;
};

/**
 * Represents the state of a test in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @property {'@_state_ref'} state_ref - A reference to the state associated with the test.
 */
export type TestState = {
  '@_state_ref': string;
};

/**
 * Represents a variable in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @property external_variable - An array of constant variable elements that are defined externally.
 * @property local_variable - An array of local variables.
 * @property constant_variable - An array of constant variable elements.
 */
export type Variable = {
  external_variable: ConstantVariableElement[];
  local_variable: LocalVariable[];
  constant_variable: ConstantVariableElement[];
};

/**
 * Represents a constant variable element in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @interface ConstantVariableElement
 *
 * @property {'@_comment'} @_comment - A comment or description for the constant variable element.
 * @property {'@_datatype'} @_datatype - The data type of the constant variable element, represented by the PIDDatatype type.
 * @property {'@_id'} @_id - The unique identifier for the constant variable element.
 * @property {'@_version'} @_version - The version of the constant variable element.
 * @property {string[] | string} [value] - The value(s) of the constant variable element, which can be a single string or an array of strings.
 */
export type ConstantVariableElement = {
  '@_comment': string;
  '@_datatype': PIDDatatype;
  '@_id': string;
  '@_version': string;
  value?: string[] | string;
};

/**
 * Represents a local variable in an OVAL (Open Vulnerability and Assessment Language) definition.
 *
 * @property {'@_comment'} @comment - A comment or description for the local variable.
 * @property {'@_datatype'} @datatype - The datatype of the local variable, represented by `PIDDatatype`.
 * @property {'@_id'} @id - The unique identifier for the local variable.
 * @property {'@_version'} @version - The version of the local variable.
 * @property {Concat[]} [concat] - An optional array of `Concat` objects representing concatenation operations.
 * @property {Split[]} [split] - An optional array of `Split` objects representing split operations.
 * @property {RegexCapture[]} [regex_capture] - An optional array of `RegexCapture` objects representing regex capture operations.
 * @property {Count[]} [count] - An optional array of `Count` objects representing count operations.
 * @property {ObjectComponent[]} [object_component] - An optional array of `ObjectComponent` objects representing object components.
 * @property {Substring[]} [substring] - An optional array of `Substring` objects representing substring operations.
 * @property {LocalVariableArithmetic[]} [arithmetic] - An optional array of `LocalVariableArithmetic` objects representing arithmetic operations.
 * @property {LocalVariableUnique[]} [unique] - An optional array of `LocalVariableUnique` objects representing unique operations.
 * @property {LocalVariableLiteralComponent[]} [literal_component] - An optional array of `LocalVariableLiteralComponent` objects representing literal components.
 */
export type LocalVariable = {
  '@_comment': string;
  '@_datatype': PIDDatatype;
  '@_id': string;
  '@_version': string;
  concat?: Concat[];
  split?: Split[];
  regex_capture?: RegexCapture[];
  count?: Count[];
  object_component?: ObjectComponent[];
  substring?: Substring[];
  arithmetic?: LocalVariableArithmetic[];
  unique?: LocalVariableUnique[];
  literal_component?: LocalVariableLiteralComponent[];
};

export type LocalVariableArithmetic = {
  '@_arithmetic_operation': string;
  arithmetic: ArithmeticArithmetic[];
  variable_component: VariableComponent[];
};

/**
 * Represents an arithmetic operation in the OVAL (Open Vulnerability and Assessment Language) schema.
 * This interface defines the structure for an arithmetic operation that includes both literal and variable components.
 *
 * @interface ArithmeticArithmetic
 *
 * @property {'@_arithmetic_operation'} arithmetic_operation - The type of arithmetic operation to be performed.
 * @property {ArithmeticLiteralComponent[]} literal_component - An array of literal components involved in the arithmetic operation.
 * @property {VariableComponent[]} variable_component - An array of variable components involved in the arithmetic operation.
 */
export type ArithmeticArithmetic = {
  '@_arithmetic_operation': ArithmeticOperation;
  literal_component: ArithmeticLiteralComponent[];
  variable_component: VariableComponent[];
};

/**
 * Enumeration representing arithmetic operations.
 * Currently, it only includes the multiplication operation.
 */
export enum ArithmeticOperation {
  Multiply = 'multiply',
}

/**
 * Represents a literal component that is part of an arithmetic operation.
 *
 * @interface ArithmeticLiteralComponent
 *
 * @property {'#text'} '#text' - The text value of the literal component.
 * @property {'@_datatype'} '@_datatype' - The datatype of the literal component.
 */
export type ArithmeticLiteralComponent = {
  '#text': number;
  '@_datatype': PIDDatatype;
};

/**
 * Represents a variable component that references a local variable.
 *
 * @interface VariableComponent
 *
 * @property {'@_var_ref'} '@_var_ref' - The reference to the local variable.
 */
export type VariableComponent = {
  '@_var_ref': string;
};

/**
 * Represents a concatenation operation that can include literal, variable, and object components.
 */
export type Concat = {
  literal_component: string[] | LiteralComponentEnum;
  variable_component?: VariableComponent[];
  object_component?: ObjectComponent[];
};

/**
 * Enumeration representing various literal components.
 */
export enum LiteralComponentEnum {
  Empty = '/',
  FSExitEACCES = '(?:-F\\s+exit=-EACCES)',
  FSExitEPERM = '(?:-F\\s+exit=-EPERM)',
}

/**
 * Represents a component of an object in the OVAL (Open Vulnerability and Assessment Language) schema.
 *
 * @interface ObjectComponent
 *
 * @property {'@_item_field'} ItemField - The field of the item associated with this object component.
 * @property {'@_object_ref'} string - A reference to the object associated with this component.
 */
export type ObjectComponent = {
  '@_item_field': ItemField;
  '@_object_ref': string;
};

/**
 * Enum representing different item fields.
 *
 * @enum {string}
 * @property {string} Filepath - Represents the file path.
 * @property {string} Subexpression - Represents a subexpression.
 * @property {string} UserID - Represents the user ID.
 * @property {string} Value - Represents a value.
 */
export enum ItemField {
  Filepath = 'filepath',
  Subexpression = 'subexpression',
  UserID = 'user_id',
  Value = 'value',
}

/**
 * Represents a count of object components and unique elements.
 */
export type Count = {
  object_component?: ObjectComponent[];
  unique?: GlobToRegexElement[];
};

/**
 * Represents an element that converts a glob pattern to a regular expression.
 *
 * @property {ObjectComponent[]} object_component - An array of object components that are part of this element.
 */
export type GlobToRegexElement = {
  object_component: ObjectComponent[];
};

/**
 * Represents a local variable literal component.
 *
 * @property '#text' - The text value of the local variable literal component.
 * @property '@_datatype' - The datatype of the local variable literal component, represented by the `PIDDatatype` type.
 */
export type LocalVariableLiteralComponent = {
  '#text': string;
  '@_datatype': PIDDatatype;
};

/**
 * Represents a regex capture pattern and its associated object components.
 *
 * @property {'@_pattern'} pattern - The regex pattern to be captured.
 * @property {ObjectComponent[]} object_component - An array of object components that match the regex pattern.
 */
export type RegexCapture = {
  '@_pattern': string;
  object_component: ObjectComponent[];
};

/**
 * Represents a split operation with a delimiter and optional object and variable components.
 *
 * @interface Split
 *
 * @property {'@_delimiter'} '@_delimiter' - The delimiter used to split the string.
 * @property {ObjectComponent[]} [object_component] - An optional array of object components.
 * @property {VariableComponent[]} [variable_component] - An optional array of variable components.
 */
export type Split = {
  '@_delimiter': string;
  object_component?: ObjectComponent[];
  variable_component?: VariableComponent[];
};

/**
 * Represents a substring with specific length and start position.
 *
 * @interface Substring
 *
 * @property {'@_substring_length'} '@_substring_length' - The length of the substring.
 * @property {'@_substring_start'} '@_substring_start' - The starting position of the substring.
 * @property {ObjectComponent[]} [object_component] - An optional array of object components.
 * @property {VariableComponent[]} [variable_component] - An optional array of variable components.
 */
export type Substring = {
  '@_substring_length': string;
  '@_substring_start': string;
  object_component?: ObjectComponent[];
  variable_component?: VariableComponent[];
};

/**
 * Represents a local variable that is unique within the context.
 *
 * @interface LocalVariableUnique
 * @property {GlobToRegexElement[]} glob_to_regex - An array of elements that convert glob patterns to regular expressions.
 */
export type LocalVariableUnique = {
  glob_to_regex: GlobToRegexElement[];
};
