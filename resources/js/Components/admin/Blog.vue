<template>
  <b-row>
    <b-card>
      <b-col>
        <b-row align-v="center">
          <b-col><h5>Blogs List</h5></b-col>
          <b-col>
            <b-button
              v-if="permissions.includes('blog_add')"
              @click="modal = !modal"
              class="float-end"
              pill
              variant="outline-dark"
            >
              <font-awesome-icon icon="plus" class="me-2" />Add Post</b-button
            >
            <b-modal
              v-model="modal"
              :title="post.id ? 'Update Post' : 'Add Post'"
              hide-header-close
              no-close-on-backdrop
            >
              <b-form-group id="input-group-1" label="Post Title:" label-for="input-1">
                <b-form-textarea
                  id="textarea"
                  v-model="post.title"
                  placeholder="Enter Title..."
                  rows="2"
                ></b-form-textarea>
                <b-form-invalid-feedback v-if="errors.title" :state="errors.title">
                  {{ errors.title[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group id="input-group-2" label="Attachment:" label-for="input-2">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  class="form-control"
                  v-on:change="onFileChange"
                />
                <b-img
                  loading="lazy"
                  v-if="post.previewImage"
                  :src="post.previewImage"
                  class="mt-2"
                  style="height: auto; width: auto; max-height: 150px; max-width: 450px"
                  rounded
                ></b-img>
                <b-form-invalid-feedback v-if="errors.image" :state="errors.image">
                  {{ errors.image[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Post Description:"
                label-for="input-3"
              >
                <b-form-textarea
                  id="textarea"
                  v-model="post.content"
                  placeholder="Enter Description..."
                  rows="6"
                ></b-form-textarea>
                <b-form-invalid-feedback v-if="errors.content" :state="errors.content">
                  {{ errors.content[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <template #footer>
                <div>
                  <button class="btn btn-outline-dark" @click="hideModel">Close</button>
                </div>
                <div>
                  <button class="btn btn-outline-primary" @click="uploadData">
                    {{ post.id ? "Update Post" : "Add Post" }}
                  </button>
                </div>
              </template>
            </b-modal>
            <div></div>
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="isBusy">
        <b-skeleton-table :rows="perPage" :columns="fields"></b-skeleton-table>
      </b-col>
      <b-col v-else
        ><b-table
          striped
          outlined
          caption-top
          hover
          footClone
          :items="posts"
          :fields="fields"
          :busy="isBusy"
          responsive
          show-empty
        >
          <template #cell(attachment)="data">
            <b-img
              loading="lazy"
              :src="data.item.attachment"
              style="width: auto height: auto; width: auto; max-height: 100px; max-width: 300px"
              rounded
            ></b-img>
          </template>
          <template #cell(username)="data">{{
            data.item.user ? data.item.user.name : ""
          }}</template>
          <template #cell(created_at)="data">{{ dateTime(data.value) }}</template>
          <template #cell(actions)="data">
            <b-button
              v-if="permissions.includes('blog_edit')"
              class="rounded-circle p-2 me-2"
              @click="editPost(data.item.id)"
              variant="outline-success"
            >
              <font-awesome-icon icon="pen" />
            </b-button>

            <b-button
              v-if="!data.item.deleted_at && permissions.includes('blog_delete')"
              class="rounded-circle p-2 me-2"
              @click="recyclePost(data.item.id)"
              variant="outline-secondary"
            >
              <font-awesome-icon icon="recycle" />
            </b-button>

            <b-button
              v-if="data.item.deleted_at && permissions.includes('blog_restore')"
              class="rounded-circle p-2 me-2"
              @click="restorePost(data.item.id)"
              variant="outline-primary"
            >
              <font-awesome-icon icon="arrow-rotate-left" />
            </b-button>
            <b-button
              v-if="permissions.includes('blog_forceDelete')"
              class="rounded-circle p-2 me-2"
              @click="deletePost(data.item.id)"
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
            v-on:click="getPosts"
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
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../stores/admin/loginStore.js";
import { useAdminBlogsStore } from "../../stores/admin/blogStore";

const {
  posts,
  fields,
  options,
  perPage,
  currentPage,
  modal,
  rows,
  isBusy,
  post,
  errors,
} = storeToRefs(useAdminBlogsStore());

const {
  getPosts,
  dateTime,
  setPerPage,
  hideModel,
  resetForm,
  editPost,
  deletePost,
  recyclePost,
  restorePost,
  onFileChange,
  uploadData,
} = useAdminBlogsStore();
const { permissions } = storeToRefs(useLoginStore());
getPosts();
resetForm();
</script>
