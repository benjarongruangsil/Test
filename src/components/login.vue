<template>
<div>
    <b-container>
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8">
                <br><br><br><br>
                <b-card border-variant="info" >
                    <center><h1>Sign In</h1> </center>
                    <div>
                        <b-alert :show="dismissCountDown" dismissible fade variant="danger" @dismissed="dismissCountDown=0"> {{err_message}}</b-alert>
                        <form @submit.prevent="check_login" novalidate>
                            <div class="form-group">
                                E-mail
                                <input type="email" class="form-control" id="email" v-model.trim="email" aria-describedby="email-help" placeholder="Email">
                                <small id="email-help" class="form-text text-muted">
                                    <div v-if="$vuelidation.error('email')" class="text-danger">
                                        {{$vuelidation.error("email")}}
                                    </div>
                                </small>
                            </div>
                            <div class="form-group">
                                password
                                <input type="password" class="form-control" id="password" v-model.trim="password" aria-describedby="password-help" placeholder="Password">
                                <small id="password-help" class="form-text text-muted">
                                    <div v-if="$vuelidation.error('password')" class="text-danger">
                                        {{$vuelidation.error("password")}}</div>
                                </small>
                            </div><br>
                            <center>
                                <button type="submit" class="btn btn-primary btn-submit" :disabled="$vuelidation.errors()">Login</button>
                            </center>
                        </form>
                    </div>
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
            email: '',
            password: '',
            dismissSecs: 3,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            err_message: '',
            locations: []
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
            }
        }
    },
    firestore() {
        return {
            locations: db.collection('users')
        }
    },
    methods: {
        check_login() {
            if (this.$vuelidation.valid()) {
                var err = true
                for (const mai in this.locations) {
                    var checkmail = this.email === this.locations[mai].email
                    var checkpass = sha256(this.password) === this.locations[mai].password
                    // var checkpass = this.password === this.locations[mai].password
                    if (checkmail && checkpass) {
                        this.$session.start()
                        this.$session.set('username', this.locations[mai].fname)
                        this.$session.set('email', this.locations[mai].email)
                        this.$router.push('/index')
                        err = false
                    }
                }
                if (err) {
                    this.dismissCountDown = this.dismissSecs
                    this.err_message = 'Email or Password is incorrect. Please try again'
                    this.password = ''
                }
            }
        }
    }
}
</script>
