<template>
  <Modal v-model="isModalVisible" @close="closeModal">
    <template v-slot:header>Add Mesin</template>
    <template v-slot:body>
      <div class="mt-3">
        <form @submit.prevent="submitAdd">
          <div class="form-group">
            <label for="nama_mesin">Nama Mesin:</label>
            <input
              type="text"
              class="form-control"
              id="nama_mesin"
              v-model="input.nama_mesin"
              placeholder="Masukkan nama mesin"
            />
          </div>
          <div class="form-group">
            <label for="tipe_mesin">Tipe Mesin:</label>
            <input
              type="text"
              class="form-control"
              id="tipe_mesin"
              v-model="input.tipe_mesin"
              placeholder="Masukkan tipe mesin"
            />
          </div>
          <div class="form-group">
            <label for="employees">Penanggung Jawab:</label>
            <select
              class="form-control"
              id="employees"
              v-model="input.employeeId"
            >
              <option value="" disabled selected hidden>
                Pilih penanggung jawab
              </option>
              <option
                v-for="employee in employeeList"
                :key="employee.id_employee"
                :value="employee.id_employee"
              >
                {{ employee.nama }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="lokasi_mesins">Lokasi Mesin:</label>
            <div>
              <div
                v-for="lokasi in lokasiList"
                :key="lokasi.id_lokasi"
                class="form-check"
              >
                <input
                  type="radio"
                  class="form-check-input"
                  v-model="input.lokasiId"
                  :value="lokasi.id_lokasi"
                  :id="'lokasi_' + lokasi.id_lokasi"
                />
                <label
                  class="form-check-label"
                  :for="'lokasi_' + lokasi.id_lokasi"
                >
                  {{ lokasi.nama_lokasi }}
                </label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Deskripsi mesin:</label>
            <textarea
              class="form-control"
              id="description"
              v-model="input.deskripsi_mesin"
              :class="{ 'is-invalid': isDeskripsiInvalid }"
              placeholder="Masukkan deskripsi mesin"
            ></textarea>
            <div v-if="isDeskripsiInvalid" class="invalid-feedback">
              Deskripsi melebihi batas karakter yang diizinkan.
            </div>
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-primary px-6 fs-5" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:footer>@footerMeme</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapActions, mapState } from "pinia";
import d$mesin from "@/stores/dashboard/mesin";
import d$lokasi from "@/stores/dashboard/lokasi";
import d$employee from "@/stores/dashboard/employee";

export default {
  name: "AddMesin",
  components: {
    Modal,
  },
  data() {
    return {
      input: {
        nama_mesin: "",
        tipe_mesin: "",
        employeeId: "",
        lokasiId: "",
        deskripsi_mesin: "",
      },
      isModalVisible: false,
      lokasiList: [],
      employeeList: [],
    };
  },
  computed: {
    ...mapState(d$lokasi, ["g$lokasi"]),
    ...mapState(d$employee, ["g$employee"]),
    isDeskripsiInvalid() {
      return this.input.deskripsi_mesin.length > 190; // Batas karakter 190
    },
  },
  methods: {
    ...mapActions(d$mesin, {
      m$aList: "a$list",
      m$add: "a$add",
      m$aUpdate: "a$update",
      m$aDelete: "a$delete",
    }),
    ...mapActions(d$lokasi, {
      l$aList: "a$list",
    }),
    ...mapActions(d$employee, {
      em$List: "a$list",
    }),
    async submitAdd() {
      try {
        await this.m$add({ ...this.input });
        await this.m$aList();
        this.closeModal();
      } catch (e) {
        console.error(e);
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.input.nama_mesin = "";
      this.input.tipe_mesin = "";
      this.input.employeeId = "";
      this.input.lokasiId = "";
      this.input.deskripsi_mesin = "";
      this.$emit("close");
    },
  },
  mounted() {
    this.l$aList()
      .then(() => {
        this.lokasiList = this.g$lokasi;
      })
      .catch((error) => {
        console.error(error);
      });
    this.em$List()
      .then(() => {
        this.employeeList = this.g$employee;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
.is-invalid {
  border-color: red;
}
.invalid-feedback {
  color: red;
  margin-top: 4px;
}
</style>
