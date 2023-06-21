<template>
  <Modal v-if="DetailVisible" @close="closeModal2">
    <template v-slot:header>
      <h4 class="modal-title">Detail Mesin</h4>
    </template>
    <template v-slot:body>
      <div class="mt-3" v-if="detailItem">
        <table>
          <tbody>
            <tr>
              <td><strong>Id Mesin</strong></td>
              <td>{{ detailItem.id_mesin }}</td>
            </tr>
            <tr>
              <td><strong>Nama Mesin</strong></td>
              <td>{{ detailItem.nama_mesin }}</td>
            </tr>
            <tr>
              <td><strong>Tipe Mesin</strong></td>
              <td>{{ detailItem.tipe_mesin }}</td>
            </tr>
            <tr>
              <td><strong>PIC Mesin</strong></td>
              <td>{{ detailItem.employees?.nama ?? "-" }}</td>
            </tr>
            <tr>
              <td><strong>Lokasi Mesin</strong></td>
              <td>{{ detailItem.lokasi?.nama_lokasi ?? "-" }}</td>
            </tr>
            <tr>
              <td><strong>Deskripsi Mesin</strong></td>
              <td>{{ detailItem.deskripsi_mesin }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div>
          <strong>History Kerusakan : </strong>
          <span
            v-if="!detailItem.history || detailItem.history.length === 0"
            class="px-2 bg-warning text-white"
          >
            No history available</span
          >
        </div>
        <table
          style="border-collapse: collapse; width: 100%"
          v-if="detailItem.history && detailItem.history.length > 0"
          class="px-2 bg-secondary text-white rounded"
        >
          <thead>
            <tr style="border-bottom: 1px solid white">
              <th style="padding: 8px; text-align: center">No</th>
              <th style="padding: 8px; text-align: center">Jenis Kerusakan</th>
              <th style="padding: 8px; text-align: center">Time Start</th>
              <th style="padding: 8px; text-align: center">Time Out</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(historyItem, index) in detailItem.history"
              :key="index"
              style="border-bottom: 1px solid white"
            >
              <td style="padding: 8px; text-align: center">{{ index + 1 }}</td>
              <td style="padding: 8px; text-align: center">
                {{ historyItem?.problemscws?.jenis_scw }}
              </td>
              <td style="padding: 8px; text-align: center">
                {{ formatDate(historyItem.start_time) }}
              </td>
              <td style="padding: 8px; text-align: center">
                {{
                  historyItem.end_time ? formatDate(historyItem.end_time) : "-"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template v-slot:footer>
      <button class="btn btn-secondary" @click="closeModal2">Close</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import d$mesin from "@/stores/dashboard/mesin";
import { mapState, mapActions } from "pinia";

export default {
  name: "DetailMesin",
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
      DetailVisible: true,
      detailItem: null, // Memberikan nilai awal null
    };
  },
  computed: {
    ...mapState(d$mesin, ["g$mesin"]),
  },
  methods: {
    ...mapActions(d$mesin, ["a$getById"]),
    async getDetail() {
      try {
        await this.a$getById(this.itemId); // Ambil detailItem dari store mesin
        this.detailItem = this.g$mesin.find(
          (mesin) => mesin.id_mesin === this.itemId
        );
      } catch (e) {
        console.error("Error in getDetail method", e);
      }
    },
    closeModal2() {
      this.DetailVisible = false;
      this.$emit("close");
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
      return `${day}.${month} | ${hours}:${minutes}:${year}`;
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

table td {
  border: 1px solid #ccc;
  padding: 8px;
}

table td strong {
  font-weight: bold;
}
</style>
