<template>
  <Modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <h3>This Modal Edit Scw</h3>
    </template>
    <template v-slot:body>
      <div class="mt-3">
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <label for="title">Jenis Scw:</label>
            <input type="text" class="form-control" v-model="input.jenis_scw" />
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-primary px-6 fs-5" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:footer>
      <FooterMeme />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import d$scw from "@/stores/dashboard/scw";
import { mapState, mapActions } from "pinia";

export default {
  name: "EditScw",
  components: {
    Modal,
  },
  props: {
    itemId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      input: {
        jenis_scw: "",
      },
    };
  },
  computed: {
    ...mapState(d$scw, ["g$scw"]),
    currentItem() {
      return this.g$scw.find((item) => item.id_scw === this.itemId) || {};
    },
  },
  watch: {
    currentItem: {
      immediate: true,
      handler(value) {
        this.input.jenis_scw = value.jenis_scw || "";
      },
    },
  },
  methods: {
    ...mapActions(d$scw, ["a$update", "a$list"]),

    async submitEdit() {
      try {
        const updatedItem = { ...this.input };
        await this.a$update(this.itemId, updatedItem);
        const index = this.g$scw.findIndex(
          (item) => item.id_scw === this.itemId
        );
        if (index !== -1) {
          this.g$scw.splice(index, 1, { ...this.g$scw[index], ...updatedItem });
        }
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
  created() {
    this.input.jenis_scw = this.currentItem.jenis_scw || "";
  },
};
</script>

<style scoped></style>
