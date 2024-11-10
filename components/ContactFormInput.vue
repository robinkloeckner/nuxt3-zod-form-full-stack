<script setup lang="ts">
//Define props.
const props = defineProps<  {
  id: string
  inputType: string
  label: string
  error?: string
}>();

// Model binding.
const modelValue  = defineModel<string | number>();
</script>

<template>
  <div class="input">
    <label :for="props.id">{{ props.label }}</label>
    <input :id="props.id" :type="props.inputType" v-model="modelValue"/>
    <div class="error">
      <p v-if="props.error">{{ props.error }}</p>
    </div>
  </div>
</template>

<style>

</style>