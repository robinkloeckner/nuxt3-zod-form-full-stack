<script setup lang="ts">
import type { FormData, FormErrors } from "~/utils/Validators";
import { z } from "zod";

// Init form data and error messages.
const initialFormData: FormData = {
  age: 0,
  email: "",
  message: ""
};

const formData = ref<FormData>({ ...initialFormData });
const formErrors = ref<FormErrors>({});
const statusMessage = ref<string | null>(null);

// Validation.
const validateFormData = (): boolean => {
  // Parse form data without throwing an error.
  const result: z.SafeParseReturnType<FormData, FormData>
      = formSchema.safeParse(formData.value);

  // Debug: Log validation results client-side.
  // console.log("Results client: ", result);

  // Display errors.
  if (!result.success) {
    formErrors.value = result.error.errors.reduce((acc: FormErrors, error: any) => {
      const key = error.path[0] as keyof FormData;
      acc[key] = error.message;
      return acc
    }, {} as FormErrors)
    return false;
  }

  // Reset errors if data are valid.
  formErrors.value = {};
  return true;
};

// Handle form submission.
const onSubmit = async () => {
  // Reset statusMessage.
  statusMessage.value = null;

  // Check if validation failed.
  if (!validateFormData()) return;

  // If the validation is successful, send data to the server.
  try {
    const response: Response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value)
    });

    // Response handling.
    const result = await response.json();
    statusMessage.value = result.message;

    // Reset the form values.
    if (result.statusCode === 200) {
      formData.value = { ...initialFormData };
    }
  } catch {
    statusMessage.value = "There was an unexpected error.";
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate>
    <ContactFormInput
      v-model="formData.email"
      id="email"
      inputType="email"
      label="E-Mail"
      :error="formErrors.email" />

    <ContactFormInput
        v-model="formData.age"
        id="age"
        inputType="number"
        label="Age"
        :error="formErrors.age" />

    <ContactFormTextarea
      v-model="formData.message"
      id="message"
      label="Message"
      :error="formErrors.message" />

    <button type="submit">Submit</button>
    <p class="status">{{ statusMessage }}</p>
  </form>
</template>

<style>
form {
  margin: 20vh auto;
  width: 300px;
  font-family: sans-serif;

  * {
    display: block;
    width: 100%;
  }

  input,
  textarea {
    border: 1px solid #898989;
    border-radius: 4px;
  }

  .error {
    height: 35px;
    color: red;

    p {
      margin: 5px 0;
    }
  }
}
</style>