<template>
  <div class="page--full">
    <van-search
      v-model="value"
      :placeholder="$t('searchPlaceholder')"
      @input="getData"
    />
    <van-sticky offset-top="90vh">
      <van-button :loading="loading" type="warning" @click="swtichTheme">
        {{ $t('switchTheme') }}
      </van-button>
      <van-button :loading="loading" type="info" @click="switchLang">
        {{ $t('switchLang') }}
      </van-button>
    </van-sticky>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      columns: ['system', 'light', 'dark'],
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['@@LOADING'].effects['getNewsLike'],
    }),
  },
  methods: {
    getData() {
      this.$store.dispatch('getNewsLike')
    },
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
