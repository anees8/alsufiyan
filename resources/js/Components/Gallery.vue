<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12 col-md-3 p-1" v-for="image in images" :key="image.id">
        <div class="thumbnail p-1">
          <div class="img-container">
            <img
              :src="image.src"
              alt=""
              class="d-block rounded gallery_img shadow-lg border border-1 border-dark w-100 hover-shadow"
              style="height: 350px"
            />
          </div>
        </div>
      </div>
    </div>
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
            " https://images.unsplash.com/photo-1675317047656-eb9ebd0eacc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        },
      ],
    };
  },
};
</script>
<style>
.gallery_img:hover {
  transform: scale(
    1.03
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
