import type Control from '../objects/control';

/**
 * Represents the differences between two profiles.
 *
 * NOTES:
 *   Renamed controls are those that have changed ID number, for example
 *   from V numbers to SV numbers. This includes those with material changes,
 *   such as desc, fix, or check text updates, as well as those with only an
 *   update to ID.
 *
 *   Changed controls are any (whether with a new ID or not) with material
 *   changes, such as desc, fix, and check text updates.
 */
export type ProfileDiff = {
  /**
     * List of control IDs that have been removed.
     */
  removedControlIDs: string[];

  /**
     * List of control IDs that have been added.
     */
  addedControlIDs: string[];

  /**
     * Mapping of old control IDs to new control IDs for renamed controls.
     */
  renamedControlIDs: Record<string, string>;

  /**
     * List of control IDs that have been changed.
     */
  changedControlIDs: string[];

  /**
     * Object containing the added controls, keyed by control ID.
     */
  addedControls: Record<string, Control>;

  /**
     * Object containing the changed controls, keyed by control ID.
     * Each changed control is represented as a partial Control object.
     */
  changedControls: Record<string, Partial<Control>>;
};
