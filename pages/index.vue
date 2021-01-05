<template>
  <div class="page--full">
    <van-search v-model="value" :placeholder="$t('searchPlaceholder')" />
    <van-sticky offset-top="90vh">
      <van-button type="warning" @click="swtichTheme">
        {{ $t('switchTheme') }}
      </van-button>
      <van-button type="info" @click="switchLang">
        {{ $t('switchLang') }}
      </van-button>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      columns: ['system', 'light', 'dark'],
    }
  },
  methods: {
    switchLang() {
      this.$store.commit('setLang', {
        lang: this.$store.state.locale === 'zh' ? 'en' : 'zh',
      })
    },
    swtichTheme() {
      this.$store.commit('setTheme', {
        theme: this.$store.state.theme === 'light' ? 'dark' : 'light',
      })
    },
  },
}
</script>
