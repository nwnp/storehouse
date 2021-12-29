<template>
  <div>
    <b-list-group>
      <b-list-group-item
        href="#"
        :style="
          this.$route.path === '/dashboard'
            ? 'background-color: #ccc'
            : 'background-color: white'
        "
        @click="$router.push('/dashboard')"
        >대시보드</b-list-group-item
      >
      <b-list-group-item
        href="#"
        :style="
          this.$route.path === '/department'
            ? 'background-color: #ccc'
            : 'background-color: white'
        "
        @click="$router.push('/department')"
        >부서 관리</b-list-group-item
      >
      <b-list-group-item
        href="#"
        :style="
          this.$route.path === '/user'
            ? 'background-color: #ccc'
            : 'background-color: white'
        "
        @click="$router.push('/user')"
        >사용자 관리</b-list-group-item
      >
      <b-list-group-item
        href="#"
        :style="
          this.$route.path === '/device'
            ? 'background-color: #ccc'
            : 'background-color: white'
        "
        @click="$router.push('/device')"
        >장비 관리</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped></style>
