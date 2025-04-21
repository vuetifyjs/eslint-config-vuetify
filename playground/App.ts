import { h, ref } from 'vue'

export default {
  setup () {
    const msg = ref('Hello World!')

    return () => h('div', [
      h('h1', msg.value),
      h('input', {
        value: msg.value,
        onInput: e => msg.value = (e.target as HTMLInputElement).value,
      }),
    ])
  },
}
