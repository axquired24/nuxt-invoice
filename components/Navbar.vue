<template>
  <div class="fixed left-0 bg-primary-800 rounded-tr-2xl rounded-br-2xl">
    <div class="min-h-screen w-20 flex flex-col justify-between items-center">
      <div class="w-full h-16 rounded-xl bg-primary-500 flex items-center justify-center">
        <IconPieSvg class="transform -rotate-45 h-12" />
      </div>
      <div class="w-full py-4">
        <div class="flex items-center justify-center">
          <span v-if="isDarkMode" @click="toggleDarkMode()">
            <IconSunSvg class="h-6 cursor-pointer text-gray-500 hover:text-gray-100"/>
          </span>
          <span v-else @click="toggleDarkMode()">
            <IconMoonSvg class="h-6 cursor-pointer text-gray-500 hover:text-gray-100" />
          </span>
        </div>
        <div class="pt-4 mt-4 border-t border-gray-600 flex justify-center">
          <img
            class="rounded-full w-10 h-auto cursor-pointer hover:opacity-80"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
            alt="Avatar"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDarkMode: true
    }
  },
  methods: {
    toggleDarkMode () {
      this.isDarkMode = !this.isDarkMode
      // const colorMode = useColorMode()
      // colorMode.preference = this.isDarkMode ? 'dark' : 'light'
    }
  }
}
</script>
