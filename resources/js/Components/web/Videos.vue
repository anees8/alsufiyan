<template>
  <div class="router_view_min">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4 p-1" v-for="(image, index) in images" :key="image.id">
          <div class="thumbnail p-1">
            <div class="img-container">
              <iframe
                v-if="image.src.includes('https://www.youtube.com/')"
                width="420"
                height="345"
                :src="image.src"
                allowfullscreen
              >
              </iframe>
              <video v-else width="420" height="345" controls muted>
                <source :src="image.src" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div></div>

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
        {
          id: 1,
          src: "https://www.youtube.com/embed/tgbNymZ7vqY",
        },
        {
          id: 2,
          src: "https://www.youtube.com/embed/Mklo9VDZCNM",
        },
        {
          id: 3,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 4,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 5,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 6,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 7,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 8,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 9,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 10,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 11,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
        {
          id: 12,
          src:
            "https://colaninfotech.com/wp-content/themes/twentytwenty/custom/videos/Management%20Video.mp4",
        },
      ],
      perPage: 5,
      currentPage: 1,
      options: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
    };
  },

  computed: {
    rows() {
      return this.images.length;
    },
  },
};
</script>
