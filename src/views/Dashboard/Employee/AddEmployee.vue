<template>
  <Modal v-model="isModalVisible" @close="closeModal">
    <template v-slot:header>Add Employee</template>
    <template v-slot:body>
      <div class="mt-2 mx-4">
        <form v-on:submit.prevent="submitAdd">
          <div class="form-group">
            <label for="employee_name">Employee Name:</label>
            <input
              type="text"
              class="form-control"
              id="employee_name"
              placeholder="Enter your name"
              v-model="input.nama"
            />
          </div>

          <div class="form-group">
            <label for="jabatanns">Jabatan:</label>
            <select
              class="form-control"
              id="jabatanns"
              v-model="input.jabatanId"
            >
              <option value="" disabled selected hidden>Select Jabatan</option>
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
            <label for="departemen">Departemen:</label>
            <select
              class="form-control"
              id="departemen"
              v-model="input.departemenId"
            >
              <option value="" disabled selected hidden>
                Select Depertemen
              </option>
              <option
                v-for="departemen in departemenList"
                :key="departemen.id_department"
                :value="departemen.id_department"
              >
                {{ departemen.nama_department }}
              </option>
            </select>
          </div>

          <div class="d-flex justify-content-around">
            <div class="form-group mt-2">
              <label for="tempat_lahir">Tempat Lahir:</label>
              <input
                type="text"
                class="form-control"
                id="tempat_lahir"
                placeholder="Enter your Born City"
                v-model="input.tempat_lahir"
              />
            </div>
            <div class="form-group mt-2">
              <label for="tgl_lahir">Tanggal Lahir:</label>
              <input
                type="date"
                class="form-control"
                id="tgl_lahir"
                v-model="input.tgl_lahir"
              />
            </div>
          </div>

          <div class="d-flex justify-content-around">
            <div class="form-group mt-2">
              <label for="title">Jenis Kelamin:</label>
              <select
                class="form-control"
                id="jeniskelamin"
                v-model="input.jenis_kelamin"
              >
                <option value="" disabled selected hidden>
                  Select Jenis Kelamin
                </option>
                <option
                  value="Laki-Laki"
                  :selected="input.jenis_kelamin === 'Laki-Laki'"
                >
                  Laki-Laki
                </option>
                <option
                  value="Perempuan"
                  :selected="input.jenis_kelamin === 'Perempuan'"
                >
                  Perempuan
                </option>
              </select>
            </div>

            <div class="form-group mt-2">
              <label for="no_telp">No Telp:</label>
              <input
                type="tel"
                class="form-control"
                id="no_telp"
                v-model="input.no_hp"
                @input="validateNoHp"
              />
              <div
                v-if="showValidationMessage"
                class="text-danger"
                style="font-size: 9px"
              >
                Masukkan nomor telepon yang valid (Harus angka minimal 10
                digit).
              </div>
            </div>
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
              placeholder="Enter your Email"
              v-model="input.email"
              @input="validateEmail"
            />
            <div v-if="showEmailValidationMessage" class="text-danger">
              Masukkan alamat email yang valid.
            </div>
          </div>

          <div class="form-group">
            <label for="alamat">Alamat:</label>
            <textarea
              class="form-control"
              id="alamat"
              placeholder="Enter your Address"
              v-model="input.alamat"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="keterangan">Keterangan:</label>
            <textarea
              class="form-control"
              id="keterangan"
              placeholder="Enter The Information"
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
    <template v-slot:footer>@footerMeme</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapState, mapActions } from "pinia";
import d$employee from "@/stores/dashboard/employee";
import d$jabatan from "@/stores/dashboard/jabatan";
import d$departemen from "@/stores/dashboard/departemen";
import { parseISO } from "date-fns";

export default {
  name: "AddEmployee",
  components: {
    Modal,
  },
  data() {
    return {
      input: {
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
      },
      isModalVisible: true,
      jabatanList: [],
      departemenList: [],
      showValidationMessage: false,
      showEmailValidationMessage: false,
    };
  },
  computed: {
    ...mapState(d$employee, ["g$employee"]),
    ...mapState(d$jabatan, ["g$jabatan"]),
    ...mapState(d$departemen, ["g$departemen"]),
  },
  methods: {
    ...mapActions(d$employee, {
      em$aList: "a$list",
      em$add: "a$add",
    }),
    ...mapActions(d$jabatan, {
      j$aList: "a$list",
      j$add: "a$add",
    }),
    ...mapActions(d$departemen, {
      d$aList: "a$list",
      d$add: "a$add",
    }),
    validateNoHp() {
      const regex = /^\d{10,}$/; // Nomor telepon harus terdiri dari minimal 10 digit angka
      this.showValidationMessage = !regex.test(this.input.no_hp);
    },
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression untuk validasi email
      this.showEmailValidationMessage = !regex.test(this.input.email);
    },
    async submitAdd() {
      try {
        const tgl_lahir = parseISO(this.input.tgl_lahir);
        await this.em$add({ ...this.input, tgl_lahir });
        await this.em$aList();
        this.closeModal();
      } catch (e) {
        console.error(e);
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.input.nama = "";
      this.input.jabatanId = "";
      this.input.tempat_lahir = "";
      this.input.tgl_lahir = "";
      this.input.jenis_kelamin = "";
      this.input.no_hp = "";
      this.input.email = "";
      this.input.alamat = "";
      this.input.status = "";
      this.input.departemenId = "";
      this.input.keterangan = "";
      this.$emit("close");
    },
  },
  mounted() {
    this.j$aList()
      .then(() => {
        this.jabatanList = this.g$jabatan;
      })
      .catch((error) => {
        console.error(error);
      });
    this.d$aList()
      .then(() => {
        this.departemenList = this.g$departemen;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped></style>
