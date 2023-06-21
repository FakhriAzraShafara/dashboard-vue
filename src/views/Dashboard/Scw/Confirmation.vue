<template>
  <Modal v-show="confirmationVisible" @close="closeModal2">
    <template v-slot:header>This Modal Confirmation</template>
    <template v-slot:body>
      <div class="mt-3">
        <div class="text-center fs-4">
          Are you sure to delete {{ deleteItemTitle }}?
        </div>
        <div class="text-center mt-9">
          <button
            class="btn btn-danger px-6 fs-5"
            @click="deleteScw(itemId)"
            type="submit"
          >
            Delete
          </button>

          <button
            class="btn btn-secondary px-6 fs-5 ms-2"
            @click="closeModal2"
            type="submit"
          >
            Cancel
          </button>
        </div>
      </div>
    </template>
    <template v-slot:footer>@footerKonfirmasi</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import d$scw from "@/stores/dashboard/scw";
import { mapState, mapActions } from "pinia";
export default {
  name: "DeleteScw",
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
      confirmationVisible: true,
    };
  },
  computed: {
    ...mapState(d$scw, ["g$scw"]),
    deleteItemTitle() {
      const item = this.g$scw.find((i) => i.id_scw === this.itemId);
      return item ? item.jenis_scw : "";
    },
  },
  methods: {
    ...mapActions(d$scw, ["a$delete", "a$list"]),
    closeModal2() {
      this.$emit("close");
    },
    async deleteScw(itemId) {
      try {
        await this.a$delete(itemId);
        await this.a$list();
        this.closeModal2(); // Tambahkan baris ini untuk menutup modal setelah penghapusan berhasil
      } catch (e) {
        console.error("Error in deleteScw method", e);
      }
    },
  },
};
</script>

<style></style>
