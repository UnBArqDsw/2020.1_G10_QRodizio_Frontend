<template>
  <div class="DisplayTableQRCode">
    <b-button @click="goBack" class="button is-light">Voltar</b-button>
    &nbsp;
    <b-button @click="printImg" class="button is-light">Imprimir</b-button>
    <br />
    <img :src="qrcodeAsImgSource" alt="table qrcode" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DisplayTableQRCode",

  data() {
    return {
      qrcode: "",
    };
  },

  computed: {
    qrcodeAsImgSource() {
      return "data:image/png;base64, " + this.qrcode;
    },
  },

  async mounted() {
    let id = this.$route.params.id;
    await this.fetchQRCode(id);
  },

  methods: {
    async fetchQRCode(id) {
      const url = `http://127.0.0.1:5000/tables/${id}/qrcode`;
      let response = await axios.get(url);

      if (response.status == 200) {
        this.qrcode = response.data.qrcode;
      }
    },

    goBack() {
      this.$router.push("/list-tables");
    },

    printImg() {
      let img = `<img src="${this.qrcodeAsImgSource}" `;
      img += `alt="Table qrcode" onload="window.print();window.close();" `; 
      img += `style="width: 600px" />`;

      let win= window.open("");
      win.document.write(img)
      win.focus();
    },
  },
};
</script>

<style scoped>
.DisplayTableQRCode img {
  width: 400px;
}
</style>
