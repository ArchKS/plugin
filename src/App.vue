<template>
  <button id="app" @click="ckbtn">click</button>
</template>

<script>
export default {
  methods: {
    ckbtn() {
      this.$toast({
        text: "新消息提示",
        width: 200,
        height: 60,
        autoClose: false,
        type: "warning",
        position: "topRight",
        callback: function () {
          console.log(" THis is Callback ");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// #app {
//   position: absolute;
//   top: calc(45%);
//   left: calc(45%);
//   width: 100px;
//   height: 50px;
//   background: orangered;
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 10px;
//   cursor: pointer;
//   font-family: Consolar;
//   &:hover{
//     font-weight: bold;
//   }
// }
</style>
