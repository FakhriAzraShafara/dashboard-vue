<template>
  <transition name="modal-fade">
    <div class="modal" @click.self="close" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content" @click.stop>
          <div class="modal-header text-primary" id="modalTitle">
            <slot class="modal-title" name="header">Modal title</slot>
            <button
              type="button"
              class="btn-close"
              @click.stop="close"
              aria-label="Close modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body" id="modalDescription"
              >Modal body text goes here.</slot
            >
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click.stop="close"
              >
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 50px;
  background: #0000006c;
}

.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 100%;
  max-width: 100%;
  min-width: 450px;
  min-height: 200px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  overflow-y: auto;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 60px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #1037e4;
  background: transparent;
}

.btn-close:hover {
  color: blueviolet;
}

.btn-green {
  color: white;
  background: #1037e4;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
