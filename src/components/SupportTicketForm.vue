<script setup>
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })
const title = "Support Ticket Form";
</script>

<template>
  <div
    class="container d-flex flex-column align-items-center row-gap-3 formContainer"
  >
    <div>
      <h1>{{ title }}</h1>
    </div>
    <form class="p-3 w-100 d-flex flex-column row-gap-2 shadow-lg">
      <div>
        <label class="form-label" for="title">Title:</label>
        <input
          class="form-control"
          type="text"
          id="title"
          name="title"
          required
        />
      </div>

      <div>
        <label class="form-label" for="description">Description:</label>
        <textarea
          class="form-control"
          id="description"
          name="description"
          rows="4"
          required
        >
        </textarea>
      </div>

      <div>
        <label class="form-label" for="category">Category:</label>
        <select class="form-select" required>
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>

      <div>
        <label class="form-label" for="category">Sub-Category:</label>
        <select class="form-select" required>
          <option disabled value="">Please select one</option>
          <option>A-1</option>
          <option>A-2</option>
          <option>A-3</option>
        </select>
      </div>

      <div>
        <label class="form-label" for="severity">Severity:</label>
        <select class="form-select" required>
          <option disabled value="">Please select one</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <button type="button" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<style scoped>
.formContainer {
  /* border: 1px solid red; */
  max-width: 500px;
}
</style>
