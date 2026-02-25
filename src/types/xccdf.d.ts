export interface ParsedXCCDF {
  Benchmark: Benchmark[];
}

/**
 * Represents a Benchmark in the XCCDF (Extensible Configuration Checklist Description Format) standard.
 *
 * @property {'@_xmlns:dsig'} [@_xmlns:dsig] - Optional XML namespace for digital signatures.
 * @property {'@_xmlns:xsi'} @_xmlns:xsi - XML namespace for XML Schema Instance.
 * @property {'@_xmlns:cpe'} [@_xmlns:cpe] - Optional XML namespace for Common Platform Enumeration.
 * @property {'@_xmlns:xhtml'} [@_xmlns:xhtml] - Optional XML namespace for XHTML.
 * @property {'@_xmlns:dc'} [@_xmlns:dc] - Optional XML namespace for Dublin Core metadata.
 * @property {'@_xmlns'} @_xmlns - XML namespace for the Benchmark.
 * @property {'@_id'} @_id - Unique identifier for the Benchmark.
 * @property {'@_xml:lang'} @_xml:lang - Language of the XML content.
 * @property {'@_xsi:schemaLocation'} [@_xsi:schemaLocation] - Optional schema location for XML validation.
 * @property {Status[]} status - Array of status elements describing the Benchmark's status.
 * @property {FrontMatter[] | string} title - Title of the Benchmark, can be an array of front matter elements or a string.
 * @property {RationaleElement[] | string} description - Description of the Benchmark, can be an array of rationale elements or a string.
 * @property {Notice[]} notice - Array of notice elements providing legal or other notices.
 * @property {BenchmarkReference[]} [reference] - Optional array of references related to the Benchmark.
 * @property {PlainText[]} ['plain-text'] - Optional array of plain text elements.
 * @property {VersionElement[] | number} version - Version of the Benchmark, can be an array of version elements or a number.
 * @property {Profile[]} Profile - Array of profiles defined within the Benchmark.
 * @property {BenchmarkGroup[]} Group - Array of groups defined within the Benchmark.
 * @property {FrontMatter[]} ['front-matter'] - Optional array of front matter elements.
 * @property {FrontMatter[]} ['rear-matter'] - Optional array of rear matter elements.
 * @property {'@_resolved'} [@_resolved] - Optional resolved attribute.
 * @property {'@_style'} [@_style] - Optional style attribute.
 * @property {Platform[]} [platform] - Optional array of platforms applicable to the Benchmark.
 * @property {Metadatum[]} [metadata] - Optional array of metadata elements.
 * @property {Model[]} [model] - Optional array of models associated with the Benchmark.
 */
export interface Benchmark {
  '@_xmlns:dsig'?: string;
  '@_xmlns:xsi': string;
  '@_xmlns:cpe'?: string;
  '@_xmlns:xhtml'?: string;
  '@_xmlns:dc'?: string;
  '@_xmlns': string;
  '@_id': string;
  '@_xml:lang': XMLLang;
  '@_xsi:schemaLocation'?: string;
  status: Status[];
  title: FrontMatter[] | string;
  description: RationaleElement[] | string;
  notice: Notice[];
  reference?: BenchmarkReference[];
  'plain-text'?: PlainText[];
  version: VersionElement[] | number;
  Profile: Profile[];
  Group: BenchmarkGroup[];
  'front-matter'?: FrontMatter[];
  'rear-matter'?: FrontMatter[];
  '@_resolved'?: string;
  '@_style'?: string;
  platform?: Platform[];
  metadata?: Metadatum[];
  model?: Model[];
}

export enum XMLLang {
  En = 'en',
  EnUS = 'en-US',
}

export interface BenchmarkGroup {
  '@_id': string;
  title: FrontMatter[] | string;
  description: FrontMatter[] | CunningDescription;
  Rule?: BenchmarkRule[];
  Value?: HilariousValue[];
  platform?: Platform[];
  Group?: BenchmarkGroup[];
}

