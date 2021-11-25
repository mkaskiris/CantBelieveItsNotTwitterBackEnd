const entries = require('../data.json')
const Entry = require('../models/entries')

describe('Entry model', () => {
    const testEntry = {
        title: "Another entry",
        message: "Another message",
        image: "something.png",
        comments: [],
    };

    it('should return all entries', () => {
        const entry = JSON.parse(Entry.all);
        expect(entry).toEqual(entries);
    });

    it('should return a entry (findById)', () => {
        const entry = Entry.findById(1);
        expect(entry).toBe(entries[0]);
    });

    it('should throw an error if no entry (findById)', () => {
        function testError() {
            Entry.findById(1000);
        }
        expect(testError).toThrow('That entry does not exist.');
    });

    it('should return a entry (findByTitle)', () => {
        const title = entries[0].title
        const entry = Entry.findByTitle(title);
        expect(entry).toBe(entries[0]);
    });

    it('should throw an error if no entry (findByTitle)', () => {
        function testError() {
            Entry.findByTitle("Nothing");
        }
        expect(testError).toThrow('That entry does not exist.');
    });

    it('should create a new entry', () => {
        const testEntryId = entries.length + 1;
        const newEntries = Entry.create(testEntry);
        const newEntry = Entry.findByTitle("Another entry")
        const testedEntry = new Entry(testEntry)
        testedEntry.id = testEntryId
        expect(newEntry).toEqual(testedEntry);
    });

    it('should add the new comment to the entry', () => {
        const newComment = {code: "new comment"};
        const newEntries = Entry.addReply(entries[0], newComment);
        expect(newEntries[0]).toEqual({comments: newComment.code, ...entries[0]});
    });

    it('should increase the number of loves by 1', () => {
        const newEntries = Entry.changeNumberOf(entries[0], "love");
        expect(newEntries[0]).toEqual({love: entries[0].love + 1, ...entries[0]})
    });

    it('should increase the number of likes by 1', () => {
        const newEntries = Entry.changeNumberOf(entries[0], "likes");
        expect(newEntries[0]).toEqual({likes: entries[0].likes + 1, ...entries[0]})
    });

    it('should increase the number of dislikes by 1', () => {
        const newEntries = Entry.changeNumberOf(entries[0], "dislikes");
        expect(newEntries[0]).toEqual({dislikes: entries[0].dislikes + 1, ...entries[0]})
    });

    it('should delete the entry', () => {
        const entrytoDeleteId = entries.length;
        const entryToDelete = entries[entrytoDeleteId - 1];
        const updatedEntries = Entry.deleteEntry(entryToDelete);

        expect(entryToDelete).toEqual({ id: entrytoDeleteId, ...entryToDelete });
        expect(updatedEntries).not.toContain(entryToDelete);
    })

})
