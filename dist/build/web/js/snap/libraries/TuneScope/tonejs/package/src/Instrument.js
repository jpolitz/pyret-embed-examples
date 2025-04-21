import { DrumKitByPatchID, instrumentByPatchID, InstrumentFamilyByID } from "./InstrumentMaps";
/**
 * @hidden
 */
const privateTrackMap = new WeakMap();
/**
 * Describes the MIDI instrument of a track.
 */
export class Instrument {
    /**
     * The instrument number. Defaults to 0.
     */
    number = 0;
    /**
     * @param trackData
     * @param track
     */
    constructor(trackData, track) {
        privateTrackMap.set(this, track);
        this.number = 0;
        if (trackData) {
            const programChange = trackData.find(e => e.type === "programChange");
            // Set 'number' from 'programNumber' if exists.
            if (programChange) {
                this.number = programChange.programNumber;
            }
        }
    }
    /**
     * The common name of the instrument.
     */
    get name() {
        if (this.percussion) {
            return DrumKitByPatchID[this.number];
        }
        else {
            return instrumentByPatchID[this.number];
        }
    }
    set name(n) {
        const patchNumber = instrumentByPatchID.indexOf(n);
        if (patchNumber !== -1) {
            this.number = patchNumber;
        }
    }
    /**
     * The instrument family, e.g. "piano".
     */
    get family() {
        if (this.percussion) {
            return "drums";
        }
        else {
            return InstrumentFamilyByID[Math.floor(this.number / 8)];
        }
    }
    /**
     * If the instrument is a percussion instrument.
     */
    get percussion() {
        const track = privateTrackMap.get(this);
        return track.channel === 9;
    }
    /**
     * Convert it to JSON form.
     */
    toJSON() {
        return {
            family: this.family,
            number: this.number,
            name: this.name
        };
    }
    /**
     * Convert from JSON form.
     */
    fromJSON(json) {
        this.number = json.number;
    }
}
