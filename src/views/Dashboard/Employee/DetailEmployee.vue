<template>
  <Modal v-show="detailVisible" @close="closeModal2">
    <template v-slot:header>This Modal Confirmation</template>
    <template v-slot:body>
      <div class="mt-3">
        <div class="mt-3" v-if="detailItem">
          <table class="ms-2">
            <tbody>
              <tr>
                <td><strong>Id Employee</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.id_employee }}</td>
              </tr>
              <tr>
                <td><strong>Nama Employee</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.nama }}</td>
              </tr>
              <tr>
                <td><strong>Tempat, Tanggal lahir</strong></td>
                <td class="px-3">:</td>
                <td>
                  {{ detailItem.tempat_lahir }},
                  {{ formatDate(detailItem.tgl_lahir) }}
                </td>
              </tr>
              <tr>
                <td><strong>Jenis Kelamin</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.jenis_kelamin }}</td>
              </tr>
              <tr>
                <td><strong>Email :</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.email }}</td>
              </tr>
              <tr>
                <td><strong>No.Handphone</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.no_hp }}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.status }}</td>
              </tr>
              <tr>
                <td><strong>Alamat</strong></td>
                <td class="px-3">:</td>
                <td>{{ detailItem.alamat }}</td>
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
import d$employee from "@/stores/dashboard/employee";
import { mapState, mapActions } from "pinia";
export default {
  name: "DetailEmployee",
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
    ...mapState(d$employee, ["g$employee"]),
  },
  methods: {
    ...mapActions(d$employee, ["a$getById"]),
    async getDetail() {
      try {
        await this.a$getById(this.itemId); // Ambil detailItem dari store mesin
        this.detailItem = this.g$employee.find(
          (employee) => employee.id_employee === this.itemId
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
      const day = String(date.getDate()).padStart(2, "0");
      const month = this.getMonthName(date.getMonth());
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
    getMonthName(monthIndex) {
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      return monthNames[monthIndex];
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>

<style></style>