export interface FluffyGroup {
  '@_id': string;
  title: FrontMatter[];
  description: IndecentDescription[];
  Rule?: StickyRule[];
  Group?: TentacledGroup[];
  platform?: Platform[];
  Value?: StickyValue[];
  warning?: FrontMatter[];
}

export interface TentacledGroup {
  '@_id': string;
  title: FrontMatter[];
  description: StickyDescription[];
  Value?: TentacledValue[];
  Group?: StickyGroup[];
  platform?: Platform[];
  Rule?: TentacledRule[];
  warning?: FrontMatter[];
}

export interface StickyGroup {
  '@_id': string;
  title: FrontMatter[];
  description: FluffyDescription[];
  platform?: Platform[];
  Rule?: FluffyRule[];
  Value?: PurpleValue[];
  Group?: IndigoGroup[];
  warning?: FrontMatter[];
}

export interface IndigoGroup {
  '@_id': string;
  title: FrontMatter[];
  description: RationaleElement[];
  platform?: Platform[];
  Rule?: PurpleRule[];
}

export interface PurpleRule {
  '@_id': string;
  '@_selected': string;
  '@_severity': Severity;
  title: FrontMatter[];
  description: FrontMatter[];
  warning: FrontMatter[];
  reference: HTMLAElement[];
  rationale: FrontMatter[];
  conflicts: Platform[];
  fix: Notice[];
  check: PurpleCheck[];
}

export enum Severity {
  High = 'high',
  Low = 'low',
  Medium = 'medium',
  Unknown = 'unknown',
}

export interface PurpleCheck {
  '@_system': string;
  'check-content-ref': CheckContentRef[];
}

export interface CheckContentRef {
  '@_name'?: string;
  '@_href': string;
}

export interface Platform {
  '@_idref': string;
}

export interface FrontMatter {
  '#text': string;
  '@_xmlns:xhtml'?: string;
  '@_xml:lang': XMLLang;
  '@_category'?: Category;
  'html:br'?: HTMLBr[];
  'html:code'?: HTMLEmElement[];
  'html:a'?: HTMLA[];
  '@_override'?: string;
  '@_id'?: string;
}

export enum Category {
  Dependency = 'dependency',
  Functionality = 'functionality',
  General = 'general',
  Performance = 'performance',
  Regulatory = 'regulatory',
}

export interface HTMLA {
  '#text': string;
  '@_xmlns:html': string;
  '@_href': string;
}

export interface HTMLBr {
  '@_xmlns:html': string;
}

export interface HTMLEmElement {
  '#text': string;
  '@_xmlns:html': string;
}

export interface Notice {
  '#text'?: string;
  '@_xmlns:xhtml'?: string;
  '@_id': string;
  '@_system'?: System;
  '@_xml:lang'?: XMLLang;
}

export enum System {
  UrnRedhatOsbuildBlueprint = 'urn:redhat:osbuild:blueprint',
  UrnXccdfFixScriptAnsible = 'urn:xccdf:fix:script:ansible',
  UrnXccdfFixScriptKubernetes = 'urn:xccdf:fix:script:kubernetes',
  UrnXccdfFixScriptPuppet = 'urn:xccdf:fix:script:puppet',
  UrnXccdfFixScriptSh = 'urn:xccdf:fix:script:sh',
}

export interface HTMLAElement {
  '#text': string;
  '@_href': string;
}

export interface RationaleElement {
  '#text'?: string;
  p?: string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:br'?: HTMLBr[];
  'html:code'?: HTMLEmElement[];
  'html:pre'?: HTMLEmElement[];
  'html:ul'?: PurpleHTMLUL[];
  'html:a'?: HTMLA[];
  'html:em'?: HTMLEmElement[];
}

export interface PurpleHTMLUL {
  '@_xmlns:html': string;
  'html:li': PurpleHTMLLi[];
}

export interface PurpleHTMLLi {
  '#text': string;
  'html:pre': string;
  'html:code'?: string;
}

export interface FluffyRule {
  '@_id': string;
  '@_selected': string;
  '@_severity': Severity;
  title: FrontMatter[];
  description: PurpleDescription[];
  reference: HTMLAElement[];
  rationale: FrontMatter[];
  platform?: Platform[];
  fix: PurpleFix[];
  check: FluffyCheck[];
}

