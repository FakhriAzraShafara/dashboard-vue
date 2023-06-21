<template>
  <Modal v-if="isModalVisible" @close="closeModal">
    <template v-slot:header>Edit Employee</template>
    <template v-slot:body>
      <div class="mt-2 mx-4">
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <label for="nama">Nama:</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              v-model="input.nama"
            />
          </div>

          <div class="form-group">
            <label for="jabatan">Jabatan:</label>
            <select class="form-control" id="jabatan" v-model="input.jabatanId">
              <option value="">Select a position</option>
              <option
                v-for="jabatan in jabatanList"
                :key="jabatan.id_jabatan"
                :value="jabatan.id_jabatan"
              >
                {{ jabatan.nama_jabatan }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="tempat_lahir">Tempat Lahir:</label>
            <input
              type="text"
              class="form-control"
              id="tempat_lahir"
              v-model="input.tempat_lahir"
            />
          </div>

          <div class="form-group">
            <label for="tgl_lahir">Tanggal Lahir:</label>
            <input
              type="date"
              class="form-control"
              id="tgl_lahir"
              :value="formattedDateOfBirth"
              @input="updateDateOfBirth($event.target.value)"
            />
          </div>

          <div class="form-group mt-2">
            <label for="jeniskelamin">Jenis Kelamin:</label>
            <select
              class="form-control"
              id="jeniskelamin"
              v-model="input.jenis_kelamin"
            >
              <option value="" disabled>Select Jenis Kelamin</option>
              <option
                value="Laki-Laki"
                :selected="input.jenis_kelamin === 'Laki-laki'"
              >
                Laki-Laki
              </option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div class="form-group">
            <label for="status">Status:</label>
            <div class="d-flex justify-content-around">
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="activeStatus"
                  value="Active"
                  v-model="input.status"
                />
                <label class="form-check-label" for="activeStatus"
                  >Active</label
                >
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="nonActiveStatus"
                  value="Non Active"
                  v-model="input.status"
                />
                <label class="form-check-label" for="nonActiveStatus"
                  >Non Active</label
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="input.email"
            />
          </div>

          <div class="form-group">
            <label for="alamat">Alamat:</label>
            <textarea
              class="form-control"
              id="alamat"
              v-model="input.alamat"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="keterangan">Keterangan:</label>
            <textarea
              class="form-control"
              id="keterangan"
              v-model="input.keterangan"
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
    <template v-slot:footer>
      <footerMeme />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapState, mapActions } from "pinia";
import d$employee from "@/stores/dashboard/employee";
import d$jabatan from "@/stores/dashboard/jabatan";
import d$departemen from "@/stores/dashboard/departemen";
import { parseISO, format } from "date-fns";

export default {
  name: "EditEmployee",
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
        id_employee: "",
        nama: "",
        jabatanId: "",
        tempat_lahir: "",
        tgl_lahir: null,
        jenis_kelamin: "",
        no_hp: "",
        status: "",
        email: "",
        alamat: "",
        keterangan: "",
      },
      jabatanList: [],
      isModalVisible: true,
    };
  },
  computed: {
    ...mapState(d$employee, ["g$employee"]),
    ...mapState(d$jabatan, ["g$jabatan"]),
    ...mapState(d$departemen, ["g$departemen"]),
    currentItem() {
      return (
        this.g$employee.find((item) => item.id_employee === this.itemId) || {}
      );
    },
    formattedDateOfBirth() {
      if (this.input.tgl_lahir) {
        return format(this.input.tgl_lahir, "yyyy-MM-dd");
      }
      return "";
    },
  },
  watch: {
    currentItem: {
      immediate: true,
      handler(value) {
        this.input = {
          id_employee: value.id_employee || "",
          nama: value.nama || "",
          jabatanId: value.jabatanId || "",
          tempat_lahir: value.tempat_lahir || "",
          tgl_lahir: value.tgl_lahir ? parseISO(value.tgl_lahir) : null,
          jenis_kelamin: value.jenis_kelamin || "",
          no_hp: value.no_hp || "",
          email: value.email || "",
          alamat: value.alamat || "",
          status: value.status || "",
          departemenId: value.departemenId || "",
          keterangan: value.keterangan || "",
        };
      },
    },
  },
  methods: {
    ...mapActions(d$employee, {
      em$getById: "a$getById",
      em$update: "a$update",
      em$aList: "a$list",
    }),
    ...mapActions(d$jabatan, {
      j$aList: "a$list",
    }),
    ...mapActions(d$departemen, {
      d$aList: "a$list",
    }),
    updateDateOfBirth(value) {
      this.input.tgl_lahir = value ? new Date(value) : null;
    },
    async submitEdit() {
      try {
        const updatedItem = { ...this.input };
        this.updateDateOfBirth(updatedItem.tgl_lahir); // Memperbarui nilai input.tgl_lahir sebelum melakukan pembaruan
        await this.em$update(this.itemId, updatedItem);
        const index = this.g$employee.findIndex(
          (item) => item.id_employee === this.itemId
        );
        if (index !== -1) {
          this.g$employee.splice(index, 1, {
            ...this.g$employee[index],
            ...updatedItem,
          });
        }
        await this.em$aList();
        this.closeModal();
      } catch (e) {
        console.error(e);
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.input = {
        id_employee: "",
        nama: "",
        jabatanId: "",
        tempat_lahir: "",
        tgl_lahir: "",
        jenis_kelamin: "",
        no_hp: "",
        email: "",
        alamat: "",
        status: "",
        departemenId: "",
        keterangan: "",
      };
      this.$emit("close");
    },
  },
  mounted() {
    this.d$aList()
      .then(() => {
        this.departemenList = this.g$departemen;
      })
      .catch((error) => {
        console.error(error);
      });

    this.j$aList()
      .then(() => {
        this.jabatanList = this.g$jabatan;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped></style>
