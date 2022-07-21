import Control from "../objects/control"

export type ProfileDiff = {
    removedControlIDs: string[];
    addedControlIDs: string[];
    renamedControlIds: Record<string, string>;
    addedControls: {
        [key: string]: Control;
    }
    changedControls: {
        [key: string]: Partial<Control>;
    }
}