import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/user.model';
import mongoose from 'mongoose';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(`http://localhost:6655`);


describe('Admin User', () => {
    afterEach((done)=>{
        User.remove((err, data)=>{
            done();
        })
    })
    it('should create a new admin', (done) => {
        api.post('/admin/new')
            .send({
                email: 'lespaulayush@mail.com',
                password: 'pass123'
            })
            .end((err, res) => {
                err ? done(err) : res.should.have.status(200);
                res.body.should.not.equal(null);
                done()
            })
    })

    describe('user admin login', () => {
        beforeEach((done) => {
            api.post('/admin/new')
                .send({
                    email: 'lespaulayush@mail.com',
                    password: 'pass123'
                })
                .end((err, res) => {
                    done()
                })
        })
        afterEach((done)=>{
            User.remove((err, data)=>{
                done()
            })
        })
        it('should login a user', (done) => {
            api.post('/admin/login')
                .send({ email: 'lespaulayush@mail.com', password: 'pass123' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    done()
                })
        })
    })

    describe('user admin update', ()=>{
        let token;
        beforeEach((done)=>{
            api.post('/admin/new')
                .send({
                    email: 'lespaulayush@mail.com',
                    password: 'pass123'
                })
                .end((err, res) => {
                    api.post('/admin/login')
                .send({ email: 'lespaulayush@mail.com', password: 'pass123' })
                .end((err, res) => {
                    token = res.body.token;
                    done()
                })
                })
            
        })

        it('should update the user', (done)=>{
            api.put('/admin/user')
                .set('authorization', `Bearer ${token}`)
                .send({
                    name: "Ayush Bahuguna",
                    profession: "Full Stack Developer",
                    about: "I am what atheists believe in"
                })
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.have.property('user');
                    done();
                })
        })

    })
})