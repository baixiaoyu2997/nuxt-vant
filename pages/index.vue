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
      this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh'
    },
    swtichTheme() {
      this.$colorMode.preference =
        this.$colorMode.value === 'light' ? 'dark' : 'light'
    },
  },
}
</script>
