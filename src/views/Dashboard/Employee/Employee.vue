<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h6 class="fs-4">Data Employee</h6>
            <button
              class="btn btn-primary rounded px-5 py-1.9 mb-3"
              type="button"
              @click="showAddModal"
            >
              Add
            </button>
          </div>
          <div class="card-body px-0 pt-0 pb-3">
            <div class="table-responsive p-2">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Nama Pegawai</th>
                    <th class="text-center">Jabatan</th>
                    <th class="text-center">Tanggung Jawab Mesin</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in g$employee"
                    :key="item.id_employee"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">{{ item.nama }}</td>
                    <td class="text-center">
                      {{ item?.jabatanns?.nama_jabatan }}
                    </td>
                    <td class="border">
                      <table class="table text-dark">
                        <tr
                          v-for="(mesinItem, index) in item.mesin"
                          :key="index"
                        >
                          <td class="border ps-3">
                            <li>
                              {{ mesinItem.nama_mesin }}
                            </li>
                          </td>
                        </tr>
                      </table>
                    </td>

                    <td class="text-center">
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Add Component -->
        <AddEmployee v-if="isAddModalVisible" @close="closeModal" />
        <!-- End Add Component -->

        <!-- Edit Component -->
        <EditEmployee
          v-if="isEditModalVisible"
          :itemId="editedItemId"
          @close="closeModal"
        />
        <!-- End Edit Component -->

        <!-- Confirmation Component -->
        <DeleteEmployee
          v-if="isDeleteModalVisible"
          :itemId="deleteItemId"
          @close="closeModal"
        />

        <!-- Detail Component -->
        <DetailEmployee
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
import d$employee from "@/stores/dashboard/employee";
import DeleteEmployee from "@/views/Dashboard/Employee/Confirmation.vue";
import AddEmployee from "@/views/Dashboard/Employee/AddEmployee.vue";
import EditEmployee from "@/views/Dashboard/Employee/EditEmployee.vue";
import DetailEmployee from "@/views/Dashboard/Employee/DetailEmployee.vue";

export default {
  name: "Employee",
  components: {
    AddEmployee,
    EditEmployee,
    DeleteEmployee,
    DetailEmployee,
  },
  data() {
    return {
      isAddModalVisible: false,
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      isDetailModalVisible: false,
      editedItemId: null,
      detailItemId: null,
      deleteItemId: null,
      employees: [],
    };
  },
  computed: {
    ...mapState(d$employee, ["g$employee"]),
  },
  methods: {
    ...mapActions(d$employee, ["a$list", "a$getById", "a$delete"]),
    showAddModal() {
      this.isAddModalVisible = true;
    },
    showEditModal(item) {
      this.editedItemId = item.id_employee;
      this.isEditModalVisible = true;
    },
    showDeleteModal(item) {
      this.deleteItemId = item.id_employee;
      this.isDeleteModalVisible = true;
    },
    showDetailModal(item) {
      this.detailItemId = item.id_employee;
      this.isDetailModalVisible = true;
    },
    closeModal() {
      this.isAddModalVisible = false;
      this.isEditModalVisible = false;
      this.isDeleteModalVisible = false;
      this.isDetailModalVisible = false;
    },
    async getEmployee() {
      try {
        const response = await this.a$list();
      } catch (e) {
        console.error("Error in getEmployee: ", e);
      }
    },
  },
  mounted() {
    this.getEmployee();
  },
};
</script>

<style scoped></style>
