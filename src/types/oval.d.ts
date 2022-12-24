export interface Oval {
    oval_definitions: OvalDefinition[];
}

export interface OvalDefinition {
    '@_schemaLocation': string;
    generator:          Generator[];
    definitions:        OvalOvalDefinitionValue[];
    tests:              { [key: string]: Test[] }[];
    objects:            OvalDefinitionObject[];
    states:             OvalDefinitionState[];
    variables:          Variable[];
}

export interface OvalOvalDefinitionValue {
    definition: OvalDefinitionValue[];
}

export interface OvalDefinitionValue {
    '@_class':   Class;
    '@_id':      string;
    '@_version': string;
    metadata:    Metadatum[];
    criteria:    DefinitionCriterion[];
}

export enum Class {
    Compliance = 'compliance',
    Inventory = 'inventory',
}

export interface DefinitionCriterion {
    '@_comment'?:       string;
    '@_operator'?:      Operator;
    criterion?:         IndigoCriterion[];
    criteria?:          PurpleCriterion[];
    extend_definition?: ExtendDefinition[];
}

export enum Operator {
    And = 'AND',
    Or = 'OR',
}

export interface PurpleCriterion {
    '@_operator':       Operator;
    criterion?:         IndigoCriterion[];
    '@_comment'?:       string;
    extend_definition?: ExtendDefinition[];
    criteria?:          FluffyCriterion[];
}

export interface FluffyCriterion {
    '@_comment'?:       string;
    '@_operator':       Operator;
    extend_definition?: ExtendDefinition[];
    criterion?:         IndigoCriterion[];
    criteria?:          TentacledCriterion[];
}

export interface TentacledCriterion {
    '@_operator': Operator;
    criterion:    StickyCriterion[];
    '@_comment'?: string;
}

export interface StickyCriterion {
    '@_comment':  string;
    '@_test_ref': string;
}

export interface IndigoCriterion {
    '@_comment'?: string;
    '@_test_ref': string;
    '@_negate'?:  string;
}

export interface ExtendDefinition {
    '@_comment'?:       string;
    '@_definition_ref': string;
    '@_negate'?:        string;
}

export interface Metadatum {
    title:       string;
    affected:    Affected[];
    description: string;
    reference:   Reference[];
}

export interface Affected {
    '@_family': Family;
    platform:   Platform;
}

export enum Family {
    Unix = 'unix',
}

export enum Platform {
    Ubuntu2004 = 'Ubuntu 20.04',
}

export interface Reference {
    '@_ref_id': string;
    '@_source': Source;
}

export enum Source {
    Cpe = 'CPE',
    Ssg = 'ssg',
}

export interface Generator {
    product_name:    string;
    product_version: string;
    schema_version:  number;
    timestamp:       Date;
}

export interface OvalDefinitionObject {
    textfilecontent54_object:     Textfilecontent54Object[];
    file_object:                  FileObject[];
    variable_object:              VariableObject[];
    symlink_object:               SymlinkObject[];
    password_object:              PasswordObject[];
    shadow_object:                ShadowObject[];
    environmentvariable58_object: Object[];
    rpminfo_object:               RpminfoObject[];
    systemdunitproperty_object:   SystemdunitpropertyObject[];
    systemdunitdependency_object: SymlinkObject[];
    dpkginfo_object:              Object[];
    partition_object:             PartitionObject[];
    sysctl_object:                Object[];
    family_object:                FamilyObject[];
    uname_object:                 SymlinkObject[];
}

export interface Object {
    '@_id':      string;
    '@_version': string;
    name:        string;
    pid?:        PID[];
}

export interface PID {
    '@_datatype': PIDDatatype;
    '@_nil':      string;
}

export enum PIDDatatype {
    Int = 'int',
    String = 'string',
}

export interface FamilyObject {
    '@_id':      string;
    '@_version': string;
}

export interface FileObject {
    '@_comment'?: string;
    '@_id':       string;
    '@_version':  string;
    filepath?:    Pattern[] | string;
    path?:        Pattern[] | string;
    filename?:    FilenameElement[] | string;
    behaviors?:   FileObjectBehavior[];
    filter?:      Filter[];
}

export interface FileObjectBehavior {
    '@_max_depth'?:          string;
    '@_recurse':             Recurse;
    '@_recurse_direction':   RecurseDirection;
    '@_recurse_file_system': RecurseFileSystem;
}

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

export interface FilenameElement {
    '#text'?:       string;
    '@_operation'?: Operation;
    '@_nil'?:       string;
}

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

export interface Pattern {
    '#text'?:       string;
    '@_operation'?: Operation;
    '@_datatype'?:  PIDDatatype;
    '@_var_check'?: Check;
    '@_var_ref'?:   string;
}

export enum Check {
    All = 'all',
    AtLeastOne = 'at least one',
    NoneSatisfy = 'none satisfy',
}

