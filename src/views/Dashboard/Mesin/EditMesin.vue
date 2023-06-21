<template>
  <Modal v-model="isModalVisible" @close="closeModal">
    <template v-slot:header>Edit Mesin</template>
    <template v-slot:body>
      <div class="mt-3">
        <form @submit.prevent="submitEdit">
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
            <label for="status_mesins">Penanggung Jawab:</label>
            <select
              class="form-control"
              id="status_mesins"
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
              placeholder="Masukkan deskripsi mesin"
            ></textarea>
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
  props: {
    itemId: {
      type: String,
      required: true,
    },
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
    ...mapState(d$mesin, ["g$mesin"]),
    currentItem() {
      return this.g$mesin.find((item) => item.id_mesin === this.itemId) || {};
    },
  },
  watch: {
    currentItem: {
      immediate: true,
      handler(value) {
        this.input = {
          nama_mesin: value.nama_mesin || "",
          tipe_mesin: value.tipe_mesin || "",
          employeeId: value.employeeId || "",
          lokasiId: value.lokasiId || "",
          deskripsi_mesin: value.deskripsi_mesin || "",
        };
      },
    },
  },
  methods: {
    ...mapActions(d$mesin, {
      m$aList: "a$list",
      m$aUpdate: "a$update",
    }),
    ...mapActions(d$lokasi, {
      l$aList: "a$list",
    }),
    ...mapActions(d$employee, {
      em$List: "a$list",
    }),
    async submitEdit() {
      try {
        const updatedItem = { ...this.input };
        await this.m$aUpdate(this.itemId, updatedItem);
        const index = this.g$mesin.findIndex(
          (item) => item.id_mesin === this.itemId
        );
        if (index !== -1) {
          this.g$mesin.splice(index, 1, {
            ...this.g$mesin[index],
            ...updatedItem,
          });
        }
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

<style></style>