export interface FluffyCheck {
  '@_system': string;
  'check-content-ref': CheckContentRef[];
  'check-export'?: CheckExport[];
}

export interface CheckExport {
  '@_export-name': string;
  '@_value-id': string;
}

export interface PurpleDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:code'?: PurpleHTMLCode[];
  'html:pre'?: HTMLEmElement[];
  'html:br'?: HTMLBr[];
  'xccdf-1.1:sub'?: Xccdf11Sub[];
  'html:ul'?: FluffyHTMLUL[];
}

export interface PurpleHTMLCode {
  '#text'?: number | string;
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1'?: string;
  'xccdf-1.1:sub'?: Platform[];
}

export interface FluffyHTMLUL {
  '@_xmlns:html': string;
  'html:li': FluffyHTMLLi[];
}

export interface FluffyHTMLLi {
  'html:b': HTMLLiHTMLB[];
}

export interface HTMLLiHTMLB {
  'html:a': HTMLAElement[];
}

export interface Xccdf11Sub {
  '@_xmlns:xccdf-1.1': string;
  '@_idref': string;
}

export interface PurpleFix {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_id': string;
  '@_system': System;
  '@_complexity'?: Severity;
  '@_disruption'?: Severity;
  '@_strategy'?: Strategy;
  'xccdf-1.1:sub'?: Xccdf11Sub[];
  '@_reboot'?: string;
}

export enum Strategy {
  Configure = 'configure',
  Disable = 'disable',
  Enable = 'enable',
  Restrict = 'restrict',
}

export interface PurpleValue {
  '@_id': string;
  '@_type': Type;
  title: FrontMatter[];
  description: FrontMatter[];
  value: Array<FluffyValue | number | string>;
  '@_interactive'?: string;
}

export enum Type {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
}

export interface FluffyValue {
  '#text': number | string;
  '@_selector': string;
}

export interface FluffyDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:pre'?: HTMLEmElement[];
  'html:code'?: PurpleHTML[];
  'html:br'?: HTMLBr[];
  'html:i'?: HTMLEmElement[];
  'html:a'?: HTMLA[];
}

export interface PurpleHTML {
  '#text'?: string;
  '@_xmlns:html': string;
  'html:i'?: string;
  'html:a'?: HTMLAElement[];
}

export interface TentacledRule {
  '@_id': string;
  '@_selected': string;
  '@_severity': Severity;
  title: FrontMatter[];
  description: TentacledDescription[];
  warning?: PurpleWarning[];
  reference?: HTMLAElement[];
  rationale: PurpleRationale[];
  platform?: Platform[];
  check?: TentacledCheck[];
  fix?: PurpleFix[];
  'complex-check'?: RuleComplexCheck[];
}

export interface TentacledCheck {
  '@_system': string;
  'check-content-ref': CheckContentRef[];
  'check-export'?: CheckExport[];
  'check-import'?: CheckImport[];
}

export interface CheckImport {
  '@_import-name': ImportName;
}

export enum ImportName {
  Stdout = 'stdout',
}

export interface RuleComplexCheck {
  '@_operator': PurpleOperator;
  'complex-check': RuleComplexCheck[];
  check: PurpleCheck[];
}

export enum PurpleOperator {
  Or = 'OR',
}

export enum FluffyOperator {
  And = 'AND',
}

export interface TentacledDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:pre'?: PurpleHTMLPre[];
  'html:code'?: FluffyHTMLCode[];
  'html:br'?: HTMLBr[];
  'html:a'?: HTMLA[];
  'html:i'?: HTMLEmElement[];
  'xccdf-1.1:sub'?: Xccdf11Sub[];
  'html:ul'?: TentacledHTMLUL[];
}

export interface FluffyHTMLCode {
  '#text'?: boolean | number | string;
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1'?: string;
  'xccdf-1.1:sub'?: Platform[];
  'html:i'?: string;
}

