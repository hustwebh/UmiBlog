export const dva = {
  config:{
    onError(e) {
      e.preventDefault()
      console.log(e.message);
    }
  }
}