import Control from "../objects/control"

export type ProfileDiff = {
    removedControlIDs: string[];
    addedControlIDs: string[];
    changedControls: {
        [key: string]: Partial<Control>;
    }
}