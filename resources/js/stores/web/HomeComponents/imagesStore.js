import { defineStore } from "pinia";
import axios from "axios";


export const useImageStore = defineStore("imageStore", {
state: () => ({
images: [],
perPage: 3,
visible: false,
currentindex: null,
loading:false,
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
let url = "image";
if (this.perPage) {
url += `?perPage=${this.perPage}`;
}

const response = await axios.get(url);
this.images = response.data.data.images.data;
// this.loading = false;

} catch (error) {
}
},
},
});
