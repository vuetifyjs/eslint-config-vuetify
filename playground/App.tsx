/** @jsxImportSource vue */
import { ref } from 'vue'

export default {
  setup () {
    const msg = ref('Hello World!')

    return () => (
      <>
        <h1>{msg.value}</h1>
        <input
          value={msg.value}
          onInput={e => msg.value = (e.target as HTMLInputElement).value}
        />
      </>
    )
  },
}
