<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Client Review List</h5></b-col>
          <b-col>
            <b-button
              v-if="permissions.includes('home_review_add')"
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Review</b-button
            >
            <b-modal
              v-model="modal"
              :title="review.id ? 'Update Review' : 'Add Review'"
              hide-header-close
              no-close-on-backdrop
            >
              <b-form-group id="input-group-1" label="Comment:" label-for="input-1">
                <b-form-textarea
                  id="textarea"
                  v-model="review.comment"
                  placeholder="Enter Comment..."
                  rows="5"
                ></b-form-textarea>
                <b-form-invalid-feedback v-if="errors.comment" :state="errors.comment">
                  {{ errors.comment[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group id="input-group-2" label="Username:" label-for="input-2">
                <b-input-group class="mt-1">
                  <template #prepend>
                    <b-input-group-text
                      ><font-awesome-icon icon="fa-regular fa-user" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    id="input-2"
                    v-model="review.user"
                    placeholder="Enter Username"
                  ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback v-if="errors.user" :state="errors.user">
                  {{ errors.user[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <VDatePicker v-model="review.comment_date" :popover="popover">
                <template #default="{ inputValue, inputEvents }">
                  <b-form-group
                    id="input-group-2"
                    label="Comment Date:"
                    label-for="input-2"
                  >
                    <b-input-group class="mt-1">
                      <template #prepend>
                        <b-input-group-text
                          ><font-awesome-icon icon="calendar-days" />
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        v-on="inputEvents"
                        id="input-2"
                        :value="inputValue"
                        placeholder="Enter Comment Date"
                      ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback
                      v-if="errors.comment_date"
                      :state="errors.comment_date"
                    >
                      {{ errors.comment_date[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </template>
              </VDatePicker>
              <template #footer>
                <div>
                  <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                </div>
                <div>
                  <button class="btn btn-outline-primary" @click="updateReview">
                    {{ review.id ? "Update Review" : "Add Review" }}
                  </button>
                </div>
              </template>
            </b-modal>
            <div></div>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        ><b-table
          striped
          outlined
          empty-filtered-text
          caption-top
          hover
          footClone
          :items="reviews"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(comment_date)="data">{{ dateTime(data.value) }}</template>

          <template #cell(actions)="data">
            <b-button
              v-if="permissions.includes('home_review_edit')"
              class="rounded-circle p-2 me-2"
              @click="editReview(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>
            <b-button
              v-if="permissions.includes('home_review_delete')"
              class="rounded-circle p-2 me-2"
              @click="deleteReview(data.item.id)"
              variant="outline-danger"
            >
              <font-awesome-icon icon="fa-regular fa-trash-can" />
            </b-button>
          </template> </b-table
      ></b-col>
      <b-row align-h="end" class="mt-5">
        <b-col xl="1" lg="2" md="2" class="p-2">
          <b-form-select
            v-if="rows > 5"
            v-model="perPage"
            :options="options"
            size="md"
            v-on:change="setPerPage"
            varient="dark"
          ></b-form-select>
        </b-col>
        <b-col xl="5" lg="6" md="8" class="p-2">
          <b-pagination
            v-if="rows / perPage > 1"
            v-on:click="getReviews"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </b-row>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../../stores/admin/loginStore.js";
import { useAdminReviewsStore } from "../../../stores/admin/HomeComponents/reviewsStore.js";
const {
  reviews,
  fields,
  options,
  review,
  perPage,
  currentPage,
  rows,
  modal,
  isBusy,
  errors,
} = storeToRefs(useAdminReviewsStore());

const {
  getReviews,
  dateTime,
  setPerPage,
  updateReview,
  editReview,
  deleteReview,
  hideModel,
} = useAdminReviewsStore();
const { permissions } = storeToRefs(useLoginStore());
const popover = ref({
  visibility: "click",
});

getReviews();
</script>
