const axios = require("axios").default;

test('Get data from [/posts/1] and verify status, id, userId', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const responseData = response.data;

    //respons status
    expect(response.status).toBe(200);
    //respons id and userId = 1
    expect(responseData.id).toBe(1);
    expect(responseData.userId).toBe(1);
})

test('Get data from [/posts/12/comments] and verify status, id, userId', async () => {
    const postIdForTest = 12;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postIdForTest}/comments`);
    const responseData = response.data;
    //status 200
    expect(response.status).toBe(200);

    //
    const post_id = responseData.map(post_id => post_id.postId);
    expect(post_id.some(post_id => post_id == postIdForTest)).toBe(true);

    const comments = responseData.map(comments => comments.body);
    //some for search some part of body
    expect(comments.some(comment => /veritatis qui nihil\nquia /.test(comment))).toBe(true);
})



test('Find some comment by text and print ID and Email in cons.log', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/12/comments');
    expect(response.status).toBe(200);

    const responseData = response.data;

    //  Some comment that we whant to find
    const partOfComment = "cumque molestiae officia aut";

    //  All obj whe where body contain current part of comment
    const matchedComments = responseData.filter(item => item.body.includes(partOfComment));

    if (matchedComments.length === 0) {
        console.log("Comment is not find. Try again");
    } else {
        matchedComments.forEach(user => {
            console.log(`postId: ${user.postId} \n id: ${user.id} \n email: ${user.email} \n body: ${user.body}`);
        });
    }
});

test("Test Post 1", async () => {
    var testBody = "Lorem ipsum";
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',
        {
            userId: 838,
            id: 838,
            title: "Lorem ipsum",
            body: testBody
        },)
        const responseData = response.data;
        expect(response.status).toBe(201);
        console.log(responseData.body);
        expect(responseData.body).toMatch(testBody);        
        }
)

test("Test Post 2. Add new post", async () => {
    var testBody = "Lorem ipsum";
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',
        {
            userId: 12,
            id: 12,
            additionalTitle: "Lorem ipsum",
            additionalInfo: testBody
        },)
        const responseData = response.data;
        //status 201
        expect(response.status).toBe(201);
        //additionalInfo should be the same and should be added
        expect(responseData.additionalInfo).toBeDefined();  
        expect(responseData.additionalInfo).toMatch(testBody);        
        }
)
