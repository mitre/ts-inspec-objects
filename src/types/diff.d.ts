import Control from "../objects/control"

/*
Renamed controls are those that have changed ID number, for example from V numbers to SV numbers. This includes those with material changes, such as desc, fix, or check text updates, as well as those with only an update to ID. 
Changed controls are any (whether with a new ID or not) with material changes, such as desc, fix, and check text updates.
*/

export type ProfileDiff = {
    removedControlIDs: string[];
    addedControlIDs: string[];
    renamedControlIDs: Record<string, string>;
    changedControlIDs: string[];
    addedControls: {
        [key: string]: Control;
    }
    changedControls: {
        [key: string]: Partial<Control>;
    }
}