export interface Filter {
    '#text':    string;
    '@_action': Action;
}

export enum Action {
    Exclude = 'exclude',
    Include = 'include',
}

export interface PartitionObject {
    '@_id':      string;
    '@_version': string;
    mount_point: string;
}

export interface PasswordObject {
    '@_id':      string;
    '@_version': string;
    username:    EvrElement[];
}

export interface EvrElement {
    '#text':           string;
    '@_operation':     Operation;
    '@_datatype'?:     string;
    '@_entity_check'?: Check;
}

export interface RpminfoObject {
    '@_id':      string;
    '@_version': string;
    name:        ProcessorTypeElement[] | string;
}

export interface ProcessorTypeElement {
    '#text':       string;
    '@_operation': Operation;
}

export interface ShadowObject {
    '@_id':      string;
    '@_version': string;
    username:    ProcessorTypeElement[];
    filter:      Filter[];
}

export interface SymlinkObject {
    '@_comment'?:    string;
    '@_id':          string;
    '@_version':     string;
    filepath?:       string;
    unit?:           Unit;
    value?:          ValueElement[] | ValueEnum;
    canonical_path?: ProcessorTypeElement[] | string;
    dependency?:     Dependency[];
    processor_type?: ProcessorTypeElement[];
}

export interface Dependency {
    '#text':          string;
    '@_entity_check': Check;
}

export enum Unit {
    MultiUserTarget = 'multi-user.target',
}

export interface ValueElement {
    '#text'?:       number | string;
    '@_operation':  Operation;
    '@_datatype'?:  PIDDatatype;
    '@_var_check'?: Check;
    '@_var_ref'?:   string;
}

export enum ValueEnum {
    Active = 'active',
    Enabled = 'enabled',
    Inactive = 'inactive',
    Masked = 'masked',
}

export interface SystemdunitpropertyObject {
    '@_id':       string;
    '@_version':  string;
    unit:         ProcessorTypeElement[] | string;
    property:     Property;
    '@_comment'?: string;
}

export enum Property {
    ActiveState = 'ActiveState',
    LoadState = 'LoadState',
    UnitFileState = 'UnitFileState',
}

export interface Textfilecontent54Object {
    '@_id':       string;
    '@_version':  string;
    filepath?:    Pattern[] | string;
    pattern:      Pattern[];
    instance:     Instance[];
    '@_comment'?: string;
    path?:        ProcessorTypeElement[] | string;
    filename?:    ProcessorTypeElement[];
    behaviors?:   Textfilecontent54ObjectBehavior[];
    filter?:      Filter[];
}

export interface Textfilecontent54ObjectBehavior {
    '@_singleline': string;
    '@_multiline'?: string;
}

export interface Instance {
    '#text'?:       number;
    '@_datatype':   PIDDatatype;
    '@_operation'?: Operation;
    '@_var_ref'?:   string;
}

export interface VariableObject {
    '@_id':       string;
    '@_version':  string;
    var_ref?:     string;
    '@_comment'?: string;
    set?:         Set[];
}

export interface Set {
    object_reference: string[];
}

export interface OvalDefinitionState {
    textfilecontent54_state:     Textfilecontent54State[];
    variable_state:              SymlinkObject[];
    symlink_state:               SymlinkObject[];
    password_state:              State[];
    shadow_state:                State[];
    file_state:                  FileState[];
    environmentvariable58_state: SymlinkObject[];
    systemdunitproperty_state:   SymlinkObject[];
    systemdunitdependency_state: SymlinkObject[];
    partition_state:             PartitionState[];
    sysctl_state:                SysctlState[];
    rpminfo_state:               RpminfoState[];
    family_state:                FamilyState[];
    dpkginfo_state:              DpkginfoState[];
    uname_state:                 SymlinkObject[];
}

export interface DpkginfoState {
    '@_id':      string;
    '@_version': string;
    evr:         EvrElement[];
}

export interface FamilyState {
    '@_id':      string;
    '@_version': string;
    family:      Family;
}

export interface FileState {
    '@_id':        string;
    '@_version':   string;
    type?:         ProcessorTypeElement[] | string;
    uread?:        Gexec[];
    uwrite?:       Gexec[];
    uexec?:        Gexec[];
    gread?:        Gexec[];
    gwrite?:       Gexec[];
    gexec?:        Gexec[];
    oread?:        Gexec[];
    owrite?:       Gexec[];
    oexec?:        Gexec[];
    path?:         ProcessorTypeElement[];
    '@_operator'?: Operator;
    suid?:         Gexec[];
    sgid?:         Gexec[];
    sticky?:       Gexec[];
    '@_comment'?:  string;
    group_id?:     Instance[];
    user_id?:      UserID[];
    filepath?:     ProcessorTypeElement[];
}

