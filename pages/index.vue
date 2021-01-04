<template>
  <div class="container">
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <van-radio-group v-model="$colorMode.preference">
      <van-radio v-for="color in columns" :key="color" :name="color">
        {{ color }}
      </van-radio>
    </van-radio-group>

    <nuxt-link v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
      {{ $t('title') }}
    </nuxt-link>
    <nuxt-link v-if="$i18n.locale === 'en'" :to="switchLocalePath('zh')">
      {{ $t('title') }}
    </nuxt-link>
    <van-button type="primary" block @click="$store.dispatch('getNewsLike')">
      fetch
    </van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['system', 'light', 'dark'],
    }
  },
}
</script>