export interface PurpleHTMLPre {
  '#text': string;
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1'?: string;
  'xccdf-1.1:sub'?: Platform[];
  'html:i'?: HTMLIHTMLB[] | string;
  'html:code'?: string;
}

export interface HTMLIHTMLB {
  'xccdf-1.1:sub': Platform[];
}

export interface TentacledHTMLUL {
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1'?: string;
  'html:li': Array<TentacledHTMLLi | string>;
}

export interface TentacledHTMLLi {
  '#text': string;
  'html:code': string;
  'html:pre': HTMLLiHTMLPreClass[];
}

export interface HTMLLiHTMLPreClass {
  '#text': string;
  'html:i': string;
  'xccdf-1.1:sub': Platform[];
}

export interface PurpleRationale {
  '#text'?: string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:a'?: HTMLA[];
  'html:br'?: HTMLBr[];
  'html:code'?: HTMLEmElement[];
  'html:ul'?: StickyHTMLUL[];
}

export interface StickyHTMLUL {
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1': string;
  'html:li': StickyHTMLLi[];
}

export interface StickyHTMLLi {
  '#text': string;
  'html:code': Array<HTMLCodeHTMLPre | string> | string;
  'html:pre': HTMLCodeHTMLPre[] | string;
}

export interface HTMLCodeHTMLPre {
  '#text': string;
  'xccdf-1.1:sub': Platform[];
}

export interface PurpleWarning {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  '@_category': Category;
  'html:b'?: WarningHTMLB[];
  'html:ul'?: IndigoHTMLUL[];
  'html:code'?: HTMLEmElement[];
}

export interface WarningHTMLB {
  '@_xmlns:html': string;
  'html:a': HTMLAElement[];
}

export interface IndigoHTMLUL {
  '@_xmlns:html': string;
  'html:li': IndigoHTMLLi[];
}

export interface IndigoHTMLLi {
  'html:code': string;
}

export interface TentacledValue {
  '@_id': string;
  '@_type': Type;
  '@_interactive'?: string;
  title: FrontMatter[];
  description: FrontMatter[];
  value: Array<FluffyValue | number | string> | number | string;
  warning?: FrontMatter[];
}

export interface StickyDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:br'?: HTMLBr[];
  'html:b'?: FluffyHTML[];
  'html:code'?: PurpleHTML[];
  'html:ul'?: IndecentHTMLUL[];
  'html:i'?: HTMLEmElement[];
  'html:pre'?: PurpleHTML[];
}

export interface FluffyHTML {
  '@_xmlns:html': string;
  'html:a'?: HTMLAElement[];
  '#text'?: string;
}

export interface IndecentHTMLUL {
  '@_xmlns:html': string;
  'html:li': Array<IndecentHTMLLi | string>;
}

export interface IndecentHTMLLi {
  'html:code': string[] | string;
  'html:br'?: string;
  'html:p'?: HTMLPElement[] | string;
  '#text'?: string;
}

export interface HTMLPElement {
  '#text': string;
  'html:code': string[];
}

export interface StickyRule {
  '@_id': string;
  '@_selected': string;
  '@_severity': Severity;
  title: FrontMatter[];
  description: IndigoDescription[];
  reference?: HTMLAElement[];
  rationale: FluffyRationale[];
  fix?: PurpleFix[];
  check?: TentacledCheck[];
  platform?: Platform[];
  warning?: FluffyWarning[];
  requires?: Platform[];
}

export interface IndigoDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:pre'?: FluffyHTMLPre[];
  'html:code'?: TentacledHTMLCode[];
  'html:br'?: HTMLBr[];
  'html:a'?: HTMLA[];
  'html:i'?: HTMLEmElement[];
  'xccdf-1.1:sub'?: Xccdf11Sub[];
  'html:ul'?: IndigoHTMLUL[];
  'html:b'?: HTMLEmElement[];
}

export interface TentacledHTMLCode {
  '#text'?: boolean | number | string;
  '@_xmlns:html': string;
  'html:br'?: string[];
  'html:i'?: HTMLIHTMLB[] | string;
  '@_xmlns:xccdf-1.1'?: string;
  'xccdf-1.1:sub'?: Platform[];
}

