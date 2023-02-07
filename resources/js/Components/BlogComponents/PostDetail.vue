<template>
  <div class="router_view_min">
    <b-container class="py-5 my-5">
      <b-row>
        <b-col class="col-12 col-md-8">
          <router-link
            class="btn btn-outline-dark float-start mb-3"
            @click="$router.go(-1)"
            to=""
            ><font-awesome-icon icon="fa-solid fa-arrow-left" class="me-2" /></router-link
        ></b-col>
        <b-col class="col-12 col-md-8">
          <article>
            <!-- Post header-->
            <header class="mb-4">
              <!-- Post title-->
              <h1 class="fw-bolder mb-1">Welcome to Blog Post!</h1>
              <!-- Post meta content-->
              <div class="text-muted fst-italic mb-2">
                Posted on January 1, 2022 by Start Bootstrap
              </div>
            </header>
            <!-- Preview image figure-->
            <figure class="mb-4">
              <img class="img-fluid rounded" :src="post.attachment" alt="..." />
            </figure>
            <!-- Post content-->
            <section class="mb-5">
              <p>{{ post.content }}</p>
            </section>
          </article>
          <!-- Comments section-->
        </b-col>
        <!-- Side widgets-->
        <b-col class="col-12 col-md-4"
          ><h1>{{ id }}</h1></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      post: {
        id: 1,
        title:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        attachment: "/gallery/1.jpg",
      },
    };
  },
};
</script>
