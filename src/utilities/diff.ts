import { diff } from 'json-diff';
import Profile from '../objects/profile';
import { ProfileDiff } from '../types/diff';
import _ from 'lodash'

export function removeNewlines(control?: Record<string, unknown>): Record<string, unknown> {
    if (!control) {
        return {};
    }
    return _.mapValues(control, (value) => {
        if (typeof value === 'string') {
            return value.replace(/\n/g, '{{{{newlineHERE}}}}').trim();
        } else if (typeof value === 'object' && value !== null) {
            return removeNewlines(value as Record<string, unknown>);
        }
        return value;
    });
}

export function simplifyDiff(diffData: Record<string, unknown>) {
    return _.transform(diffData, (result: Record<string, unknown>, diffValue, key) => {
        if (_.has(diffValue, '__new')) {
            // Remove any trailing space
            if (typeof _.get(diffValue, '__new') === 'string' && typeof _.get(diffValue, '__old') === 'string') {
                if (_.get(diffValue, '__new').trim() !== _.get(diffValue, '__old').trim()) {
                    _.set(result, key, _.get(diffValue, '__new'));
                }
            } else {
                result[key] = _.get(diffValue, '__new')
            }
        } else if (Array.isArray(diffValue)) {
            result[key] = diffValue.map((value) => value[0] === '+' && value[1]).filter(value => value)
        } else if (typeof diffValue === 'object') {
            result[key] = simplifyDiff(diffValue as Record<string, unknown>)
        } else if (key.endsWith('__deleted')) {
            return undefined
        } else {
            result[key] = diffValue
        }
    })
}

export function diffProfile(fromProfile: Profile, toProfile: Profile): {simplified: ProfileDiff, originalDiff: Record<string, unknown>} {
    const profileDiff: ProfileDiff = {
        addedControlIDs: [],
        removedControlIDs: [],
        addedControls: {},
        changedControls: {}
    };

    const originalDiff: ProfileDiff = {
        addedControlIDs: [],
        removedControlIDs: [],
        addedControls: {},
        changedControls: {}
    };

    const fromControlIDs = fromProfile.controls.map((control) => control.id).sort();
    const toControlIDs = toProfile.controls.map((control) => control.id).sort();

    // Find new controls
    const controlIDDiff: string[][] | undefined = diff(fromControlIDs, toControlIDs)

    controlIDDiff?.forEach((diffValue) => {
        if (diffValue[0] === '-') {
            profileDiff.removedControlIDs.push(diffValue[1])
            originalDiff.removedControlIDs.push(diffValue[1])
        } else if (diffValue[0] === '+') {
            profileDiff.addedControlIDs.push(diffValue[1])
            originalDiff.addedControlIDs.push(diffValue[1])
        }
    })

    // Add new controls to changedControls
    profileDiff.addedControlIDs.forEach((addedControl) => {
        const newControl = toProfile.controls.find((control) => addedControl === control.id)
        if (newControl) {
            profileDiff.addedControls[addedControl] = newControl
            originalDiff.addedControls[addedControl] = newControl
        }
    })

    // Find changed controls
    for (const fromControl of fromProfile.controls) {
        const toControl = toProfile.controls.find((control) => control.id === fromControl.id)
        if (toControl) {
            const controlDiff: Record<string, any> | undefined = _.omit(diff(fromControl, toControl), 'code__deleted');
            if (controlDiff) {
                profileDiff.changedControls[toControl.id!] = simplifyDiff(controlDiff)
                originalDiff.changedControls[toControl.id!] = controlDiff
            }
        }
    }

    return {simplified: profileDiff, originalDiff: originalDiff}
}