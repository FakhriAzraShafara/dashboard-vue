<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h6 class="fs-4">Data Mesin</h6>
            <button
              class="btn btn-primary rounded px-5 py-1.5"
              type="button"
              @click="showAddModal"
            >
              Add
            </button>
          </div>
          <div class="card-body px-0 pt-0 pb-3">
            <div class="table-responsive p-2">
              <table class="table align-items-center mb-3 table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">No. Machine</th>
                    <th class="text-center">Machine Name</th>
                    <th class="text-center">Type</th>
                    <th class="text-center">Location</th>
                    <th class="text-center">Machine State</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in g$mesin" :key="item.id_mesin">
                    <td class="border text-center">{{ index + 1 }}</td>
                    <td class="border text-center">{{ item.nama_mesin }}</td>
                    <td class="border text-center">{{ item.tipe_mesin }}</td>
                    <td class="border text-center">
                      {{ item.lokasi?.nama_lokasi || "Unknown Location" }}
                    </td>
                    <td class="border text-center">
                      <button
                        @click="showStatusModal(item)"
                        class="btn btn-primary rounded px-3"
                        :class="{
                          'btn-danger': item.status_mesins !== null,
                          'btn-primary': item.status_mesins === null,
                        }"
                      >
                        {{ item.status_mesins === null ? "Normal" : "Error" }}
                      </button>
                    </td>
                    <td class="border text-center">
                      <button
                        class="btn btn-primary rounded px-3"
                        @click="showDetailModal(item)"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                      <button
                        class="btn btn-secondary rounded px-3 ms-2"
                        @click="showEditModal(item)"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-danger rounded px-3 ms-2"
                        @click="showDeleteModal(item)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <button
                        class="btn btn-warning rounded px-3 ms-2"
                        @click="showReportModal(item)"
                      >
                        <i class="fas fa-flag"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Component -->
    <AddMesin v-if="isAddModalVisible" @close="closeModal" />
    <!-- End Add Component -->

    <!-- Edit Component -->
    <EditMesin
      v-if="isEditModalVisible"
      :itemId="editedItemId"
      @close="closeModal"
    />
    <!-- End Edit Component -->

    <!-- Report Component -->
    <ReportMesin
      v-if="isReportModalVisible"
      :itemId="reportItemId"
      @close="closeModal"
    />
    <!-- End Report Component -->

    <!-- Delete Component -->
    <DeleteMesin
      v-if="isDeleteModalVisible"
      :itemId="deleteItemId"
      @close="closeModal"
    />

    <!-- Detail Component -->
    <DetailMesin
      v-if="isDetailModalVisible"
      :itemId="detailItemId"
      @close="closeModal"
    />
    <!-- Status Component -->
    <StatusMesin
      v-if="isStatusModalVisible"
      :itemId="statusItemId"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import d$mesin from "@/stores/dashboard/mesin";
import d$lokasi from "@/stores/dashboard/lokasi";
import AddMesin from "@/views/Dashboard/Mesin/AddMesin.vue";
import EditMesin from "@/views/Dashboard/Mesin/EditMesin.vue";
import ReportMesin from "@/views/Dashboard/Mesin/ReportMesin.vue";
import DeleteMesin from "@/views/Dashboard/Mesin/Confirmation.vue";
import DetailMesin from "@/views/Dashboard/Mesin/Detail.vue";
import StatusMesin from "@/views/Dashboard/Mesin/Status.vue";
import d$scw from "@/stores/dashboard/scw";

export default {
  name: "Mesin",
  components: {
    AddMesin,
    EditMesin,
    ReportMesin,
    DeleteMesin,
    DetailMesin,
    StatusMesin,
  },
  data() {
    return {
      isAddModalVisible: false,
      isEditModalVisible: false,
      isReportModalVisible: false,
      isDeleteModalVisible: false,
      isDetailModalVisible: false,
      isStatusModalVisible: false,
      reportItemId: null,
      editedItemId: null,
      deleteItemId: null,
      detailItemId: null,
      statusItemId: null,
    };
  },
  computed: {
    ...mapState(d$mesin, ["g$mesin"]),
    ...mapState(d$lokasi, ["g$lokasi"]),
    ...mapState(d$scw, ["g$scw"]),
  },
  methods: {
    ...mapActions(d$mesin, {
      m$aList: "a$list", // Alias untuk a$list dari d$mesin
      m$aUpdate: "a$update", // Alias untuk a$update dari d$mesin
      m$aDelete: "a$delete", // Alias untuk a$delete dari d$mesin
      m$aDetail: "a$getById", // Alias untuk a$getById dari d$mesin
    }),
    ...mapActions(d$lokasi, {
      l$aList: "a$list", // Alias untuk a$list dari d$lokasi
    }),
    showAddModal() {
      this.isAddModalVisible = true;
    },
    showEditModal(item) {
      this.editedItemId = item.id_mesin;
      this.isEditModalVisible = true;
    },
    showReportModal(item) {
      this.isReportModalVisible = true;
      this.reportItemId = item.id_mesin;
    },
    showDeleteModal(item) {
      this.deleteItemId = item.id_mesin;
      this.isDeleteModalVisible = true;
    },
    showDetailModal(item) {
      this.detailItemId = item.id_mesin;
      this.isDetailModalVisible = true;
    },
    showStatusModal(item) {
      this.statusItemId = item.id_mesin;
      this.isStatusModalVisible = true;
    },
    getLocationName(lokasiId) {
      const location = this.g$lokasi.find(
        (lokasi) => lokasi.id_lokasi === lokasiId
      );
      return location ? location.nama_lokasi : "Unknown Location";
    },

    closeModal() {
      this.isAddModalVisible = false;
      this.isEditModalVisible = false;
      this.isReportModalVisible = false;
      this.isDeleteModalVisible = false;
      this.isDetailModalVisible = false;
      this.isStatusModalVisible = false;
      this.reportItemId = null;
      this.editedItemId = null;
      this.deleteItemId = null;
      this.detailItemId = null;
    },
    async getMesin() {
      try {
        await this.m$aList(); // Menggunakan alias m$aList untuk d$mesin
      } catch (e) {
        console.error("Error in getMesin method", e);
      }
    },
  },
  async created() {
    await this.getMesin();
  },
};
</script>

<style>
/* Ubah ukuran dan tampilan ikon */
.table .btn i {
  font-size: 18px;
}

/* Atur margin pada ikon tombol */
.table .btn i {
  margin-right: 0;
}
</style>
