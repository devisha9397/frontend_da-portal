<template>
    <v-container mt-0>

      <v-dialog v-model="dialog" max-width="300px" @keydown.esc="dialog=false">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add Job Profile</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex>
                  <v-text-field :rules="[constants.RULES.required]" label="Job Profile" v-model="editedItem.jobProfile_Name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-layout>
        <v-flex>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-data-table
        loading="true"
        class="elevation-1"
        :items="loadedJobProfiles"
        :headers="headers"
        :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.jobProfile_Name }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-container>
</template>
<style>

</style>
<script>
  import JobProfileModel from '../../models/jobprofile'
  import constants from '../../Utility/constants'
  export default {
    data() {
      return {
        constants:constants,
        dialog: false,
        editedIndex: -1,
        //Data Table items
        search:'',
        headers: JobProfileModel.headers,
        editedItem: {
          jobProfile_Name: "",
          jobProfile_Id: 0
        },
        defaultItem: {
          jobProfile_Name: "",
          jobProfile_Id: 0
        }
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add Job Profile' : 'Edit Job Profile'
      },
      loadedJobProfiles() {
        return this.$store.getters.loadedJobProfiles
      }
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.loadedJobProfiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.loadedJobProfiles.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteJobProfile', this.loadedJobProfiles[index])
        }
      },
      save() {
        if (this.editedIndex > -1) {
          console.log(this.editedItem)
          this.$store.dispatch('updateJobProfile', this.editedItem)
        } else {
          this.$store.dispatch('createJobProfile', this.editedItem)
        }
        this.close()
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    },
    created() {

      this.items = this.$store.getters.loadedJobProfiles
    }
  }

</script>
