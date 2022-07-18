import Control from "../objects/control"

export type ProfileDiff = {
    removedControlIDs: string[];
    addedControlIDs: string[];
    addedControls: {
        [key: string]: Control;
    }
    changedControls: {
        [key: string]: Partial<Control>;
    }
}