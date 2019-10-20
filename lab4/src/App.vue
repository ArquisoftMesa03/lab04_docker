<template>
  <div id="app">
    <p>¡Bienvenido!</p>
       <form>
      <label>Name</label>
      <input type="text" name="name" v-model="name">
      <label>Credits</label>
      <input type="number" name="credits" v-model="credits">


      <input type="button" @click="createCourse(name,credits)" value="Graphql">
      <input type="button" @click="resetForm()" value="Reset">

      <button v-on:click.prevent="post">REST</button>

      
    </form>





    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',

  data(){
    return {
        code: null,
        name: '',
        credits: '',
        message: '',

      }
  },
 apollo: {
    allCourses: gql`query {
      allCourses {
        name, credits
      }
    }`,
  },



  // components: {
  //   HelloWorldTest
  // },
  methods: {
    post: function(){
      this.$http.post("http://3.230.92.44:3000/courses-ms/resources/courses/", {
          headers: {'Access-Control-Allow-Origin': '*'},
          name: this.name,
          credits: this.credits
          
      }).then(function(data){
        /* eslint-disable no-console */
        console.log(data);
        /* eslint-disable no-console */
      })
    },
    createCourse(name,credits){
      /* eslint-disable no-console */
      console.log(name);
      console.log(credits);
      /* eslint-disable no-console */
      this.$apollo.mutate({
          mutation: gql`mutation ($name: String!, $credits: Int!) {
            createCourse(course: {
              name: $name, credits: $credits
            }) {
              name
            }
          }`,
          variables:{
            name: name,
            credits: credits
          }
        },
        
      ).then().then((apollo) => {
      // Result
      this.message = "Curso creado satisfactoriamente desde el microservicio.";
      /* eslint-disable no-console */
      console.log(apollo)
      /* eslint-disable no-console */
    }).catch((error) => {
      // Error
      /* eslint-disable no-console */
      console.error(error)
      /* eslint-disable no-console */
      // We restore the initial user input

    })
      // location.reload();
    },
    resetForm(){
      this.code = null;
      this.name = '';
      this.credits = '';
    }   
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
