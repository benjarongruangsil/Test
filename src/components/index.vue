<template>
<div>
    <div>
        <b-nav style="background-color: #FFFFFF;" align="center">
            <b-nav-item active>Mange Profile</b-nav-item>
            <b-nav-item-dropdown id="my-nav-dropdown" :text="username" toggle-class="nav-link-custom" right>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
    </div>
    <div>
        <b-container>
            <b-row>
                <b-col cols="1"></b-col>
                <b-col cols="10"><br>
                    <div>
                        <b-card>
                            <b-container fluid>
                                <!-- User Interface controls -->
                                <router-link to="/add">
                                    <b-button class="float-right" squared variant="primary">add user</b-button>
                                </router-link><br> <br> <br>
                                <b-form-group label="Filter" label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
                                    <b-input-group size="sm">
                                        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
                                        <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group> <br>

                                <!-- Main table element -->
                                <b-table show-empty small stacked="md" :items="user" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :filterIncludedFields="filterOn">
                                    <template v-slot:cell(actions)="row">
                                        <b-button size="sm" @click="info(row.item, row.index, $event.target)" squared variant="warning"> Edit</b-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <b-button v-if="mail != row.item.email " size="sm" @click="delete1(row.item.email)" squared variant="danger">Delete</b-button>
                                        <b-button v-else size="sm" disabled @click="delete1(row.item.email)" squared variant="danger">Delete</b-button>
                                    </template>
                                </b-table>
                                <b-row>
                                    <b-col sm="5" md="6" class="my-1">
                                        <b-form-group label="Per page" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-align-sm="right" label-size="sm" label-for="perPageSelect" class="mb-0">
                                            <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
                                        </b-form-group>
                                    </b-col>

                                    <b-col sm="7" md="6" class="my-1">
                                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
                                    </b-col>
                                </b-row>
                                <!-- Info modal -->
                                <b-modal v-model="show" hide-footer :id="infoModal.id" :title="'update  ' +infoModal.content.email" @hide="resetInfoModal">
                                    <!-- <pre>{{ infoModal.content.fname }} </pre>  -->
                                    <form @submit.prevent="update" >
                                        <input type="hidden" name="email" :value="infoModal.content.email">
                                        first name
                                        <input type="text" required class="form-control" :value="infoModal.content.fname" name="fname" placeholder="First Name">
                                        Last name
                                        <input type="text" required class="form-control" :value="infoModal.content.lname" name="lname" placeholder="First Name">
                                        Age
                                        <input type="number" required class="form-control" id="age" :value="infoModal.content.age" name="age" placeholder="Age">
                                        Telephone
                                        <input type="number" required class="form-control" max="9999999999" id="tell" :value="infoModal.content.phone" name="phone" placeholder="Telephone">
                                        Address
                                        <b-form-textarea required id="textarea" :value="infoModal.content.address" name="address" placeholder="Enter Address..." rows="3" max-rows="6"></b-form-textarea>
                                        <hr>
                                        <b-button type="submit" class="float-right" squared variant="primary">Update</b-button>
                                    </form>

                                </b-modal>
                            </b-container>
                        </b-card>
                    </div>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
        </b-container>
    </div>
</div>
</template>

<script>
import {
    db
} from '../main'
export default {
    data() {
        return {
            show: false,
            username: this.$session.get("username"),
            mail: this.$session.get("email"),
            items: [],
            fields: [{
                    key: 'fname',
                    label: 'First Name',
                    sortable: true,
                    sortDirection: 'desc'
                },
                {
                    key: 'lname',
                    label: 'Last Name',
                    sortable: true,
                },
                {
                    key: 'age',
                    label: 'Age',
                    sortable: true,
                    class: 'text-center',
                    sortByFormatted: true,
                    filterByFormatted: true
                },
                {
                    key: 'phone',
                    label: 'phone',
                    sortable: true,
                    sortByFormatted: true,
                    filterByFormatted: true,
                    class: 'text-center'
                },
                {
                    key: 'address',
                    label: 'address',
                    sortable: true,
                    sortByFormatted: true,
                    filterByFormatted: true
                },
                {
                    key: 'actions',
                    label: 'Actions',
                    class: 'text-center'
                }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            }
        }
    },
    firestore() {
        return {
            user: db.collection('users')
        }
    },
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    created() {
        this.totalRows = this.items.length
    },
    methods: {
        info(item, index, button) {
            this.show = true
            this.infoModal.content = item
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
            // console.log(this.fname+"ccc");
        },
        update(submitEvent) {
            this.show = false
            console.log(submitEvent.target.elements.fname.value + "ccc")
            db.collection("users").doc(submitEvent.target.elements.email.value).update({
                fname: submitEvent.target.elements.fname.value,
                lname: submitEvent.target.elements.lname.value,
                age: submitEvent.target.elements.age.value,
                phone: submitEvent.target.elements.phone.value,
                address: submitEvent.target.elements.address.value
            })
        },
        delete1(key) {
            var r = confirm("Are you sure? \n You won't be able to revert this!");
            if (r == true) {
                  db.collection("users").doc(key).delete()
            }
        },
        logout() {
            this.$session.destroy()
            this.$router.push('/')
        }
    }
}
</script>>
