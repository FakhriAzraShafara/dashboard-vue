<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h6 class="fs-4">Data Scw</h6>
            <button
              class="btn-primary rounded px-5 py-1.9 mb-3"
              type="button"
              @click="showAddModal"
            >
              Add
            </button>
          </div>
          <div class="card-body px-0 pt-0 pb-3">
            <div class="table-responsive p-2">
              <table class="table align-items-center mb-3">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Jenis Kerusakan</th>
                    <th>Kode Kerusakan</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in g$scw" :key="item.id_scw">
                    <td class="ps-4">{{ index + 1 }}</td>
                    <td>
                      <h6>{{ item.jenis_scw }}</h6>
                    </td>
                    <td class="ps-6">{{ item.id_scw }}</td>
                    <td>
                      <button
                        class="btn-secondary rounded px-3"
                        @click="showEditModal(item)"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn-danger rounded px-3 ms-2"
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
        <AddScw v-show="isAddModalVisible" @close="closeModal" />
        <EditScw
          v-show="isEditModalVisible"
          :itemId="editedItemId"
          @close="closeModal"
        />
        <DeleteScw
          v-show="isDeleteModalVisible"
          :itemId="deleteItemId"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import d$scw from "@/stores/dashboard/scw";
import AddScw from "@/views/Dashboard/Scw/AddScw.vue";
import EditScw from "@/views/Dashboard/Scw/EditScw.vue";
import DeleteScw from "@/views/Dashboard/Scw/Confirmation.vue";

export default {
  name: "Scw",
  components: {
    AddScw,
    EditScw,
    DeleteScw,
  },
  data() {
    return {
      isAddModalVisible: false,
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      editedItemId: null,
      deleteItemId: null,
    };
  },
  computed: {
    ...mapState(d$scw, ["g$scw"]),
  },
  methods: {
    ...mapActions(d$scw, ["a$list", "a$update", "a$delete"]),
    showAddModal() {
      this.isAddModalVisible = true;
    },
    showEditModal(item) {
      this.editedItemId = item.id_scw;
      // Dapatkan data item yang diperbarui berdasarkan itemId
      const updatedItem = {
        jenis_scw: item.jenis_scw,
      };
      this.a$update(item.id_scw, updatedItem /* body yang diperlukan */);
      this.isEditModalVisible = true;
    },
    showDeleteModal(item) {
      this.deleteItemId = item.id_scw;
      this.isDeleteModalVisible = true;
    },
    closeModal() {
      this.isAddModalVisible = false;
      this.isEditModalVisible = false;
      this.isDeleteModalVisible = false;
      this.editedItemId = null;
      this.deleteItemId = "";
    },
    async getScw() {
      try {
        await this.a$list();
      } catch (e) {
        console.error("Error in getScw method", e);
      }
    },
  },
  async created() {
    await this.getScw();
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
