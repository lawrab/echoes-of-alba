/**
 * StoryManager - Manages story state and navigation
 */
class StoryManager {
    constructor(storyData) {
        this.storyData = storyData;
        this.currentBeatId = 'start';
        this.choiceHistory = [];
        this.visitedBeats = new Set();
        this.listeners = [];
    }

    /**
     * Get the current story beat data
     */
    getCurrentBeat() {
        const beat = this.storyData[this.currentBeatId];
        if (!beat) {
            console.error(`Story beat not found: ${this.currentBeatId}`);
            return null;
        }
        return beat;
    }

    /**
     * Make a choice and navigate to the next beat
     */
    makeChoice(choiceIndex) {
        const currentBeat = this.getCurrentBeat();
        if (!currentBeat || !currentBeat.choices || !currentBeat.choices[choiceIndex]) {
            console.error(`Invalid choice: ${choiceIndex} for beat ${this.currentBeatId}`);
            return false;
        }

        const choice = currentBeat.choices[choiceIndex];
        this.choiceHistory.push({
            beatId: this.currentBeatId,
            choiceIndex: choiceIndex,
            choiceText: choice.text
        });

        this.navigateTo(choice.nextId);
        return true;
    }

    /**
     * Navigate directly to a story beat (for debug mode)
     */
    navigateTo(beatId) {
        if (!this.storyData[beatId]) {
            console.error(`Cannot navigate to non-existent beat: ${beatId}`);
            return false;
        }

        this.visitedBeats.add(this.currentBeatId);
        this.currentBeatId = beatId;
        this.notifyListeners();
        return true;
    }

    /**
     * Reset the story to the beginning
     */
    reset() {
        this.currentBeatId = 'start';
        this.choiceHistory = [];
        this.visitedBeats = new Set();
        this.notifyListeners();
    }

    /**
     * Subscribe to state changes
     */
    onChange(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all listeners of state change
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.getCurrentBeat()));
    }

    /**
     * Validate story data structure (debug tool)
     */
    validateStory() {
        const errors = [];
        const warnings = [];
        const allBeatIds = Object.keys(this.storyData);

        allBeatIds.forEach(beatId => {
            const beat = this.storyData[beatId];

            // Check for required fields
            if (!beat.text) {
                errors.push(`Beat "${beatId}" missing text field`);
            }

            // Check choices point to valid beats
            if (beat.choices && !beat.isEnding) {
                beat.choices.forEach((choice, index) => {
                    if (!choice.nextId) {
                        errors.push(`Beat "${beatId}" choice ${index} missing nextId`);
                    } else if (!this.storyData[choice.nextId]) {
                        errors.push(`Beat "${beatId}" choice ${index} points to non-existent beat "${choice.nextId}"`);
                    }
                });
            }

            // Check endings don't have choices
            if (beat.isEnding && beat.choices && beat.choices.length > 0) {
                warnings.push(`Beat "${beatId}" is marked as ending but has choices`);
            }

            // Check non-endings have choices
            if (!beat.isEnding && (!beat.choices || beat.choices.length === 0)) {
                warnings.push(`Beat "${beatId}" is not an ending but has no choices`);
            }
        });

        return { errors, warnings, valid: errors.length === 0 };
    }

    /**
     * Get all available beat IDs (for debug jump menu)
     */
    getAllBeatIds() {
        return Object.keys(this.storyData);
    }

    /**
     * Get choice history as formatted string
     */
    getChoiceHistoryString() {
        return this.choiceHistory
            .map((choice, i) => `${i + 1}. ${choice.choiceText} (from ${choice.beatId})`)
            .join('\n');
    }
}
