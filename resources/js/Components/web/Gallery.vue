<template>
  <div class="router_view_min">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4 p-1" v-for="(image, index) in images" :key="image.id">
          <div class="thumbnail p-2">
            <div class="img-container">
              <img
                :src="image.src"
                alt=""
                @click="show(index)"
                class="img-fluid d-block rounded gallery_img shadow-lg w-100 hover-shadow"
                style="height: 21rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <vue-easy-lightbox
          :visible="visible"
          :imgs="images"
          :index="currentindex"
          @hide="handleHide"
        ></vue-easy-lightbox>
      </div>

      <div class="d-flex justify-content-end my-4">
        <div class="me-4">
          <b-form-select
            v-model="perPage"
            :options="options"
            size="md"
            varient="dark"
          ></b-form-select>
        </div>
        <div>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
          ></b-pagination>
        </div>
      </div>
    </div>
    <!-- all props & events -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 1, src: "/gallery/1.jpg" },
        { id: 2, src: "/gallery/2.jpg" },
        { id: 3, src: "/gallery/3.jpg" },
        { id: 4, src: "/gallery/4.jpg" },
        { id: 5, src: "/gallery/5.jpg" },
        { id: 6, src: "/gallery/6.jpg" },
        { id: 7, src: "/gallery/7.jpg" },
        { id: 8, src: "/gallery/8.jpg" },
        { id: 9, src: "/gallery/9.jpg" },
        { id: 10, src: "/gallery/10.jpg" },
        { id: 11, src: "/gallery/11.jpg" },
        { id: 12, src: "/gallery/12.jpg" },
        {
          id: 13,
          src:
            "https://images.unsplash.com/photo-1675317047656-eb9ebd0eacc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        },
      ],
      perPage: 5,
      currentPage: 1,
      options: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
        { value: 200, text: "200" },
      ],
      visible: false,
      currentindex: null,
    };
  },
  methods: {
    show(index) {
      this.currentindex = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
  computed: {
    rows() {
      return this.images.length;
    },
  },
};
</script>