export interface FluffyHTMLPre {
  '#text': string;
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1'?: string;
  'xccdf-1.1:sub'?: Platform[];
  'html:i'?: Array<HTMLIHTMLB | string> | string;
  'html:code'?: string[] | string;
  'html:b'?: HTMLIHTMLB[];
}

export interface FluffyRationale {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:code'?: RationaleHTMLCode[];
  'html:br'?: HTMLBr[];
  'html:pre'?: HTMLEmElement[];
}

export interface RationaleHTMLCode {
  '#text': number | string;
  '@_xmlns:html': string;
}

export interface FluffyWarning {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  '@_category': Category;
  'html:code'?: RationaleHTMLCode[];
  'html:ul'?: HilariousHTMLUL[];
  'html:pre'?: HTMLEmElement[];
  'html:b'?: WarningHTMLB[];
}

export interface HilariousHTMLUL {
  '@_xmlns:html': string;
  'html:li': Array<HilariousHTMLLi | string>;
}

export interface HilariousHTMLLi {
  'html:code': string[] | string;
  '#text'?: string;
}

export interface StickyValue {
  '@_id': string;
  '@_type': Type;
  '@_interactive'?: string;
  title: FrontMatter[];
  description: FrontMatter[];
  value: Array<boolean | IndigoValue | number | string> | string;
  '@_operator'?: string;
}

export interface IndigoValue {
  '#text': boolean | number | string;
  '@_selector': string;
}

export interface IndecentDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:i'?: HTMLIClass[];
  'html:code'?: PurpleHTML[];
  'html:ul'?: AmbitiousHTMLUL[];
  'html:a'?: HTMLA[];
  'html:br'?: HTMLBr[];
  'html:b'?: FluffyHTML[];
  'html:pre'?: PurpleHTML[];
}

export interface HTMLIClass {
  '#text': string;
  '@_xmlns:html': string;
  'html:code'?: string[];
}

export interface AmbitiousHTMLUL {
  '@_xmlns:html': string;
  'html:li': Array<AmbitiousHTMLLi | string>;
}

export interface AmbitiousHTMLLi {
  '#text': string;
  'html:code': string[] | string;
  'html:pre'?: string;
}

export interface IndigoRule {
  '@_id': string;
  '@_selected': string;
  '@_severity': Severity;
  title: FrontMatter[];
  description: HilariousDescription[];
  warning?: TentacledWarning[];
  reference?: HTMLAElement[];
  rationale: RationaleElement[];
  check?: TentacledCheck[];
  platform?: Platform[];
  fix?: PurpleFix[];
  requires?: Platform[];
}

export interface HilariousDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:code'?: PurpleHTMLCode[];
  'html:pre'?: TentacledHTMLPre[];
  'html:br'?: HTMLBr[];
  'html:a'?: HTMLA[];
  'xccdf-1.1:sub'?: Xccdf11Sub[];
  'html:em'?: HTMLEmElement[];
}

export interface TentacledHTMLPre {
  '#text': string;
  '@_xmlns:html': string;
  '@_xmlns:xccdf-1.1'?: string;
  'xccdf-1.1:sub'?: Platform[];
  'html:i'?: string;
}

export interface TentacledWarning {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  '@_category': string;
  'html:code'?: HTMLEmElement[];
  'html:pre'?: HTMLEmElement[];
  'html:ul'?: PurpleHTMLUL[];
}

export interface IndecentValue {
  '@_id': string;
  '@_type': Type;
  title: FrontMatter[];
  description: FrontMatter[];
  value: Array<boolean | IndigoValue | number | string> | number;
  '@_interactive'?: string;
}

export interface AmbitiousDescription {
  '#text': string;
  '@_xmlns:xhtml': string;
  '@_xml:lang': XMLLang;
  'html:code'?: FluffyHTML[];
  'html:br'?: HTMLBr[];
  'html:pre'?: HTMLEmElement[];
  'html:ul'?: CunningHTMLUL[];
  'html:i'?: HTMLEmElement[];
  'html:a'?: HTMLA[];
}

