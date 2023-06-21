<template>
  <div class="py-2 container-fluid">
    <div class="col-lg-12">
      <div>
        <!-- Content Body -->
        <div class="py-4 container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header pb-0 d-flex justify-content-between">
                  <h6 class="fs-4">History Kerusakan</h6>
                </div>
                <div class="card-body px-0 pt-0 pb-3">
                  <div class="table-responsive p-2">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="text-center">No</th>
                          <th class="text-center">Nama Mesin</th>
                          <th class="text-center">Nama PIC</th>
                          <th class="text-center">Jenis SCW</th>
                          <th class="text-center">Time Error</th>
                          <th class="text-center">Stop Call</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in filteredHistory"
                          :key="item.id_kerusakan"
                        >
                          <td class="border text-center">{{ index + 1 }}</td>
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
                            {{ formatDate(item.start_time) }}
                          </td>
                          <td class="border text-center">
                            <button
                              @click="stopCall(item)"
                              class="btn btn-danger btn-stop"
                            >
                              <i class="fas fa-stop"></i>
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
            </div>
          </div>
        </div>
        <!-- End Content Body -->
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/examples/Cards/Card.vue";
import { mapActions, mapState } from "pinia";
import d$history from "@/stores/dashboard/history";
import DeleteHistory from "@/views/Dashboard/Confirmation.vue";

export default {
  name: "History",
  components: {
    Card,
    DeleteHistory,
  },
  data() {
    return {
      isDeleteModalVisible: false,
      deleteItemId: null,
    };
  },
  computed: {
    ...mapState(d$history, ["g$history"]),
    filteredHistory() {
      return this.g$history.filter((item) => !item.end_time);
    },
  },
  methods: {
    ...mapActions(d$history, ["a$list", "a$update"]),
    stopCall(item) {
      this.deleteItemId = item.id_kerusakan;
      this.isDeleteModalVisible = true;
    },
    async getHistory() {
      try {
        await this.a$list();
      } catch (e) {
        console.error("Error in getHistory: ", e);
      }
    },
    closeModal() {
      this.isDeleteModalVisible = false;
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
