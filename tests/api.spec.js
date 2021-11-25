const request = require('supertest');

const server = require('../server');

const database = require('../data.json');

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

describe('API server', () => {
    let api;
    let testTweet = {
        date: dayjs().format('HH:mm, DD-MM-YYYY'),
        id: database.length + 1,
        title: " test Title",
        message: "test message",
        image: "https://media.giphy.com/media/TdpZPpb7MjzWsoZGGn/giphy.gif",
        dislikes: 0,
        likes: 0,
        love: 0,
        comments: []
    }
    let testComment = {
        code: "Test works"
    };

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to post / with status 405', (done) => {
        request(api).post('/').expect(405, done);
    });

    it('responds to get /entries with status 200', (done) => {
        request(api).get('/entries').expect(200, done);
    });

    it('responds to post /post with status 201', (done) => {
        request(api)
            .post('/entries')
            .send(testTweet)
            .set('Accept', /application\/json/)
            .expect(201)
            .expect({ ...testTweet }, done);
    });

    it('retrieves an entry by id', (done) => {
        request(api)
            .get('/entries/3')
            .expect(200)
            .expect({
                id: 3,
                title: "Was religion created as a control mechanism so that the rich could profit off the poor and vulnerable?",
                message: "Religion promises of ever lasting life in so many religions. Looking back this promise often came with a cost.Why is that?",
                image: "https://giphy.com/embed/12NlCFUvTokWXe",
                dislikes: 0,
                likes: 0,
                love: 0,
                comments: [
                    "Cool Post",
                    "Really interest thought",
                    "yabadabadoooo"
                ]
            }, done);
    });

    it('responds to a unknown entry id with a 404', (done) => {
        request(api).get('/entries/1000').expect(404).expect({}, done);
    });

    it('increments reaction', (done) =>{
        request(api)
            .post('/entries/2/love')
            .expect(202)
            .expect({
                id: 2,
                title: "Was religion created as a control mechanism so that the rich could profit off the poor and vulnerable?",
                message: "Religion promises of ever lasting life in so many religions. Looking back this promise often came with a cost.Why is that?",
                image: "https://media.giphy.com/media/12NlCFUvTokWXe/giphy.gif",
                dislikes: 0,
                likes: 1,
                love: database[1].love + 1,
                comments: [
                    "Cool Post",
                    "Really interest thought"
                ]
            },done)
    
    })

    it('add a comment', (done)=>{
        request(api)
            .post('/entries/1/add')
            .send(testComment)
            .expect(201)
            .expect({
                id: 1,
                title: "Was religion created as a control mechanism so that the rich could profit off the poor and vulnerable?",
                message: "Religion promises of ever lasting life in so many religions. Looking back this promise often came with a cost.Why is that?",
                image: "https://media.giphy.com/media/TdpZPpb7MjzWsoZGGn/giphy.gif",
                dislikes: 1,
                likes: 9,
                love: 3,
                comments: [             
                "hello t here",
                "hello t here",
                "whats popin",
                "yabadabadoooo",
                "yabadabadoooo",
                "omg its workin",
                "witness me",
                "jakirul is a god",
                "re",
                "Test works"
                ]
            },done)
    })

    // it('deletes last item from db', (done) =>{
    //     request(api)
    //         .delete(`entries/5`)
    //         .expect(200)
    //         .expect('entry deleted',done)
    // })

})