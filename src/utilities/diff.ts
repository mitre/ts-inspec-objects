import { diff } from 'json-diff';
import Profile from '../objects/profile';
import { ProfileDiff } from '../types/diff';
import _ from 'lodash'

export function diffProfile(fromProfile: Profile, toProfile: Profile): ProfileDiff {
    const profileDiff: ProfileDiff = {
        addedControlIDs: [],
        removedControlIDs: [],
        changedControls: {}
    };

    const fromControlIDs = fromProfile.controls.map((control) => control.id).sort();
    const toControlIDs = toProfile.controls.map((control) => control.id).sort();

    // Find new controls
    const controlIDDiff: string[][] = diff(fromControlIDs, toControlIDs)
    controlIDDiff.forEach((diffValue) => {
        if (diffValue[0] === '-') {
            profileDiff.removedControlIDs.push(diffValue[1])
        } else if (diffValue[0] === '+') {
            profileDiff.addedControlIDs.push(diffValue[1])
        }
    })

    // Add new controls to changedControls
    profileDiff.addedControlIDs.forEach((addedControl) => {
        const newControl = toProfile.controls.find((control) => addedControl === control.id)
        if (newControl) {
            profileDiff.changedControls[addedControl] = newControl
        }
    })

    // Find changed controls
    for (const fromControl of fromProfile.controls) {
        const toControl = toProfile.controls.find((control) => control.id === fromControl.id)
        if (toControl) {
            const controlDiff: Record<string, any> | undefined = diff(fromControl, toControl);
            if (controlDiff) {
                Object.entries(controlDiff).forEach(([key, value]) => {
                    if (_.has(value, '__new')) {
                        _.set(profileDiff, 'changedControls.'+fromControl.id +'.'+key.replace('.', '\\.'), _.get(controlDiff, key+'.__new'))
                    } else if (typeof value === 'object') {
                        Object.entries(value).forEach(([subKey]) => {
                            _.set(profileDiff, 'changedControls.'+fromControl.id +'.'+key.replace('.', '\\.')+'.'+subKey.replace('.', '\\.'), _.get(controlDiff, key+'.'+subKey+'.__new'))
                        })
                    }
                })
            }
        }
    }

    return profileDiff
}