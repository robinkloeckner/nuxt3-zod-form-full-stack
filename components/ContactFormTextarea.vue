<script setup lang="ts">
//Define props.
const props = defineProps<  {
  id: string
  label: string
  error?: string
}>();

// Model binding.
const modelValue  = defineModel<string>();
</script>

<template>
  <div class="textarea">
    <label :for="props.id">{{ props.label }}</label>
    <textarea :id="props.id" v-model="modelValue"></textarea>
    <div class="error">
      <p v-if="props.error">{{ props.error }}</p>
    </div>
  </div>
</template>

<style>

</style>