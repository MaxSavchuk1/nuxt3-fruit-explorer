<script setup lang="ts">
const { isLoading } = storeToRefs(useLoaderStore());
const title = ref("Fruit explorer");
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <Body>
      <main class="default-layout">
        <!-- optimization: hydrate component when browser is idle -->
        <LazyNavBar hydrate-on-idle />

        <slot></slot>
      </main>

      <ClientOnly>
        <Teleport to="body">
          <Loader :show="isLoading" />
        </Teleport>
      </ClientOnly>
    </Body>
  </Html>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 1 0%;
}
</style>
