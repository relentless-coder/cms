import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/user.model';
import Post from '../models/post.model';
import Comment from '../models/comment.model';
import mongoose from 'mongoose';


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(`http://localhost:6655`);


describe('Comment', (done) => {
    let token;
    let postId;
    let post = {
        title: "Test Post 1",
        content: "This is a test post, and I'll be happy if this works out."
    }
    let url = getUrl(post.title);
    beforeEach((done) => {
        api.post('/admin/new')
            .send({
                email: 'lespaulayush@mail.com',
                password: 'pass123'
            })
            .end((err, data) => {
                api.post('/admin/login')
                    .send({ email: 'lespaulayush@mail.com', password: 'pass123' })
                    .end((err, res) => {
                        token = res.body.token;
                        api.post('/post')
                            .set('authorization', `Bearer ${token}`)
                            .send(post)
                            .end((err, res) => {
                                postId = res.body.post._id;
                                done()
                            })
                    })
            })

    })

    afterEach((done) => {
        User.remove((err, data) => {
            Post.remove((err, data1) => {
                done()
            })
        })
    })

    it('should post a comment', (done) => {
        api.post(`/${url}/comment`)
            .send({
                author: {
                    name: "La La",
                    email: "lala@lamai.com"
                },
                comment: "This is a test comment",
                post: postId
            })
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })

    it('should get us all the comments', (done) => {
        api.post(`/${url}/comment`)
            .send({
                author: {
                    name: "La La",
                    email: "lala@lamai.com"
                },
                comment: "This is a test comment",
                post: postId
            })
            .end((err, res) => {
                api.post(`/${url}/comment`)
                    .send({
                        author: {
                            name: "Cha Cha",
                            email: "chacha@lamai.com"
                        },
                        comment: "This is another test comment",
                        post: postId
                    })
                    .end((err, res) => {
                        api.get('/admin/comment')
                            .set('authorization', `Bearer ${token}`)
                            .end((err, rec) => {
                                if(err){
                                    console.log(err);
                                }
                                rec.should.have.status(200);
                                rec.body.data.should.be.an('array');
                                rec.body.data[rec.body.data.length - 1].post.should.have.property('title');
                                rec.body.data[rec.body.data.length - 1].post.should.not.equal(null);
                                done()
                            })
                    })
            })
    })
})

function getUrl(title) {
    return title.replace(/ /g, '-')
}