export interface Gexec {
    '#text':      boolean;
    '@_datatype': GexecDatatype;
}

export enum GexecDatatype {
    Boolean = 'boolean',
}

export interface UserID {
    '#text'?:       number;
    '@_datatype':   PIDDatatype;
    '@_operation'?: Operation;
    '@_var_check'?: Check;
    '@_var_ref'?:   string;
}

export interface PartitionState {
    '@_id':        string;
    '@_version':   string;
    mount_options: EvrElement[];
}

export interface State {
    '@_id':          string;
    '@_version':     string;
    password?:       ProcessorTypeElement[];
    encrypt_method?: ProcessorTypeElement[];
}

export interface RpminfoState {
    '@_id':      string;
    '@_version': string;
    version?:    ProcessorTypeElement[];
    name?:       ProcessorTypeElement[];
    evr?:        EvrElement[];
}

export interface SysctlState {
    '@_id':      string;
    '@_version': string;
    value:       Instance[];
}

export interface Textfilecontent54State {
    '@_comment'?:   string;
    '@_id':         string;
    '@_version':    string;
    subexpression?: ValueElement[] | number | string;
    text?:          Text[];
}

export interface Text {
    '#text':       number | string;
    '@_operation': Operation;
}

export interface Test {
    '@_check':            Check;
    '@_check_existence'?: CheckExistence;
    '@_comment':          string;
    '@_id':               string;
    '@_version':          string;
    object:               TestObject[];
    state?:               TestState[];
    '@_state_operator'?:  Operator;
}

export enum CheckExistence {
    AllExist = 'all_exist',
    AnyExist = 'any_exist',
    AtLeastOneExists = 'at_least_one_exists',
    NoneExist = 'none_exist',
    OnlyOneExists = 'only_one_exists',
}

export interface TestObject {
    '@_object_ref': string;
}

export interface TestState {
    '@_state_ref': string;
}

export interface Variable {
    external_variable: ConstantVariableElement[];
    local_variable:    LocalVariable[];
    constant_variable: ConstantVariableElement[];
}

export interface ConstantVariableElement {
    '@_comment':  string;
    '@_datatype': PIDDatatype;
    '@_id':       string;
    '@_version':  string;
    value?:       string[] | string;
}

export interface LocalVariable {
    '@_comment':        string;
    '@_datatype':       PIDDatatype;
    '@_id':             string;
    '@_version':        string;
    concat?:            Concat[];
    split?:             Split[];
    regex_capture?:     RegexCapture[];
    count?:             Count[];
    object_component?:  ObjectComponent[];
    substring?:         Substring[];
    arithmetic?:        LocalVariableArithmetic[];
    unique?:            LocalVariableUnique[];
    literal_component?: LocalVariableLiteralComponent[];
}

export interface LocalVariableArithmetic {
    '@_arithmetic_operation': string;
    arithmetic:               ArithmeticArithmetic[];
    variable_component:       VariableComponent[];
}

export interface ArithmeticArithmetic {
    '@_arithmetic_operation': ArithmeticOperation;
    literal_component:        ArithmeticLiteralComponent[];
    variable_component:       VariableComponent[];
}

export enum ArithmeticOperation {
    Multiply = 'multiply',
}

export interface ArithmeticLiteralComponent {
    '#text':      number;
    '@_datatype': PIDDatatype;
}

export interface VariableComponent {
    '@_var_ref': string;
}

export interface Concat {
    literal_component:   string[] | LiteralComponentEnum;
    variable_component?: VariableComponent[];
    object_component?:   ObjectComponent[];
}

export enum LiteralComponentEnum {
    Empty = '/',
    FSExitEACCES = '(?:-F\\s+exit=-EACCES)',
    FSExitEPERM = '(?:-F\\s+exit=-EPERM)',
}

export interface ObjectComponent {
    '@_item_field': ItemField;
    '@_object_ref': string;
}

export enum ItemField {
    Filepath = 'filepath',
    Subexpression = 'subexpression',
    UserID = 'user_id',
    Value = 'value',
}

export interface Count {
    object_component?: ObjectComponent[];
    unique?:           GlobToRegexElement[];
}

export interface GlobToRegexElement {
    object_component: ObjectComponent[];
}

export interface LocalVariableLiteralComponent {
    '#text':      string;
    '@_datatype': PIDDatatype;
}

export interface RegexCapture {
    '@_pattern':      string;
    object_component: ObjectComponent[];
}

export interface Split {
    '@_delimiter':       string;
    object_component?:   ObjectComponent[];
    variable_component?: VariableComponent[];
}

export interface Substring {
    '@_substring_length': string;
    '@_substring_start':  string;
    object_component?:    ObjectComponent[];
    variable_component?:  VariableComponent[];
}

export interface LocalVariableUnique {
    glob_to_regex: GlobToRegexElement[];
}
