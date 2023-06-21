<template>
  <Modal v-show="detailVisible" @close="closeModal2">
    <template v-slot:header>This Modal Confirmation</template>
    <template v-slot:body>
      <div class="mt-3">
        <div class="mt-3" v-if="detailItem">
          <table class="ms-4">
            <tbody>
              <tr>
                <td><strong>Id Kerusakan</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.id_kerusakan }}</td>
              </tr>
              <tr>
                <td><strong>Start Error</strong></td>
                <td class="px-3">:</td>
                <td>{{ formatDate(detailItem.start_time) }}</td>
              </tr>
              <tr>
                <td><strong>Nama Mesin</strong></td>
                <td class="px-3">:</td>
                <td>
                  {{ detailItem?.mesin?.nama_mesin }}
                </td>
              </tr>
              <tr>
                <td><strong>Jenis Scw</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem?.problemscws?.jenis_scw }}</td>
              </tr>
              <tr>
                <td><strong>Lokasi</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem?.lokasi?.nama_lokasi }}</td>
              </tr>
              <tr>
                <td><strong>Nama PIC</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem?.pic_related?.nama }}</td>
              </tr>
              <tr>
                <td><strong>No Handphone PIC</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem?.pic_related?.no_hp }}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <div></div>
        </div>

        <div class="text-center mt-4">
          <button
            class="btn btn-primary px-6 fs-5 ms-2"
            @click="closeModal2"
            type="submit"
          >
            Oke
          </button>
        </div>
      </div>
    </template>
    <template v-slot:footer>@footerKonfirmasi</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import d$history from "@/stores/dashboard/history";
import { mapState, mapActions } from "pinia";
export default {
  name: "DetailHistory",
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
      detailVisible: true,
      detailItem: null,
    };
  },
  computed: {
    ...mapState(d$history, ["g$history"]),
  },
  methods: {
    ...mapActions(d$history, ["a$getById"]),
    async getDetail() {
      try {
        await this.a$getById(this.itemId); // Ambil detailItem dari store mesin
        this.detailItem = this.g$history.find(
          (history) => history.id_kerusakan === this.itemId
        );
        this.formatDate();
      } catch (e) {
        console.error("Error in getDetail method", e);
      }
    },
    closeModal2() {
      this.detailVisible = false;
    },
    formatDate(dateTime) {
      if (!dateTime) {
        return "-";
      }
      const date = new Date(dateTime);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
      const year = date.getFullYear();
      return `${hours}:${minutes} | ${day}/${month}/${year}`;
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>

<style></style>
