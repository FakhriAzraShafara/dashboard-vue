<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h6 class="fs-4">Data Riwayat Notifikasi</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-3">
            <div class="table-responsive p-2">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Send Time</th>
                    <th class="text-center">Nama Mesin</th>
                    <th class="text-center">Nama PIC</th>
                    <th class="text-center">Jenis SCW</th>
                    <th class="text-center">Time Out</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in g$history"
                    :key="item.id_kerusakan"
                  >
                    <td class="border text-center">{{ index + 1 }}</td>
                    <td class="border text-center">
                      {{ formatDate(item.start_time) }}
                    </td>
                    <td class="border text-center">
                      {{ item?.mesin?.nama_mesin }}
                    </td>
                    <td class="border text-center">
                      {{ item?.pic_related?.nama }}
                    </td>
                    <td class="border text-center">
                      {{ item?.problemscws?.jenis_scw }}
                    </td>

                    <td class="border text-center">
                      {{ formatDate(item.end_time) }}
                    </td>
                    <td class="border text-center">
                      <button
                        class="btn btn-primary rounded px-3"
                        @click="showDetailModal(item)"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                      <button
                        class="btn btn-danger rounded px-3 ms-2"
                        @click="showDeleteModal(item)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Confirmation Component -->
        <DeleteHistory
          v-if="isDeleteModalVisible"
          :itemId="deleteItemId"
          @close="closeModal"
        />

        <!-- Detail Component -->
        <DetailHistory
          v-if="isDetailModalVisible"
          :itemId="detailItemId"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import d$history from "@/stores/dashboard/history";
import DeleteHistory from "@/views/Dashboard/History/Confirmation.vue";
import DetailHistory from "@/views/Dashboard/History/DetailHistory.vue";

export default {
  name: "History",
  components: {
    DeleteHistory,
    DetailHistory,
  },
  data() {
    return {
      isDeleteModalVisible: false,
      isDetailModalVisible: false,
      detailItemId: null,
      deleteItemId: null,
      history: [],
    };
  },
  computed: {
    ...mapState(d$history, ["g$history"]),
  },
  methods: {
    ...mapActions(d$history, ["a$list", "a$getById", "a$delete"]),
    showDeleteModal(item) {
      this.deleteItemId = item.id_kerusakan;
      this.isDeleteModalVisible = true;
    },
    showDetailModal(item) {
      this.detailItemId = item.id_kerusakan;
      this.isDetailModalVisible = true;
    },
    closeModal() {
      this.isEditModalVisible = false;
      this.isDeleteModalVisible = false;
      this.isDetailModalVisible = false;
    },
    async getHistory() {
      try {
        const response = await this.a$list();
      } catch (e) {
        console.error("Error in getHistory: ", e);
      }
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
    this.getHistory();
  },
};
</script>

<style scoped></style>
