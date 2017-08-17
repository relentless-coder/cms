import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/user.model';
import Post from '../models/post.model';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/blog-test');


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(`http://localhost:6655`);


describe('Post', () => {

    let token;
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
                        if(err){
                            console.log(err)
                        }
                        token = res.body.token;
                        done()
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

    it('should create a post', (done) => {
        api.post('/post')
            .set('authorization', `Bearer ${token}`)
            .send(post)
            .end((err, res) => {
                if(err){
                    console.log(err)
                }
                res.should.have.status(200);
                res.body.should.have.property('post');
                res.body.post.url.should.equal(url);
                done()
            })
    })

    describe('update post', () => {
        let token;
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
                                    if(err){
                                        console.log(err)
                                    }
                                    done()
                                })
                        })
                })

        })

        afterEach((done)=>{
            User.remove((err, data)=>{
                Post.remove((err, data1)=>{
                    done();
                })
            })
        })

        it('should update the post', (done)=>{
            api.put(`/post/${url}`)
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "Updated Title"
                })
                .end((err, res)=>{
                    if(err){
                        console.log(err)
                    }
                    res.should.have.status(200);
                    res.body.should.have.property('post');
                    res.body.post.title.should.equal('Updated Title');
                    done();
                })
        })
    })
})


function getUrl(title) {
    return title.replace(/ /g, '-')
}