export interface CunningHTMLUL {
  '@_xmlns:html': string;
  'html:li': Array<CunningHTMLLi | string>;
}

export interface CunningHTMLLi {
  'html:code': string;
  'html:ul': HTMLLiHTMLUL[];
  '#text'?: string;
}

export interface HTMLLiHTMLUL {
  'html:li': HilariousHTMLLi[] | string;
}

export interface BenchmarkRule {
  '@_id': string;
  '@_severity': Severity;
  '@_weight': string;
  version: string;
  title: string[];
  description: string;
  rationale: FrontMatter[];
  reference: PurpleReference[];
  ident: Ident[];
  fixtext: Fixtext[];
  fix: FluffyFix[];
  check: CheckContent[];
  'complex-check'?: RuleComplexCheck[];
}

export interface CheckContent {
  '@_system': string;
  'check-content-ref': CheckContentRef[];
  'check-content': string;
}

export interface FluffyFix {
  '@_id': string;
}

export interface Rationale {
  '#text': string;
  '@_fixref': string;
}

export interface Fixtext {
  '#text': string;
  '@_fixref': string;
}

export interface Ident {
  '#text': string;
  '@_system': string;
}

export interface PurpleReference {
  'dc:title': DcTitle;
  'dc:publisher': DcPublisher;
  'dc:type': DcType;
  'dc:subject': DcSubject;
  'dc:identifier': number;
}

export enum DcPublisher {
  Disa = 'DISA',
}

export enum DcSubject {
  RedHat7 = 'Red Hat 7',
  RedHatEnterpriseLinux8 = 'Red Hat Enterprise Linux 8',
}

export enum DcTitle {
  DPMSTargetRedHat7 = 'DPMS Target Red Hat 7',
  DPMSTargetRedHatEnterpriseLinux8 = 'DPMS Target Red Hat Enterprise Linux 8',
}

export enum DcType {
  DPMSTarget = 'DPMS Target',
}

export interface HilariousValue {
  '@_id': string;
  '@_hidden': string;
  '@_prohibitChanges': string;
  '@_operator': ValueOperator;
  '@_type': Type;
  title: FrontMatter[];
  description: FrontMatter[];
  value: string;
}

export enum ValueOperator {
  Equals = 'equals',
}

export enum CunningDescription {
  LtGroupDescriptionGtLtGroupDescriptionGt = '&lt;GroupDescription&gt;&lt;/GroupDescription&gt;',
}

export interface Profile {
  '@_id': string;
  title: FrontMatter[] | string;
  description: FrontMatter[] | MagentaDescription;
  select: Select[];
  'refine-value'?: RefineValue[];
}

export enum MagentaDescription {
  LtProfileDescriptionGtLtProfileDescriptionGt = '&lt;ProfileDescription&gt;&lt;/ProfileDescription&gt;',
}

export interface RefineValue {
  '@_idref': string;
  '@_selector': string;
}

export interface Select {
  '@_idref': string;
  '@_selected': string;
}

export interface Metadatum {
  '@_xmlns:xhtml': string;
  'dc:publisher': Dc[];
  'dc:creator': Dc[];
  'dc:contributor': Dc[];
  'dc:source': Dc[];
}

export interface Dc {
  '#text': string;
  '@_xmlns:dc': string;
}

export interface Model {
  '@_system': string;
}

export interface PlainText {
  '#text': string;
  '@_id': string;
}

export interface BenchmarkReference {
  '@_href': string;
  'dc:publisher': DcPublisher;
  'dc:source': string;
}

export interface Status {
  '#text': string;
  '@_date': Date;
}

export interface VersionElement {
  '#text': string;
  '@_update': string;
}

export interface DecodedDescription {
  VulnDiscussion?: string;
  FalsePositives?: string;
  FalseNegatives?: string;
  Documentable?: boolean;
  Mitigations?: string;
  SeverityOverrideGuidance?: string;
  PotentialImpacts?: string;
  ThirdPartyTools?: string;
  MitigationControl?: string;
  MitigationControls?: string;
  Responsibility?: string;
  IAControls?: string;
}
