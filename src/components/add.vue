<template>
<div>
        <b-nav style = "background-color: #FFFFFF;" align="center">
            <b-nav-item active>
                <router-link to="/index"> Mange Profile </router-link>
            </b-nav-item>
            <b-nav-item-dropdown id="my-nav-dropdown" :text="email_s" toggle-class="nav-link-custom" right>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
        <br>
    <b-container>
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8">
                <b-card>
                    <b-container fluid>
                        <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown=0"> {{err_message}}</b-alert>
                        <form @submit.prevent="add" novalidate>
                            <b-container class="bv-example-row">
                                <b-row>
                                    <b-col> First Name
                                        <input type="text" class="form-control" id="fname" v-model.trim="fname" aria-describedby="email-help" placeholder="First Name">
                                        <small id="email-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('fname')" class="text-danger">
                                                {{$vuelidation.error("fname")}}
                                            </div>
                                        </small></b-col>
                                    <b-col>Last Name
                                        <input type="text" class="form-control float-left " id="lname" v-model.trim="lname" aria-describedby="email-help" placeholder="Lase Name">
                                        <small id="email-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('lname')" class="text-danger">
                                                {{$vuelidation.error("lname")}}
                                            </div>
                                        </small></b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        Age
                                        <input type="number" class="form-control" id="age" v-model.trim="age" aria-describedby="email-help" placeholder="Age">
                                        <small id="email-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('age')" class="text-danger">
                                                {{$vuelidation.error("age")}}
                                            </div>
                                        </small></b-col>
                                    <b-col>
                                        Telephone
                                        <input type="number" class="form-control" id="tell" v-model.trim="phone" aria-describedby="email-help" placeholder="Telephone">
                                        <small id="email-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('phone')" class="text-danger">
                                                {{$vuelidation.error("phone")}}
                                            </div>
                                        </small>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col> E-mail
                                        <input type="email" class="form-control" id="email" v-model.trim="email" aria-describedby="email-help" placeholder="E-mail">
                                        <small id="email-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('email')" class="text-danger">
                                                {{$vuelidation.error("email")}}
                                            </div>
                                        </small></b-col>

                                </b-row>
                                <b-row>
                                    <b-col>
                                        Password
                                        <input type="password" class="form-control" id="password" v-model.trim="password" aria-describedby="password-help" placeholder="Password">
                                        <small id="password-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('password')" class="text-danger">
                                                {{$vuelidation.error("password")}}</div>
                                        </small></b-col>

                                </b-row>
                                <b-row>
                                    <b-col>
                                        Address
                                        <b-form-textarea id="textarea" v-model="text" v-model.trim="address" placeholder="Enter Address..." rows="3" max-rows="6"></b-form-textarea>
                                        <small id="password-help" class="form-text text-muted">
                                            <div v-if="$vuelidation.error('address')" class="text-danger">
                                                {{$vuelidation.error("address")}}</div>
                                        </small>
                                    </b-col>

                                </b-row>
                            </b-container>
                            <br>
                            <center>
                                <b-button type="submit" squared variant="primary" :disabled="$vuelidation.errors()">Add</b-button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b-button squared variant="success" @click="reset()">Reset</b-button>
                            </center>

                        </form>
                    </b-container>
                </b-card>
            </b-col>
            <b-col cols="2"></b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import {
    db
} from '../main'
import {
    sha256
} from 'js-sha256'
export default {
    data() {
        return {
            email_s: this.$session.get("username"),
            email: '',
            password: '',
            fname: '',
            lname: '',
            age: '',
            phone: '',
            address: '',
            dismissSecs: 3,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            err_message: '',
            color: ''
        }
    },
    firestore() {
        return {
            user: db.collection('users')
        }
    },
    vuelidation: {
        data: {
            email: {
                required: true,
                email: true,
                msg: 'Please enter a valid email address'
            },
            password: {
                required: true,
                msg: 'Password must contain at least 6 characters',
                betweenLength: {
                    min: 6,
                    max: 100
                }
            },
            fname: {
                required: true,
                msg: 'Please enter first name',
            },
            lname: {
                required: true,
                msg: 'Please enter last name',
            },
            age: {
                required: true,
                msg: 'Please enter  age',
            },
            phone: {
                required: true,
                msg: 'Phone number must be at least 10 digits',
                betweenLength: {
                    min: 10,
                    max: 10
                }
            },
            address: {
                required: true,
                msg: 'Please enter address',
            },
        }
    },
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    methods: {
        add() {
            if (this.$vuelidation.valid()) {
                var db_add = true
                for (const mai in this.user) {
                    var checkmail = this.email === this.user[mai].email
                    if (checkmail) {
                        this.dismissCountDown = this.dismissSecs
                        this.err_message = 'Email is duplicated'
                        this.color = 'danger'
                        this.email = ''
                        db_add = false
                    }
                }
                if (db_add) {
                    db.collection("users").doc(this.email).set({
                        email: this.email,
                        password: sha256(this.password),
                        fname: this.fname,
                        lname: this.lname,
                        age: this.age,
                        phone: this.phone,
                        address: this.address
                    })
                    this.dismissCountDown = this.dismissSecs
                    this.err_message = 'Successfully, User ' + this.fname + ' ' + this.lname + ' created'
                    this.color = 'success'
                    this.password = ''
                    this.email = ''
                    this.fname = ''
                    this.lname = ''
                    this.age = ''
                    this.phone = ''
                    this.address = ''
                    this.$vuelidation.reset()
                }
            }
        },
        reset() {
            this.password = ''
            this.email = ''
            this.fname = ''
            this.lname = ''
            this.age = ''
            this.phone = ''
            this.address = ''
            this.$vuelidation.reset()
        },
        logout() {
            this.$session.destroy()
            this.$router.push('/')
        }
    }
}
</script>


