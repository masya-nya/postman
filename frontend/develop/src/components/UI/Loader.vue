<template>
    <div class="reon-mailer-loader"></div>
</template>

<script>
export default {
    name: 'reon-loader'
}
</script>

<style scoped>
.reon-mailer-loader {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.reon-mailer-loader:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #18a058;
  border-color: #18a058 transparent #18a058 transparent;
  animation: reon-mailer-loader 1.2s linear infinite;
}
@keyframes reon-mailer-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>