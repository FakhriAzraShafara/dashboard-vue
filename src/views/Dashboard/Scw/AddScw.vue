<template>
  <Modal v-model="isModalVisible" @close="closeModal">
    <template v-slot:header>This Modal</template>
    <template v-slot:body>
      <div class="mt-3">
        <form v-on:submit.prevent="submitAdd">
          <div class="form-group">
            <label for="title">Jenis Scw:</label>
            <input
              type="text"
              class="form-control"
              id="jenis_scw"
              v-model="input.jenis_scw"
            />
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-primary px-6 fs-5" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:footer>@footerMeme</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapActions } from "pinia";
import d$scw from "@/stores/dashboard/scw";
export default {
  name: "AddScw",
  components: {
    Modal,
  },
  data() {
    return {
      input: {
        jenis_scw: "",
      },
      isModalVisible: false,
    };
  },
  methods: {
    ...mapActions(d$scw, ["a$list", "a$add"]),
    async submitAdd() {
      try {
        await this.a$add({ ...this.input });
        await this.a$list();
        this.closeModal();
      } catch (e) {
        console.error(e);
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.input.jenis_scw = "";
      this.$emit("close");
    },
  },
};
</script>

<style></style>
