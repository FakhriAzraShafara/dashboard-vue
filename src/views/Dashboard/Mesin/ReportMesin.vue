<template>
  <Modal v-model="isModalVisible" @close="closeModal">
    <template v-slot:header>Report Mesin</template>
    <template v-slot:body>
      <div class="mt-3">
        <form @submit.prevent="submitReport" v-if="detailItem">
          <div class="form-group">
            <label for="nama_mesin">Nama Mesin:</label>
            <input
              type="text"
              class="form-control bg-white"
              id="nama_mesin"
              :value="detailItem && detailItem.nama_mesin"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="nama_pic">Nama PIC:</label>
            <input
              type="text"
              class="form-control bg-white"
              id="nama_pic"
              :value="
                detailItem && detailItem.employees && detailItem.employees.nama
              "
              disabled
            />
          </div>
          <div class="form-group">
            <label for="lokasi">Lokasi Mesin:</label>
            <input
              type="text"
              class="form-control bg-white"
              id="lokasi"
              :value="
                detailItem && detailItem.lokasi && detailItem.lokasi.nama_lokasi
              "
              disabled
            />
          </div>
          <div class="form-group">
            <label for="status">Status Mesin:</label>
            <div class="d-flex justify-content-around">
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="normalStatus"
                  value="normalStatus"
                  v-model="checked"
                />
                <label class="form-check-label" for="normalStatus"
                  >Normal</label
                >
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="errorStatus"
                  value="errorStatus"
                  v-model="checked"
                />
                <label class="form-check-label" for="errorStatus">Error</label>
              </div>
            </div>
          </div>
          <div class="form-group mt-2" v-if="checked === 'errorStatus'">
            <label for="jenisScw">Jenis Kerusakan:</label>
            <select
              class="form-control bg-white"
              id="jenisScw"
              v-model="input.problemscwsId"
              v-if="detailItem.status_mesins === null"
            >
              <option value="" disabled selected hidden>
                Select Jenis Kerusakan
              </option>
              <option
                v-for="problemscw in scwList"
                :key="problemscw.id_scw"
                :value="problemscw.id_scw"
              >
                {{ problemscw.jenis_scw }}
              </option>
            </select>
            <input
              type="text"
              class="form-control bg-white"
              id="nama_pic"
              :value="detailItem?.status_mesin?.jenis_scw"
              v-else
              disabled
            />
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-primary px-6 fs-5" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:footer>{{ footerMeme }}</template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapActions, mapState } from "pinia";
import d$mesin from "@/stores/dashboard/mesin";
import d$history from "@/stores/dashboard/history";
import d$scw from "@/stores/dashboard/scw";

export default {
  name: "ReportMesin",
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
      checked: "normalStatus",
      input: {
        problemscwsId: "",
        mesinId: "",
        lokasiId: "",
        picId: "",
      },
      detailItem: null,
      isModalVisible: true,
      scwList: [],
    };
  },
  computed: {
    ...mapState(d$mesin, ["g$mesin"]),
    ...mapState(d$history, ["g$history"]),
    ...mapState(d$scw, ["g$scw"]),
  },
  methods: {
    ...mapActions(d$mesin, {
      m$aList: "a$list",
      m$add: "a$add",
      m$getById: "a$getById",
      m$aUpdate: "a$update",
      m$aDelete: "a$delete",
    }),
    ...mapActions(d$history, { h$aList: "a$list", h$add: "a$add" }),
    ...mapActions(d$scw, { s$list: "a$list" }),
    async getMesinById() {
      try {
        this.detailItem = await this.m$getById(this.itemId);
        this.checked =
          this.detailItem && this.detailItem.status_mesins !== null
            ? "errorStatus"
            : "normalStatus";

        // Menyamakan nilai input dengan detailItem
        this.input.mesinId = this.detailItem.id_mesin;
        this.input.lokasiId = this.detailItem.lokasiId;
        this.input.picId = this.detailItem.employeeId;
        this.input.problemscwsId = this.detailItem.status_mesin
          ? this.detailItem.status_mesins.id_scw
          : "";
      } catch (e) {
        console.error("Error in getById method", e);
      }
    },

    async submitReport() {
      try {
        if (this.checked === "errorStatus" && this.input.problemscwsId) {
          const selectedScw = this.scwList.find(
            (scw) => scw.id_scw === this.input.problemscwsId
          );
          this.detailItem.status_mesins = selectedScw;

          const updatedItem = {
            ...this.detailItem,
            status_mesins: this.input.problemscwsId,
            employeeId: this.detailItem.employees.id_employee,
            lokasiId: this.detailItem.lokasi.id_lokasi,
          };

          await this.m$aUpdate(this.itemId, updatedItem);
          await this.m$aList();

          const historyPayload = {
            problemscwsId: this.input.problemscwsId,
            mesinId: this.detailItem.id_mesin,
            lokasiId: this.detailItem.lokasiId,
            picId: this.detailItem.employeeId,
          };

          await this.h$add(historyPayload);
          await this.h$aList();
        } else if (this.checked === "normalStatus") {
          this.detailItem.status_mesins = null;

          const updatedItem = {
            ...this.detailItem,
            status_mesin: null,
            employeeId: this.detailItem.employees.id_employee,
            lokasiId: this.detailItem.lokasi.id_lokasi,
          };

          await this.m$aUpdate(this.itemId, updatedItem);
          await this.m$aList();
        }

        this.closeModal();
      } catch (e) {
        console.error(e);
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.$emit("close");
    },
  },
  async mounted() {
    await this.s$list();
    this.scwList = this.g$scw;
    await this.getMesinById();
  },
};
</script>

<style scoped></style>
