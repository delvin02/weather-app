<template>
  <div class="font-bold uppercase text-apple-600">
    <h1 class="text-9xl mb-4">Zap, 404!</h1>
    <p v-if="errorMessage" class="text-5xl">{{ errorMessage }}</p>
  </div>

</template>

<script>
export default {
    name: "NotFoundContainer",
    computed: {
        errorMessage() {
            return this.$route.query.error;
        }
    }
}
</script>