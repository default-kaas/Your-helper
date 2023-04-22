export function useLoading() {
  const isLoading = ref(false);
  /**
  * @remarks
  * use then before this function is based to the loading function
  */
  function loading<T>(callback: Promise<T>) {
    isLoading.value = true
    return callback.finally(() => {
      isLoading.value = false
    })
  }
  return {
    isLoading,
    loading
  }
}