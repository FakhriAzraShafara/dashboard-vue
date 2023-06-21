<template>
  <Modal v-if="StatusVisible" @close="closeModal2">
    <template v-slot:header>Detail Kondisi Mesin</template>
    <template v-slot:body>
      <div class="mt-3">
        <div class="text-start fs-4" v-if="detailItem">
          <table>
            <tbody>
              <tr>
                <td><strong>Status Mesin</strong></td>
                <td>{{ detailItem.status_mesin?.jenis_scw ?? "-" }}</td>
              </tr>
              <tr>
                <td><strong>PIC Mesin</strong></td>
                <td>{{ detailItem.employees?.nama ?? "-" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template v-slot:footer>@footerKonfirmasi</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import d$mesin from "@/stores/dashboard/mesin";
import d$employee from "@/stores/dashboard/employee";
import { mapState, mapActions } from "pinia";

export default {
  name: "StatusMesin",
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
      StatusVisible: true,
      detailItem: null,
    };
  },
  computed: {
    ...mapState(d$mesin, ["g$mesin"]),
    ...mapState(d$employee, ["g$employee"]),
  },
  methods: {
    ...mapActions(d$mesin, ["a$getById"]),
    async getStatus() {
      try {
        await this.a$getById(this.itemId);
        this.detailItem = this.g$mesin.find(
          (mesin) => mesin.id_mesin === this.itemId
        );
      } catch (e) {
        console.error("Error in getStatus method", e);
      }
    },
    closeModal2() {
      this.StatusVisible = false;
      this.$emit("close");
    },
  },
  created() {
    this.getStatus();
  },
};
</script>

<style></style>
