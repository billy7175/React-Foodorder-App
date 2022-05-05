<template>
  <form class="form login">
    <div class="row">
      <label for="">ID</label>
      <input type="text" v-model="user.id" placeholder="Enter ID." />
    </div>
    <div class="row">
      <label for="">PASSWORD</label>
      <input
        type="text"
        v-model="user.password"
        placeholder="Enter Passowrd."
      />
    </div>
    <div class="button-wrapper">
      <button disabled>회원가입</button>
      <button @click="submit" type="submiet">로그인</button>
    </div>
  </form>
</template>


<script>
export default {
  created() {},
  methods: {
    submit(e) {
      e.preventDefault();
      const isValidated = this.validateUserForm(this.user)
      if(isValidated) this.$router.push({path : '/'})
    },
    validateUserForm(user){
        // console.log('user', user)
        for(const u in user){
            console.log('#user[u]', user[u])
            if(!user[u]) return alert('필수값을 입력해주세요.')
        }

        return true
        // if(!id) return alert('Enter ID')
        // if(!password) return alert('Enter PASSWORD.')
        // if(id && password) return true
        // return false
    }
  },
  data() {
    return {
      user: {
        id: "",
        password: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  // border:1px solid red;
  width: 500px;
  border: 1px solid #999;
  padding: 10px;
  margin: auto;

  .row {
    &:not(:first-child) {
      // border:1px solid red;
      margin: 10px 0px;
    }
  }
  label {
    font-size: 16px;
    font-weight: 500;
  }

  input {
    width: 100%;
  }
}
label {
  display: block;
  text-align: left;
}

.button-wrapper {
    display:flex;
    justify-content: center;
    gap:10px;
}
</style>