const entries = require('../data.json');

class Entry {
    constructor(data, date) {
        this.date = date;
        this.id = entries.length + 1;
        this.title = data.title;
        this.message = data.message;
        this.image = data.image;
        this.likes = 0;
        this.dislikes = 0;
        this.love = 0;
        this.comments = [];
    }

    static get all() {
        const allEntries = JSON.stringify(entries)
        return allEntries;
    }

    static findById(id) {
        const entryData = entries.filter((entry) => entry.id === id)[0];
        if (typeof(entryData) == "undefined") {
            throw new Error('That entry does not exist.');
        }
        return entryData;
    }

    static findByTitle(title) {
        const entryData = entries.filter((entry) => entry.title === title)[0];
        if (typeof(entryData) == "undefined") {
            throw new Error('That entry does not exist.');
        }
        return entryData;
    }

    static create(entry, date) {
        const newEntry = new Entry(entry, date);
        entries.push(newEntry)
        return entries;
    }

    static addReply(entry, replyData) {
        console.log(entry)
        entry.comments.push(replyData.code)
        return entries;
    }

    static changeNumberOf(entry, react) {
        entry[react]++
        return entries;
    }

    static deleteEntry(entry){
        const index = entries.indexOf(entry.id);
        entries.splice(index,1);
        return entries;
    }

}

module.exports = Entry;