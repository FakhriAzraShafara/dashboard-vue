<template>
  <Modal v-if="confirmationVisible" @close="closeModal2">
    <template v-slot:header>This Modal Confirmation</template>
    <template v-slot:body>
      <div class="mt-3">
        <div class="text-center fs-4">
          Are you sure to Stop {{ deleteItemTitle }}?
        </div>
        <div class="text-center mt-9">
          <button
            class="btn btn-danger px-6 fs-5"
            @click="stopCall(itemId)"
            type="submit"
          >
            Stop
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
    <template v-slot:footer>
      <footerKonfirmasi></footerKonfirmasi>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import d$history from "@/stores/dashboard/history";
import { mapState, mapActions } from "pinia";
export default {
  name: "DeleteHistory",
  components: {
    Modal,
    footerKonfirmasi: {
      template: "@footerKonfirmasi",
    },
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
    ...mapState(d$history, ["g$history"]),
    deleteItemTitle() {
      const item = this.g$history.find((i) => i.id_kerusakan === this.itemId);
      return item
        ? `Notifikasi ${item?.problemscws?.jenis_scw} in ${item?.mesin?.nama_mesin}`
        : "";
    },
  },
  methods: {
    ...mapActions(d$history, ["a$update", "a$list"]),
    closeModal2() {
      this.$emit("close");
    },
    async stopCall(itemId) {
      try {
        this.deleteItemId = itemId;
        await this.a$update(this.deleteItemId);
        await this.a$list();
        this.$emit("close");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style></style>
