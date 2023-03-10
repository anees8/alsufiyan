import { defineStore } from "pinia";
import axios from "axios";


export const useImagesStore = defineStore("imagesStore", {
state: () => ({
images: [],
perPage: 3,
visible: false,
currentindex: null,
}),

actions: {

show(index) {
this.currentindex = index;
this.visible = true;
},
handleHide() {
this.visible = false;
},

async getImages() {
this.loading = true;
try {
let url = "images";
if (this.perPage) {
url += `?perPage=${this.perPage}`;
}

const response = await axios.get(url);
this.images = response.data.data.images.data;

} catch (error) {
}
},
},
});
