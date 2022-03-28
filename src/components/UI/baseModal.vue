<template>
  <teleport to="body">
    <div class="backdrop" @click="tryClose"></div>

    <dialog open>
      <div class="modal-container">
        <header class="modal-container__header">
          <h1>
            {{ title }}
          </h1>
        </header>
        <main class="modal-container__main">
          <section>
            <article class="modal-container__article">
              <slot>
                <p>{{ description }}</p>
              </slot>
            </article>
          </section>
          <menu>
            <div class="actions">
              <slot name="actions">
                <base-button @click="tryClose">Confirm</base-button>
              </slot>
            </div>
          </menu>
        </main>
      </div>
    </dialog>
  </teleport>
</template>

<script>
export default {
  emits: ["closeHandler"],
  props: ["title", "description"],
  data() {
    return {};
  },

  methods: {
    tryClose() {
      this.$emit("closeHandler");
    },
  },
};
</script>
<style scoped>
dialog {
  position: absolute;
  top: 10%;
  left: 5%;
  padding: 0;
  border: none;
  background: #3466ff;
  z-index: 10;
  border-radius: 12px;
}
div.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  z-index: 9;
}
div.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 500px;

  z-index: 10;
}
header.modal-container__header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
}
header > h1 {
  color: white;
  width: 100%;
  margin: 0;
  padding: 1rem 0.75rem;
  font-size: 1.2rem;
}
section,
main {
  width: 100%;
}
.modal-container__article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
menu {
  width: 100%;
  display: flex;
  padding: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}
div.actions {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
button {
  background-color: white;
  color: rgb(4, 136, 197);
  font-weight: bold;
  border: none;
  border-radius: 8px;
  letter-spacing: 2px;
  /* transition: all ease-in 0.5s; */
}
button:hover {
  color: white;
}
h1 {
  font-size: 1.5rem;
  color: white;
  width: 100%;

  margin: 0;
}
p {
  color: white;
  font-family: inherit;
  font-weight: bold;
}
.dialog-enter-active {
  transition: all 1s ease-in;
}
.dialog-from {
  opacity: 0;
  transform: scale(0.68);
}
.dialog-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
